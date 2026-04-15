import { useRef, useMemo, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* ─── helpers ─────────────────────────────────────────────── */
function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn, { passive: true });
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
}

/* ─── canvas texture helper ─────────────────────────────── */
function makeCanvasTexture(drawFn, w = 512, h = 512) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  drawFn(ctx, w, h);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/* ─── MONSTER CAN ─────────────────────────────────────────── */
function drawMonsterLabel(ctx, w, h) {
  // Background – satin black
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, w, h);

  // Subtle grid texture
  ctx.strokeStyle = "rgba(57,255,20,0.05)";
  ctx.lineWidth = 1;
  for (let y = 0; y < h; y += 20) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }

  // Neon-green gradient band
  const grd = ctx.createLinearGradient(0, 0, 0, h);
  grd.addColorStop(0, "rgba(57,255,20,0.0)");
  grd.addColorStop(0.4, "rgba(57,255,20,0.18)");
  grd.addColorStop(0.6, "rgba(57,255,20,0.18)");
  grd.addColorStop(1, "rgba(57,255,20,0.0)");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, w, h);

  // Big "M" claw mark
  ctx.save();
  ctx.shadowColor = "#39FF14";
  ctx.shadowBlur = 30;
  ctx.fillStyle = "#39FF14";
  ctx.font = `bold ${w * 0.62}px 'Arial Black', sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("M", w / 2, h * 0.42);

  // MONSTER label
  ctx.shadowBlur = 10;
  ctx.font = `bold ${w * 0.10}px 'Arial Black', sans-serif`;
  ctx.fillStyle = "#ffffff";
  ctx.fillText("MONSTER", w / 2, h * 0.75);

  // ENERGY text
  ctx.font = `${w * 0.065}px 'Arial', sans-serif`;
  ctx.fillStyle = "rgba(57,255,20,0.8)";
  ctx.letterSpacing = "6px";
  ctx.fillText("ENERGY DRINK", w / 2, h * 0.88);
  ctx.restore();

  // Top/bottom rim stripes
  const rimH = h * 0.06;
  const rimGrd = ctx.createLinearGradient(0, 0, w, 0);
  rimGrd.addColorStop(0, "#1a1a1a");
  rimGrd.addColorStop(0.5, "#333");
  rimGrd.addColorStop(1, "#1a1a1a");
  ctx.fillStyle = rimGrd;
  ctx.fillRect(0, 0, w, rimH);
  ctx.fillRect(0, h - rimH, w, rimH);
}

function drawRedBullLabel(ctx, w, h) {
  // Silver metallic background
  const bg = ctx.createLinearGradient(0, 0, w, 0);
  bg.addColorStop(0, "#1a1a2e");
  bg.addColorStop(0.3, "#16213e");
  bg.addColorStop(0.7, "#0f3460");
  bg.addColorStop(1, "#1a1a2e");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Red stripe
  ctx.fillStyle = "#CC0000";
  ctx.fillRect(0, h * 0.08, w, h * 0.84);

  // Metallic silver overlay
  const silver = ctx.createLinearGradient(0, 0, w, 0);
  silver.addColorStop(0, "rgba(200,200,220,0.0)");
  silver.addColorStop(0.15, "rgba(200,200,220,0.12)");
  silver.addColorStop(0.5, "rgba(255,255,255,0.06)");
  silver.addColorStop(0.85, "rgba(200,200,220,0.12)");
  silver.addColorStop(1, "rgba(200,200,220,0.0)");
  ctx.fillStyle = silver;
  ctx.fillRect(0, 0, w, h);

  // Bulls logo area – two bulls silhouettes
  ctx.save();
  ctx.shadowColor = "#FFD700";
  ctx.shadowBlur = 15;
  ctx.fillStyle = "#FFD700";
  ctx.font = `bold ${w * 0.11}px 'Arial', sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  // Simplified bull icon using unicode
  ctx.font = `${w * 0.28}px serif`;
  ctx.fillText("🐂", w / 2 - w * 0.12, h * 0.38);
  ctx.fillText("🐂", w / 2 + w * 0.12, h * 0.38);
  ctx.restore();

  // RED BULL text
  ctx.save();
  ctx.shadowColor = "#000";
  ctx.shadowBlur = 4;
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${w * 0.13}px 'Arial Black', sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText("Red Bull", w / 2, h * 0.62);
  ctx.font = `${w * 0.07}px 'Arial', sans-serif`;
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.fillText("ENERGY DRINK", w / 2, h * 0.74);
  ctx.font = `${w * 0.055}px 'Arial', sans-serif`;
  ctx.fillStyle = "rgba(255,215,0,0.9)";
  ctx.fillText("250ml", w / 2, h * 0.86);
  ctx.restore();
}

