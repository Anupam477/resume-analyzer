import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * ThreeHeroCanvas
 * Lightweight, high-performance Three.js interactive particle & neural network background.
 * Optimized with pointer parallax, auto-throttling, and clean memory disposal.
 */
const ThreeHeroCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Dimensions (strictly bounded to document client width so it never induces scrollbars)
    const docClientWidth = document.documentElement.clientWidth || window.innerWidth;
    let width = Math.min(mount.clientWidth || docClientWidth, docClientWidth);
    let height = mount.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 220;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.maxWidth = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
      renderer.domElement.style.pointerEvents = "none";
      mount.appendChild(renderer.domElement);
    } catch (e) {
      console.warn("WebGL not supported for hero background:", e);
      return;
    }

    // 2. Particle Geometry
    const particleCount = window.innerWidth < 768 ? 80 : 160;
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    const range = 240;
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * range * 1.6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * range;
      positions[i * 3 + 2] = (Math.random() - 0.5) * range * 0.8;

      velocities.push({
        x: (Math.random() - 0.5) * 0.18,
        y: (Math.random() - 0.5) * 0.18,
        z: (Math.random() - 0.5) * 0.12,
      });
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    // Particle Material (Glowing Emerald Green & Mint)
    const pMaterial = new THREE.PointsMaterial({
      color: 0x10b981,
      size: 3.2,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);

    // 3. Network Connection Lines
    const maxLines = (particleCount * (particleCount - 1)) / 2;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    lineGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(lineColors, 3)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // 4. Mouse Tracking & Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // 5. Visibility / Intersection Optimization
    let isVisible = true;
    let animationFrameId;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(mount);

    // 6. Animation Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      if (!prefersReducedMotion) {
        // Smooth camera tilt
        targetX += (mouseX * 25 - targetX) * 0.04;
        targetY += (mouseY * 25 - targetY) * 0.04;
        camera.position.x = targetX;
        camera.position.y = targetY;
        camera.lookAt(scene.position);

        // Move particles
        const posArray = geometry.attributes.position.array;
        let lineIndex = 0;
        let colorIndex = 0;
        const connectDistance = 46;

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          posArray[i3] += velocities[i].x;
          posArray[i3 + 1] += velocities[i].y;
          posArray[i3 + 2] += velocities[i].z;

          // Boundary bouncing
          if (Math.abs(posArray[i3]) > range) velocities[i].x *= -1;
          if (Math.abs(posArray[i3 + 1]) > range * 0.7) velocities[i].y *= -1;
          if (Math.abs(posArray[i3 + 2]) > range * 0.5) velocities[i].z *= -1;

          // Connect nearby nodes
          for (let j = i + 1; j < particleCount; j++) {
            const j3 = j * 3;
            const dx = posArray[i3] - posArray[j3];
            const dy = posArray[i3 + 1] - posArray[j3 + 1];
            const dz = posArray[i3 + 2] - posArray[j3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < connectDistance) {
              const alpha = (1 - dist / connectDistance) * 0.45;

              linePositions[lineIndex++] = posArray[i3];
              linePositions[lineIndex++] = posArray[i3 + 1];
              linePositions[lineIndex++] = posArray[i3 + 2];

              linePositions[lineIndex++] = posArray[j3];
              linePositions[lineIndex++] = posArray[j3 + 1];
              linePositions[lineIndex++] = posArray[j3 + 2];

              // Emerald & Mint Green gradient
              lineColors[colorIndex++] = 0.06 * alpha;
              lineColors[colorIndex++] = 0.85 * alpha;
              lineColors[colorIndex++] = 0.53 * alpha;

              lineColors[colorIndex++] = 0.0 * alpha;
              lineColors[colorIndex++] = 1.0 * alpha;
              lineColors[colorIndex++] = 0.55 * alpha;
            }
          }
        }

        geometry.attributes.position.needsUpdate = true;
        lineGeometry.attributes.position.needsUpdate = true;
        lineGeometry.attributes.color.needsUpdate = true;
        lineGeometry.setDrawRange(0, lineIndex / 3);

        particles.rotation.y += 0.0006;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 7. Handle Resize
    const handleResize = () => {
      if (!mount || !renderer) return;
      const currentDocWidth = document.documentElement.clientWidth || window.innerWidth;
      width = Math.min(mount.clientWidth || currentDocWidth, currentDocWidth);
      height = mount.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", handleResize);

      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }

      geometry.dispose();
      pMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute top-0 left-0 w-full max-w-full pointer-events-none -z-10 overflow-hidden"
      style={{
        height: "100%",
        maxWidth: "100vw",
        opacity: 0.85,
        maskImage:
          "radial-gradient(ellipse at 50% 35%, black 40%, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at 50% 35%, black 40%, transparent 80%)",
      }}
      aria-hidden="true"
    />
  );
};

export default ThreeHeroCanvas;
