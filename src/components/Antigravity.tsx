import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface AntigravityProps {
  count?: number;
  magnetRadius?: number;
  ringRadius?: number;
  waveSpeed?: number;
  waveAmplitude?: number;
  particleSize?: number;
  lerpSpeed?: number;
  color?: string;
  autoAnimate?: boolean;
  particleVariance?: number;
  rotationSpeed?: number;
  depthFactor?: number;
  pulseSpeed?: number;
  particleShape?: 'capsule' | 'sphere' | 'box' | 'tetrahedron';
  fieldStrength?: number;
}

interface ParticleData {
  t: number;
  factor: number;
  speed: number;
  xFactor: number;
  yFactor: number;
  zFactor: number;
  mx: number;
  my: number;
  mz: number;
  cx: number;
  cy: number;
  cz: number;
  vx: number;
  vy: number;
  vz: number;
  randomRadiusOffset: number;
}

export const Antigravity: React.FC<AntigravityProps> = ({
  count = 450,
  magnetRadius = 8.5,
  ringRadius = 5.5,
  waveSpeed = 0.18,
  waveAmplitude = 0.45,
  particleSize = 0.36,
  lerpSpeed = 0.045,
  color = '#6E6A62',
  autoAnimate = true,
  particleVariance = 0.85,
  rotationSpeed = 0.05,
  depthFactor = 1.3,
  pulseSpeed = 1.2,
  particleShape = 'box',
  fieldStrength = 6.0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
    camera.position.set(0, 0, 50);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // Calculate viewport dimensions at z = 0
    const vFOV = THREE.MathUtils.degToRad(35);
    let visibleHeight = 2 * Math.tan(vFOV / 2) * 50;
    let visibleWidth = visibleHeight * (width / height);

    // Geometry selection
    let geometry: THREE.BufferGeometry;
    if (particleShape === 'sphere') {
      geometry = new THREE.SphereGeometry(0.2, 12, 12);
    } else if (particleShape === 'tetrahedron') {
      geometry = new THREE.TetrahedronGeometry(0.3);
    } else if (particleShape === 'capsule') {
      geometry = new THREE.CapsuleGeometry(0.1, 0.4, 4, 8);
    } else {
      geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    }

    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.65,
    });

    const mesh = new THREE.InstancedMesh(geometry, material, count);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(mesh);

    const dummy = new THREE.Object3D();

    // Initialize particles
    const particles: ParticleData[] = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;

      const x = (Math.random() - 0.5) * visibleWidth;
      const y = (Math.random() - 0.5) * visibleHeight;
      const z = (Math.random() - 0.5) * 20;

      const randomRadiusOffset = (Math.random() - 0.5) * 2;

      particles.push({
        t,
        factor,
        speed,
        xFactor,
        yFactor,
        zFactor,
        mx: x,
        my: y,
        mz: z,
        cx: x,
        cy: y,
        cz: z,
        vx: 0,
        vy: 0,
        vz: 0,
        randomRadiusOffset,
      });
    }

    // Pointer & Scroll Tracking
    const pointer = { x: 0, y: 0 };
    const lastMousePos = { x: 0, y: 0 };
    let lastMouseMoveTime = 0;
    const virtualMouse = { x: 0, y: 0 };
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let scrollVelocity = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const px = (e.clientX / window.innerWidth) * 2 - 1;
      const py = -(e.clientY / window.innerHeight) * 2 + 1;
      pointer.x = px;
      pointer.y = py;
      lastMouseMoveTime = performance.now();
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      scrollVelocity = Math.max(-15, Math.min(15, deltaY));
      lastMouseMoveTime = performance.now();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      visibleHeight = 2 * Math.tan(vFOV / 2) * 50;
      visibleWidth = visibleHeight * (width / height);
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animFrameId: number;
    let clockStart = performance.now();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      const now = performance.now();
      const elapsedTime = (now - clockStart) / 1000;

      // Dampen scroll velocity smoothly over frames
      scrollVelocity *= 0.94;

      const mouseDist = Math.hypot(pointer.x - lastMousePos.x, pointer.y - lastMousePos.y);
      if (mouseDist > 0.001) {
        lastMouseMoveTime = now;
        lastMousePos.x = pointer.x;
        lastMousePos.y = pointer.y;
      }

      let destX = (pointer.x * visibleWidth) / 2;
      let destY = (pointer.y * visibleHeight) / 2;

      if (autoAnimate && now - lastMouseMoveTime > 2000) {
        destX = Math.sin(elapsedTime * 0.5) * (visibleWidth / 4);
        destY = Math.cos(elapsedTime * 0.5 * 2) * (visibleHeight / 4);
      }

      const smoothFactor = 0.05;
      virtualMouse.x += (destX - virtualMouse.x) * smoothFactor;
      virtualMouse.y += (destY - virtualMouse.y) * smoothFactor;

      const targetX = virtualMouse.x;
      const targetY = virtualMouse.y;
      const globalRotation = elapsedTime * rotationSpeed;

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.t += particle.speed / 2;
        const { t, mx, my, mz, cz, randomRadiusOffset } = particle;

        const projectionFactor = 1 - cz / 50;
        const projectedTargetX = targetX * projectionFactor;
        const projectedTargetY = targetY * projectionFactor;

        const dx = mx - projectedTargetX;
        const dy = my - projectedTargetY;
        const dist = Math.hypot(dx, dy);

        // Continuous harmonic float & subtle scroll inertia
        let targetPosX = mx + Math.sin(t * 0.4) * 0.8;
        let targetPosY = my + Math.cos(t * 0.3) * 0.8 - scrollVelocity * 0.015;
        let targetPosZ = mz * depthFactor;

        if (dist < magnetRadius) {
          const angle = Math.atan2(dy, dx) + globalRotation;
          const wave = Math.sin(t * waveSpeed + angle) * (0.5 * waveAmplitude);
          const deviation = randomRadiusOffset * (5 / (fieldStrength + 0.1));
          const currentRingRadius = ringRadius + wave + deviation;

          targetPosX = projectedTargetX + currentRingRadius * Math.cos(angle);
          targetPosY = projectedTargetY + currentRingRadius * Math.sin(angle);
          targetPosZ = mz * depthFactor + Math.sin(t) * (1 * waveAmplitude * depthFactor);
        }

        particle.cx += (targetPosX - particle.cx) * lerpSpeed;
        particle.cy += (targetPosY - particle.cy) * lerpSpeed;
        particle.cz += (targetPosZ - particle.cz) * lerpSpeed;

        dummy.position.set(particle.cx, particle.cy, particle.cz);
        dummy.lookAt(projectedTargetX, projectedTargetY, particle.cz);
        dummy.rotateX(Math.PI / 2);

        const currentDistToMouse = Math.hypot(
          particle.cx - projectedTargetX,
          particle.cy - projectedTargetY
        );

        const distFromRing = Math.abs(currentDistToMouse - ringRadius);

        // Ambient particles remain visible throughout the field, scaling up when near the magnet ring
        const ringInfluence = Math.max(0, Math.min(1, 1 - distFromRing / 8.5));
        const scaleFactor = 0.38 + 0.62 * ringInfluence;

        const finalScale =
          scaleFactor *
          (0.85 + Math.sin(t * pulseSpeed) * 0.15 * particleVariance) *
          particleSize;

        dummy.scale.set(finalScale, finalScale, finalScale);
        dummy.updateMatrix();

        mesh.setMatrixAt(i, dummy.matrix);
      }

      mesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [
    count,
    magnetRadius,
    ringRadius,
    waveSpeed,
    waveAmplitude,
    particleSize,
    lerpSpeed,
    color,
    autoAnimate,
    particleVariance,
    rotationSpeed,
    depthFactor,
    pulseSpeed,
    particleShape,
    fieldStrength,
  ]);

  return (
    <div ref={containerRef} className="w-full h-full relative pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default Antigravity;
