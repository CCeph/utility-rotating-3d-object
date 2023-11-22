# Utility: Add Interactive Rotate to 3D Object

If you would like to see the drag-to-rotate live, here is a link showcasing it:
INSERT LINK HERE

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

4. Call the controller with all needed dependencies (root element, $container element, $box element, name of rotateX CSS var, name of rotateY CSS var).
