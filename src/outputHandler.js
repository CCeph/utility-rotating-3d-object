function createDOMCache() {
  const $container = document.querySelector("[data-container]");
  const $box = document.querySelector("[data-box]");
  const $root = document.querySelector(":root");
  return { $container, $box, $root };
}

const cachedDOM = createDOMCache();

function createRotateController(root, container, cube) {
  let dragging = false;
  let initialPosition = {};
  let initialRotation = {};

  function getInitialBoxRotation() {
    const rootElement = root;
    const rootStyles = getComputedStyle(rootElement);
    const xString = rootStyles.getPropertyValue("--initialRotateX");
    const yString = rootStyles.getPropertyValue("--initialRotateY");
    const rotX = Number(xString.slice(0, -3));
    const rotY = Number(yString.slice(0, -3));
    return { rotX, rotY };
  }

  function initDragRotate(e) {
    dragging = true;
    initialPosition = {
      x: e.pageX,
      y: e.pageY,
    };
    initialRotation = getInitialBoxRotation();
  }

  function dragRotate(e) {
    if (!dragging) {
      return;
    }
    const currentPosition = {
      x: e.pageX,
      y: e.pageY,
    };
    const delta = {
      x: ((currentPosition.x - initialPosition.x) / window.innerWidth) * 360,
      y: ((initialPosition.y - currentPosition.y) / window.innerHeight) * 360,
    };

    const rootElement = root;
    rootElement.style.setProperty(
      "--initialRotateX",
      `${delta.y + initialRotation.rotX}deg`
    );
    rootElement.style.setProperty(
      "--initialRotateY",
      `${delta.x + initialRotation.rotY}deg`
    );

    let rotateParam = "";
    rotateParam += ` rotateX(${delta.y + initialRotation.rotX}deg)`;
    rotateParam += ` rotateY(${delta.x + initialRotation.rotY}deg)`;
    const cubeElement = cube;
    cubeElement.style.transform = rotateParam;
  }

  function endDragRotate() {
    if (!dragging) {
      return;
    }

    dragging = false;
  }

  container.addEventListener("mousedown", initDragRotate);

  container.addEventListener("mousemove", dragRotate);

  container.addEventListener("mouseup", endDragRotate);

  return {
    initDragRotate,
    dragRotate,
    endDragRotate,
  };
}

const mainBoxRotateController = createRotateController(
  cachedDOM.$root,
  cachedDOM.$container,
  cachedDOM.$box
);
