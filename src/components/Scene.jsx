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
  }, []);

  return null; // Return null because Three.js handles rendering
}

export default Scene;