function drawCigaretteLabel(ctx, w, h) {
  // White paper body
  ctx.fillStyle = "#F5F0E8";
  ctx.fillRect(0, 0, w, h);
  // Subtle paper grain lines
  ctx.strokeStyle = "rgba(0,0,0,0.04)";
  ctx.lineWidth = 1;
  for (let y = 0; y < h; y += 4) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }
  // Gold band near filter
  const bandY = h * 0.78;
  ctx.fillStyle = "#C9A84C";
  ctx.fillRect(0, bandY, w, h * 0.04);
  ctx.fillStyle = "#E8C96A";
  ctx.fillRect(0, bandY + h * 0.04, w, h * 0.02);
  // Filter area (tan/brown)
  ctx.fillStyle = "#C4956A";
  ctx.fillRect(0, h * 0.82, w, h * 0.18);
  const filterGrd = ctx.createLinearGradient(0, 0, w, 0);
  filterGrd.addColorStop(0, "rgba(180,120,80,0.5)");
  filterGrd.addColorStop(0.5, "rgba(220,160,100,0.3)");
  filterGrd.addColorStop(1, "rgba(180,120,80,0.5)");
  ctx.fillStyle = filterGrd;
  ctx.fillRect(0, h * 0.82, w, h * 0.18);
  // Brand text
  ctx.save();
  ctx.fillStyle = "#2C2C2C";
  ctx.font = `bold ${w * 0.09}px 'Georgia', serif`;
  ctx.textAlign = "center";
  ctx.fillText("CAMEL", w / 2, h * 0.3);
  ctx.font = `${w * 0.065}px 'Georgia', serif`;
  ctx.fillStyle = "#555";
  ctx.fillText("FILTERS", w / 2, h * 0.42);
  ctx.restore();
}

/* ─── CIGARETTE 3D ──────────────────────────────────────── */
function Cigarette({ position, rotation, scale = 1 }) {
  const bodyTex = useMemo(() => makeCanvasTexture(drawCigaretteLabel, 256, 512), []);
  const groupRef = useRef();
  const t = useRef(Math.random() * 100);

  useFrame((_, delta) => {
    t.current += delta * 0.4;
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.08;
      groupRef.current.position.y = position[1] + Math.sin(t.current) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Body */}
      <mesh>
        <cylinderGeometry args={[0.06, 0.06, 1.8, 32]} />
        <meshStandardMaterial map={bodyTex} roughness={0.6} metalness={0.05} />
      </mesh>
      {/* Ember tip */}
      <mesh position={[0, 0.92, 0]}>
        <cylinderGeometry args={[0.06, 0.055, 0.08, 32]} />
        <meshStandardMaterial color="#FF4500" emissive="#FF2200" emissiveIntensity={2} roughness={1} />
      </mesh>
      {/* Ash */}
      <mesh position={[0, 1.02, 0]}>
        <cylinderGeometry args={[0.058, 0.05, 0.06, 32]} />
        <meshStandardMaterial color="#888888" roughness={1} />
      </mesh>
      {/* Ember glow light */}
      <pointLight position={[0, 0.96, 0]} color="#FF4500" intensity={0.5} distance={0.8} decay={2} />
    </group>
  );
}

