"use client";
import { useMantineColorScheme } from "@mantine/core";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackgroundParticle() {
   const mountRef = useRef<HTMLDivElement>(null);
   const { colorScheme } = useMantineColorScheme();

   useEffect(() => {
      const mantineColorBody = getComputedStyle(document.documentElement).getPropertyValue("--mantine-color-body").trim();
      const mantinePrimaryColorFilled = getComputedStyle(document.documentElement).getPropertyValue("--mantine-primary-color-filled").trim();

      // ====== CONFIG TÙY CHỈNH BẮT ĐẦU =======
      const radius = 50; // Bán kính mặt phẳng
      const spacing = 3; // Khoảng cách giữa các hạt
      const waveSpeed = 0.5; //  CHỈNH SÓNG CHẬM: giảm số này (<1.0)
      const waveHeight = 2; //  CHỈNH ĐỘ CAO SÓNG
      const particleColor = mantinePrimaryColorFilled; // Màu của hạt
      const particleSize = 0.1; // Kích thước của hạt
      const mouseInfluence = 10.0; // Độ tác động khi rê chuột
      const mouseSmoothing = 0.02; // 💡 Càng thấp → càng trễ, càng mượt
      const positionCam = {
         x: 0,
         y: 10,
         z: 60,
      }; // vị trí của camera
      // ====== CONFIG TÙY CHỈNH KẾT THÚC =======

      const container = mountRef.current!;
      const scene = new THREE.Scene();

      // background color of three particle
      scene.background = new THREE.Color(mantineColorBody);

      const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
      const originalCamPos = new THREE.Vector3(positionCam.x, positionCam.y, positionCam.z);
      camera.position.copy(originalCamPos);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      const group = new THREE.Group();
      scene.add(group);

      const sphereGeometry = new THREE.SphereGeometry(particleSize, 12, 12);
      const sphereMaterial = new THREE.ShaderMaterial({
         uniforms: {
            color1: { value: new THREE.Color(particleColor) }, // dùng biến đã khai báo
            color2: { value: new THREE.Color(0xffffff) },
         },
         vertexShader: `
            varying vec3 vPosition;
            void main() {
               vPosition = position;
               gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
         `,
         fragmentShader: `
            varying vec3 vPosition;
            uniform vec3 color1;
            uniform vec3 color2;

            void main() {
               float h = (vPosition.y + 0.1) / 0.2; // normalize y
               vec3 color = mix(color1, color2, clamp(h, 0.0, 1.0));
               gl_FragColor = vec4(color, 1.0);
            }
         `,
      });

      // Đèn dịu nền
      const ambient = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambient);

      const particles: { mesh: THREE.Mesh; basePos: THREE.Vector3 }[] = [];

      for (let x = -radius; x < radius; x++) {
         for (let z = -radius; z < radius; z++) {
            const dist = Math.sqrt(x * x + z * z);
            if (dist < radius) {
               const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
               const pos = new THREE.Vector3(x * spacing, 0, z * spacing);
               mesh.position.copy(pos);
               group.add(mesh);
               particles.push({ mesh, basePos: pos.clone() });
            }
         }
      }

      // Ánh sáng
      const light = new THREE.PointLight(0xffffff, 1);
      light.position.set(0, 50, 0);
      scene.add(light);

      // Mouse tracking mượt (với smoothing)
      const mouse = { x: 0, y: 0 };
      const targetMouse = { x: 0, y: 0 };

      window.addEventListener("mousemove", (e) => {
         targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
         targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      });

      const clock = new THREE.Clock();

      const animate = () => {
         const time = clock.getElapsedTime();

         // Gợn sóng radial chậm
         for (const p of particles) {
            const r = Math.sqrt(p.basePos.x ** 2 + p.basePos.z ** 2);
            const wave = Math.sin(r * 0.2 - time * waveSpeed) * waveHeight;
            p.mesh.position.y = wave;
         }

         // Rê chuột mượt: dùng "lerp" để làm trễ
         mouse.x += (targetMouse.x - mouse.x) * mouseSmoothing;
         mouse.y += (targetMouse.y - mouse.y) * mouseSmoothing;

         const camOffsetX = mouse.x * mouseInfluence;
         const camOffsetY = mouse.y * mouseInfluence;

         camera.position.x = originalCamPos.x + camOffsetX;
         camera.position.y = originalCamPos.y + camOffsetY;
         camera.lookAt(0, 0, 0);

         renderer.render(scene, camera);
         requestAnimationFrame(animate);
      };

      animate();

      return () => {
         mountRef.current?.removeChild(renderer.domElement);
      };
   }, [colorScheme]);

   return (
      <div
         ref={mountRef}
         style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
            width: "100vw",
            height: "100vh",
         }}
      />
   );
}
