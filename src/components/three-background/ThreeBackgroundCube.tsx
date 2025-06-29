"use client"; // Nếu dùng Next.js 13+

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackgroundCube() {
   const mountRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const mount = mountRef.current!;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true });

      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      // Example: Add rotating cube
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshNormalMaterial();
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      camera.position.z = 5;

      const animate = () => {
         cube.rotation.x += 0.01;
         cube.rotation.y += 0.01;
         renderer.render(scene, camera);
         requestAnimationFrame(animate);
      };
      animate();

      // Cleanup
      return () => {
         mount.removeChild(renderer.domElement);
      };
   }, []);

   return <div ref={mountRef} style={{ position: "absolute", top: 0, left: 0, zIndex: -1, width: "100%", height: "100%" }} />;
}