/* ─── DRINK CAN 3D ───────────────────────────────────────── */
function DrinkCan({ type = "monster", position, rotation, scale = 1 }) {
  const labelTex = useMemo(() =>
    makeCanvasTexture(type === "monster" ? drawMonsterLabel : drawRedBullLabel, 512, 512),
    [type]
  );
  const groupRef = useRef();
  const t = useRef(Math.random() * 100);

  useFrame((_, delta) => {
    t.current += delta * 0.3;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
      groupRef.current.position.y = position[1] + Math.sin(t.current) * 0.2;
    }
  });

  const canColor = type === "monster" ? "#0a0a0a" : "#CC0000";
  const rimColor = type === "monster" ? "#2a2a2a" : "#888899";

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Main can body */}
      <mesh>
        <cylinderGeometry args={[0.22, 0.22, 0.9, 64, 1, true]} />
        <meshStandardMaterial map={labelTex} roughness={0.25} metalness={0.6} side={THREE.BackSide} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.22, 0.22, 0.9, 64, 1, false]} />
        <meshStandardMaterial map={labelTex} roughness={0.25} metalness={0.6} />
      </mesh>

      {/* Top dome */}
      <mesh position={[0, 0.48, 0]}>
        <cylinderGeometry args={[0.20, 0.22, 0.06, 64]} />
        <meshStandardMaterial color={rimColor} roughness={0.2} metalness={0.85} />
      </mesh>
      <mesh position={[0, 0.54, 0]}>
        <cylinderGeometry args={[0.10, 0.20, 0.04, 64]} />
        <meshStandardMaterial color={rimColor} roughness={0.2} metalness={0.85} />
      </mesh>
      {/* Pull tab */}
      <mesh position={[0.08, 0.58, 0]} rotation={[0.3, 0, 0]}>
        <torusGeometry args={[0.04, 0.012, 8, 16, Math.PI * 1.5]} />
        <meshStandardMaterial color="#silver" roughness={0.1} metalness={0.95} />
      </mesh>

      {/* Bottom */}
      <mesh position={[0, -0.45, 0]}>
        <cylinderGeometry args={[0.20, 0.22, 0.06, 64]} />
        <meshStandardMaterial color={rimColor} roughness={0.2} metalness={0.85} />
      </mesh>
      <mesh position={[0, -0.49, 0]}>
        <circleGeometry args={[0.20, 64]} />
        <meshStandardMaterial color={rimColor} roughness={0.15} metalness={0.9} />
      </mesh>

      {/* Glow for Monster */}
      {type === "monster" && (
        <pointLight color="#39FF14" intensity={0.4} distance={1.5} decay={2} />
      )}
      {type === "redbull" && (
        <pointLight color="#CC0000" intensity={0.3} distance={1.5} decay={2} />
      )}
    </group>
  );
}

/* ─── WAVE PLANE ────────────────────────────────────────── */
function WavePlane() {
  const meshRef = useRef();
  const { size } = useThree();

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(14, 6, 120, 60);
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const pos = meshRef.current.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const wave =
        Math.sin(x * 0.8 + t * 1.2) * 0.18 +
        Math.sin(x * 1.5 - t * 0.9 + y * 0.5) * 0.1 +
        Math.cos(y * 1.2 + t * 0.7) * 0.12 +
        Math.sin((x + y) * 0.6 + t * 1.5) * 0.07;
      pos.setZ(i, wave);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2.2, -1]}>
      <meshStandardMaterial
        color="#1a1a2e"
        emissive="#FFB627"
        emissiveIntensity={0.07}
        wireframe={false}
        transparent
        opacity={0.55}
        roughness={0.1}
        metalness={0.7}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ─── WAVE WIREFRAME (ambient lines) ─────────────────────── */
