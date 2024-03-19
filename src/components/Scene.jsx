import React, { useEffect } from "react";
import * as THREE from "three";

function Scene() {
  useEffect(() => {
    // Create a scene
    const scene = new THREE.Scene();

    // Create a cube
    const geometry = new THREE.BoxGeometry(3, 1, 3);
    const material = new THREE.MeshLambertMaterial({ color: 0xfb8e00 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    scene.add(mesh);

    //Set up Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10, 20, 0);
    scene.add(directionalLight);

    // Camera
    const width = 10;
    const height = width * (window.innerHeight / window.innerWidth);
    const camera = new THREE.OrthographicCamera(
      width / -2, //left
      width / 2, // right
      height / 2, // top
      height / -2, //bottom
      1, // near
      100 // far
    );

    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);

    return () => {
      // Cleanup code (optional)
    };
  }, []);

  return null; // Return null because Three.js handles rendering
}

export default Scene;
