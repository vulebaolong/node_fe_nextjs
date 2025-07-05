"use client";
import { useMantineColorScheme } from "@mantine/core";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function createGlowSprite(colorHex = "#d3a3f7", strength = 1) {
   const canvas = document.createElement("canvas");
   canvas.width = canvas.height = 128;
   const ctx = canvas.getContext("2d");
   if (!ctx) return null;
   const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
   grad.addColorStop(0, colorHex + "ff");
   grad.addColorStop(0.2, colorHex + "cc");
   grad.addColorStop(0.5, colorHex + "66");
   grad.addColorStop(1, "#0000");
   ctx.fillStyle = grad;
   ctx.fillRect(0, 0, 128, 128);
   const tex = new THREE.CanvasTexture(canvas);

   return new THREE.SpriteMaterial({
      map: tex,
      color: 0xffffff,
      transparent: true,
      opacity: 0.5 * strength,
      blending: THREE.NormalBlending,
      depthWrite: false,
      depthTest: true,
   });
}

type Particle = {
   mesh: THREE.Mesh;
   basePos: THREE.Vector3;
   glow?: THREE.Sprite;
   dist: number;
   glowStrength: number;
};

export default function ThreeBackgroundParticle() {
   const mountRef = useRef<HTMLDivElement>(null);
   const { colorScheme } = useMantineColorScheme();

   useEffect(() => {
      const mantineColorBody = getComputedStyle(document.documentElement).getPropertyValue("--mantine-color-body").trim();
      const mantinePrimaryColorFilled = getComputedStyle(document.documentElement).getPropertyValue("--mantine-primary-color-filled").trim();
      const mantinePrimary6 = getComputedStyle(document.documentElement).getPropertyValue("--mantine-primary-color-6").trim();
      const mantinePrimary2 = getComputedStyle(document.documentElement).getPropertyValue("--mantine-primary-color-2").trim();

      // ====== CONFIG TÙY CHỈNH BẮT ĐẦU =======
      const radius = 50; // Bán kính mặt phẳng
      const spacing = 3; // Khoảng cách giữa các hạt
      const waveSpeed = 0.5; //  CHỈNH SÓNG CHẬM: giảm số này (<1.0)
      const waveHeight = 2.5; //  CHỈNH ĐỘ CAO SÓNG
      const particleColor = mantinePrimaryColorFilled; // Màu của hạt
      const particleSize = 0.1; // Kích thước của hạt
      const mouseInfluence = 10.0; // Độ tác động khi rê chuột
      const mouseSmoothing = 0.05; // 💡 Càng thấp → càng trễ, càng mượt
      const positionCam = { x: 0, y: 10, z: 60 }; // vị trí của camera
      const glowRadius = 10; // bán kính vùng tâm phát sáng
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

      // ==== Light (for MeshStandardMaterial or phong) ====
      // Ambient cho bóng trắng tím tự nhiên
      const ambient = new THREE.AmbientLight(0xffffff, 0.9);
      scene.add(ambient);

      // ====== Tạo group chứa các hạt ======
      const group = new THREE.Group();
      scene.add(group);

      // ==== Sprite Glow material chỉ tạo 1 lần ====
      const spriteMat = createGlowSprite(mantinePrimary6, 2);

      // ====== Khởi tạo geometry, material cho hạt ======
      const sphereGeometry = new THREE.SphereGeometry(particleSize, 12, 12);

      // ====== Sinh mảng hạt phân bố trên mặt phẳng tròn ======
      const particles: Particle[] = [];
      for (let x = -radius; x < radius; x++) {
         for (let z = -radius; z < radius; z++) {
            const dist = Math.sqrt(x * x + z * z);
            if (dist < radius) {
               // Tạo material riêng cho từng mesh!
               const material = new THREE.ShaderMaterial({
                  uniforms: {
                     color1: { value: new THREE.Color(particleColor) },
                     color2: { value: new THREE.Color(mantinePrimary2) },
                     uGlowStrength: { value: 0 },
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
                     uniform float uGlowStrength;
                     void main() {
                        float h = (vPosition.y + 0.1) / 0.2;
                        vec3 color = mix(color1, color2, clamp(h, 0.0, 1.0));
                        float softGlow = smoothstep(0.7, 1.0, h);
                        color += color1 * softGlow * 0.20;
                        float fakeGlow = 0.07 + 0.21 * h;
                        color += fakeGlow;

                        // Nếu glowStrength > 0, blend thêm màu sáng lên
                        // Có thể pha trắng hoặc xanh neon, ở đây chọn pha trắng
                        color = mix(color, vec3(1.0, 1.0, 1.0), uGlowStrength * 0.8);

                        gl_FragColor = vec4(color, 1.0);
                     }
                  `,
               });

               const mesh = new THREE.Mesh(sphereGeometry, material);
               const pos = new THREE.Vector3(x * spacing, 0, z * spacing);
               mesh.position.copy(pos);
               group.add(mesh);

               // Sprite Glow: luôn add (cho bóng nào cũng có shadow mềm)
               let glow: THREE.Sprite | undefined = undefined;
               // CHỈ tạo glow nếu ở trong bán kính glowRadius từ tâm
               if (spriteMat && dist < glowRadius) {
                  glow = new THREE.Sprite(spriteMat.clone());
                  glow.position.copy(pos);
                  glow.scale.set(particleSize * 7, particleSize * 7, 1);
                  group.add(glow);
               }

               particles.push({ mesh, basePos: pos.clone(), glow, dist, glowStrength: 0 });
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

      const initialCamPos = new THREE.Vector3(0, 10, 0); // bắt đầu ở tâm
      const targetCamPos = new THREE.Vector3(positionCam.x, positionCam.y, positionCam.z); // vị trí kết thúc

      const initialLookAt = new THREE.Vector3(3, 5, 5); // hiệu ứng xoay
      const targetLookAt = new THREE.Vector3(0, 0, 0); // Sau đó nhìn về tâm

      // ====== Animation logic ======
      let animStartTime: any = null;
      const transitionDuration = 2;

      const animate = (now: any) => {
         const time = clock.getElapsedTime();

         for (const p of particles) {
            // Sóng
            const r = Math.sqrt(p.basePos.x ** 2 + p.basePos.z ** 2);
            const wave = Math.sin(r * 0.2 - time * waveSpeed) * waveHeight;
            p.mesh.position.y = wave;

            if (p.glow) {
               p.glow.position.y = p.mesh.position.y;
               // Glow sẽ sáng mạnh khi ở đỉnh sóng gần tâm
               const shouldGlow = wave > waveHeight * 0.7;
               // Fade lên/xuống mượt
               p.glowStrength += (shouldGlow ? 1 : 0 - p.glowStrength) * 0.12; // 0.12 là tốc độ fade
               // Clamp từ 0 đến 1
               p.glowStrength = Math.max(0, Math.min(1, p.glowStrength));
               // Set opacity glow dựa vào strength
               (p.glow.material as THREE.SpriteMaterial).opacity = p.glowStrength * 0.6; // 0.6 là max opacity
               // Nếu opacity nhỏ quá thì ẩn sprite luôn cho nhẹ
               p.glow.visible = p.glowStrength > 0.02;
            }
            if ((p.mesh.material as THREE.ShaderMaterial).uniforms.uGlowStrength) {
               (p.mesh.material as THREE.ShaderMaterial).uniforms.uGlowStrength.value = p.glowStrength;
            }
         }

         // Rê chuột mượt: dùng "lerp" để làm trễ
         mouse.x += (targetMouse.x - mouse.x) * mouseSmoothing;
         mouse.y += (targetMouse.y - mouse.y) * mouseSmoothing;

         // Camera animation
         if (animStartTime === null) animStartTime = now;
         const elapsed = (now - animStartTime) / 1000; // milliseconds → seconds
         let t = Math.min(elapsed / transitionDuration, 1);
         t = t * t * (3 - 2 * t);

         const camPos = new THREE.Vector3();
         camPos.lerpVectors(initialCamPos, targetCamPos, t);

         // Khi hoạt ảnh chuyển động, mouse influence = 0
         // Khi xong hoạt ảnh, mới áp dụng mouse influence (mượt mà, không bị giật)
         // let currentMouseInfluence = t < 1 ? 0 : mouseInfluence;
         const camOffsetX = mouse.x * mouseInfluence;
         const camOffsetY = mouse.y * mouseInfluence;

         camera.position.x = camPos.x + camOffsetX;
         camera.position.y = camPos.y + camOffsetY;
         camera.position.z = camPos.z;

         const lookAtPos = new THREE.Vector3();
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
