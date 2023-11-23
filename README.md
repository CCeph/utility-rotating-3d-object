# Utility: Add Interactive Rotate to 3D Object

If you would like to see the drag-to-rotate live, here is a link showcasing it:
[Rotating 3D Object Showcase](https://cceph.github.io/utility-rotating-3d-object/)

## Dependencies Needed for This Utility

1. Follow the DOM heirarchy stated below to create your 3D object.
2. CSS variables for adjusting the 3D object's rotateX and rotateY values.

## How To Use This in Your Project

1. You will need to create your own 3D object as follows:

   1.1 Create a container element (hereafter referred to as $container) with a CSS perspective style on it.

   1.2 Create your 3D element (hereafter referred to as $box) inside this container. Add "transform-style: preserve-3d;" to the CSS styling of this element.

   1.3 Create the faces of your 3D object inside $box. Style and transform them to create your 3D shape.

It is important that this DOM heirarchy is followed as the JS code depends on it.

2. Style the initial rotateX and rotateY states of the 3D object $box using CSS variables. These two CSS variable names will need to be passed to the function later on.

3. Copy createRotateController function from src/outputHandler.js

   ```javascript
   function createRotateController(
     root,
     container,
     cube,
     cssRotXVarName,
     cssRotYVarName
   ) {
     let dragging = false;
     let initialPosition = {};
     let initialRotation = {};
   
     function getInitialBoxRotation() {
       const rootElement = root;
       const rootStyles = getComputedStyle(rootElement);
       const xString = rootStyles.getPropertyValue(cssRotXVarName);
       const yString = rootStyles.getPropertyValue(cssRotYVarName);
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
      cssRotXVarName,
      `${delta.y + initialRotation.rotX}deg`
    );
    rootElement.style.setProperty(
      cssRotYVarName,
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
   ```

5. Call the controller with all needed dependencies (root element, $container element, $box element, name of rotateX CSS var, name of rotateY CSS var).

6. Enjoy your interactive 3D element!