function WaveWireframe() {
  const meshRef = useRef();

  const geometry = useMemo(() => new THREE.PlaneGeometry(14, 6, 60, 30), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() + 1.2;
    const pos = meshRef.current.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const wave =
        Math.sin(x * 0.8 + t * 1.2) * 0.18 +
        Math.sin(x * 1.5 - t * 0.9 + y * 0.5) * 0.1 +
        Math.cos(y * 1.2 + t * 0.7) * 0.12;
      pos.setZ(i, wave);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2.15, -0.98]}>
      <meshStandardMaterial
        color="#FFB627"
        emissive="#FFB627"
        emissiveIntensity={0.3}
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
}

/* ─── FLOATING PARTICLES ────────────────────────────────── */
function FloatingDots() {
  return (
    <Sparkles
      count={60}
      scale={[10, 6, 4]}
      size={1.2}
      speed={0.3}
      opacity={0.4}
      color="#FFB627"
      noise={0.2}
    />
  );
}

/* ─── AMBIENT RINGS ─────────────────────────────────────── */
function AmbientRing({ radius, yPos, speed, color }) {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = clock.getElapsedTime() * speed;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
    }
  });
  return (
    <mesh ref={meshRef} position={[0, yPos, -2]}>
      <torusGeometry args={[radius, 0.015, 8, 100]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.25} />
    </mesh>
  );
}

/* ─── MAIN SCENE ────────────────────────────────────────── */
function SceneContent({ mobile }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#ffffff" castShadow />
      <directionalLight position={[-5, 3, -3]} intensity={0.4} color="#FFB627" />
      <pointLight position={[0, 4, 2]} color="#00E5FF" intensity={0.3} distance={8} />

      {/* Wave */}
      <WavePlane />
      <WaveWireframe />

      {/* Floating particles */}
      {!mobile && <FloatingDots />}

      {/* Ambient rings */}
      <AmbientRing radius={2.5} yPos={0.5} speed={0.15} color="#FFB627" />
      {!mobile && <AmbientRing radius={3.8} yPos={-0.5} speed={-0.08} color="#00E5FF" />}

      {/* Monster can - left */}
      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.6}>
        <DrinkCan type="monster" position={[-2.8, 0.5, 0.5]} rotation={[0, 0.4, 0.1]} scale={mobile ? 1.1 : 1.4} />
      </Float>

      {/* Red Bull can - right */}
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.5}>
        <DrinkCan type="redbull" position={[2.6, 0.3, 0.3]} rotation={[0, -0.5, -0.05]} scale={mobile ? 1.0 : 1.3} />
      </Float>

      {/* Cigarettes */}
      {!mobile && (
        <>
          <Float speed={2.2} rotationIntensity={0.6} floatIntensity={0.4}>
            <Cigarette position={[-1.2, 1.4, 0.8]} rotation={[0.3, 0.5, -1.1]} scale={1.3} />
          </Float>
          <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.7}>
            <Cigarette position={[1.4, 0.9, 1.0]} rotation={[-0.2, -0.3, 0.9]} scale={1.1} />
          </Float>
        </>
      )}
      {mobile && (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Cigarette position={[0, 1.6, 0.5]} rotation={[0.2, 0.3, -0.5]} scale={1.1} />
        </Float>
      )}
    </>
  );
}

/* ─── EXPORTED CANVAS ───────────────────────────────────── */
export default function Scene3D({ style }) {
  const mobile = useIsMobile();

  return (
    <Canvas
      style={{ position: "absolute", inset: 0, zIndex: 1, ...style }}
      camera={{ position: [0, 1.5, 6], fov: mobile ? 65 : 55 }}
      dpr={[1, mobile ? 1.5 : 2]}
      gl={{ antialias: !mobile, alpha: true }}
      shadows={false}
    >
      <Suspense fallback={null}>
        <SceneContent mobile={mobile} />
      </Suspense>
    </Canvas>
  );
}
