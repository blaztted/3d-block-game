import React, { useEffect } from "react";
import * as THREE from "three";

function Scene() {
  useEffect(() => {
    function init() {
      let camera, scene, renderer;
      const originalBoxSize = 3;
      const boxHeight = 1;
      const stack = [];

      // Create a scene
      scene = new THREE.Scene();

      // Set up Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      // Foundation
      addLayer(0, 0, originalBoxSize, originalBoxSize);

      // First Layer
      addLayer(-10, 0, originalBoxSize, originalBoxSize, "x");

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
      directionalLight.position.set(10, 20, 0);
      scene.add(directionalLight);

      // Camera
      const width = 10;
      const height = width * (window.innerHeight / window.innerWidth);
      camera = new THREE.OrthographicCamera(
        width / -2, // left
        width / 2, // right
        height / 2, // top
        height / -2, // bottom
        1, // near
        100 // far
      );

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Add it to HTML
      document.body.appendChild(renderer.domElement);

      camera.position.set(4, 4, 4);
      camera.lookAt(0, 0, 0);

      // Rendering loop
      const animate = () => {
        requestAnimationFrame(animate);

        // Update the scene
        renderer.render(scene, camera);
      };

      animate(); // Start the rendering loop

      function addLayer(x, z, width, depth, direction) {
        const y = boxHeight * stack.length; // Add new box one layer higher

        const layer = generateBox(x, y, z, width, depth);
        layer.direction = direction;

        stack.push(layer);
      }

      function generateBox(x, y, z, width, depth) {
        const geometry = new THREE.BoxGeometry(width, boxHeight, depth);

        const color = new THREE.Color(
          `hsl(${30 + stack.length * 4}, 100%, 50%)`
        );
        const material = new THREE.MeshLambertMaterial({ color });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);

        scene.add(mesh);

        return {
          threejs: mesh,
          width,
          depth,
        };
      }
    }

    init();

    return () => {
      document.body.removeChild(document.querySelector("canvas"));
    };
  }, []);

  return null; // Return null because Three.js handles rendering
}

export default Scene;
