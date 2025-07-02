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
      const positionCam = { x: 0, y: 10, z: 60 }; // vị trí của camera
      // ====== CONFIG TÙY CHỈNH KẾT THÚC =======

      // ====== Khởi tạo scene, camera, renderer ======
      const container = mountRef.current!;
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(mantineColorBody); // Màu nền

      const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
      camera.position.set(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      // ====== Tạo group chứa các hạt ======
      const group = new THREE.Group();
      scene.add(group);

      // ====== Khởi tạo geometry, material cho hạt ======
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

      // ====== Thêm ánh sáng nền và điểm ======
      const ambient = new THREE.AmbientLight(0xffffff, 0.5);
      const light = new THREE.PointLight(0xffffff, 1);
      light.position.set(0, 50, 0);
      scene.add(ambient);
      scene.add(light);

      // ====== Sinh mảng hạt phân bố trên mặt phẳng tròn ======
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

      // ====== Mouse tracking mượt ======
      const mouse = { x: 0, y: 0 };
      const targetMouse = { x: 0, y: 0 };

      // Cleanup chuẩn listener
      const handleMouseMove = (e: MouseEvent) => {
         targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
         targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener("mousemove", handleMouseMove);

      // ====== Camera cinematic setup ======

      const clock = new THREE.Clock();

      const initialCamPos = new THREE.Vector3(0, 10, 0); // Ở tâm
      const targetCamPos = new THREE.Vector3(positionCam.x, positionCam.y, positionCam.z); // Mục tiêu

      const initialLookAt = new THREE.Vector3(3, 5 , 5); // cinematic: nhìn lên cao về phía xa
      const targetLookAt = new THREE.Vector3(0, 0, 0); // Sau đó nhìn về tâm

      // ====== Animation logic ======
      let animStartTime: any = null;
      const transitionDuration = 2;

      const animate = (now: any) => {
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

         // Camera animation
         if (animStartTime === null) animStartTime = now;
         const elapsed = (now - animStartTime) / 1000; // milliseconds → seconds
         let t = Math.min(elapsed / transitionDuration, 1);
         t = t * t * (3 - 2 * t);

         let camPos = new THREE.Vector3();
         camPos.lerpVectors(initialCamPos, targetCamPos, t);

         // Khi hoạt ảnh chuyển động, mouse influence = 0
         // Khi xong hoạt ảnh, mới áp dụng mouse influence (mượt mà, không bị giật)
         // let currentMouseInfluence = t < 1 ? 0 : mouseInfluence;
         const camOffsetX = mouse.x * mouseInfluence;
         const camOffsetY = mouse.y * mouseInfluence;

         camera.position.x = camPos.x + camOffsetX;
         camera.position.y = camPos.y + camOffsetY;
         camera.position.z = camPos.z;

         let lookAtPos = new THREE.Vector3();
         lookAtPos.lerpVectors(initialLookAt, targetLookAt, t);
         camera.lookAt(lookAtPos);

         renderer.render(scene, camera);
         requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);

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
