"use client";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { ThreeElements, useFrame } from "@react-three/fiber";

type ModelProps = ThreeElements["group"] & {
  scaleMul?: number;
  tintBaseColor?: boolean;
  enableTwinkle?: boolean;    
};

export default function ModelSpaceGirl({
  scaleMul = 1,
  tintBaseColor = false,
  enableTwinkle = false,      
  ...rest
}: ModelProps) {
  const { scene } = useGLTF("/model/space_girl.glb");
  const cloned = useMemo(() => scene.clone(true), [scene]);

  //  ajuste fino só do Material.002 (estrelas do cabelo)
  const STAR_MAT_NAME = "Material.002";
  const STAR_TUNE = {
    emissive: "#FFF", // pode trocar aqui durante o teste
    intensity: 1.0,      // teste: 0.6 · 0.9 · 1.2 · 1.4
  };


  const starMatsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  // === mapa de cores por material (se não quiser brilho, use "#000000") ===
  const COLORS_BY_MAT: Record<string, string> = {
    "Material.002": "#FFF", // estrelas (base, será sobrescrito por STAR_TUNE se definido)
    "Material.008": "#000000", // cabelo tecido (sem brilho)
    "Material.001": "#000000", // cabelo base (sem brilho)
    "Material.010": "#FFA500", // planeta maior (laranja)
    "Material.017": "#006400", // planeta (verde escuro)
    "Material.016": "#006400", // planeta (verde escuro)
    "Material.014": "#006400", // planeta (verde escuro)
    "Material.009": "#000000", // corpo dela (sem brilho)
    "Material.021": "#ffffff", // linhas do corpo
    "Material.013": "#FF0000", // planeta (vermelho)
    "Material.012": "#FF1493", // planeta (pink)
    "Material.011": "#483D8B", // planeta (roxo escuro)
  };

  useEffect(() => {
    // evita duplicar refs em dev/StrictMode
    starMatsRef.current.length = 0;

    const forEachMat = (
      mat: THREE.Material | THREE.Material[] | undefined,
      fn: (m: THREE.Material, set: (nm: THREE.Material) => void) => void,
      setMatOnMesh: (newMat: THREE.Material | THREE.Material[]) => void
    ) => {
      if (!mat) return;
      if (Array.isArray(mat)) {
        const arr = [...mat];
        arr.forEach((m, i) => fn(m, (nm) => { arr[i] = nm; }));
        setMatOnMesh(arr);
      } else {
        let _mat = mat;
        fn(mat, (nm) => { _mat = nm; });
        setMatOnMesh(_mat);
      }
    };

    let touched = 0;

    cloned.traverse((obj) => {
      if (!(obj as THREE.Mesh).isMesh) return;
      const mesh = obj as THREE.Mesh;
      mesh.castShadow = mesh.receiveShadow = true;

      forEachMat(
        mesh.material,
        (mat, setMat) => {
          const anyMat = mat as any;

          // ignore materiais sem 'color' (Shader/Raw/etc)
          const hasColor = anyMat.color instanceof THREE.Color;
          if (!hasColor) return;

          // Se não tem emissivo, converte p/ Standard para podermos usar emissive
          if (!("emissive" in anyMat)) {
            const std = new THREE.MeshStandardMaterial();
            // copia propriedades principais
            if (anyMat.color) std.color.copy(anyMat.color);
            if (anyMat.map) std.map = anyMat.map;
            if (typeof anyMat.roughness === "number") std.roughness = anyMat.roughness; else std.roughness = 0.6;
            if (typeof anyMat.metalness === "number") std.metalness = anyMat.metalness; else std.metalness = 0.1;
            std.name = mat.name || std.name;
            std.transparent = !!anyMat.transparent;
            std.opacity = typeof anyMat.opacity === "number" ? anyMat.opacity : 1;
            setMat(std);
            mat = std;
          }

          const std = mat as THREE.MeshStandardMaterial & { emissiveIntensity?: number };

          // sRGB no baseColor map
          if (std.map && std.map.colorSpace !== THREE.SRGBColorSpace) {
            std.map.colorSpace = THREE.SRGBColorSpace;
            std.map.needsUpdate = true;
          }

          // aplica regra só se o material estiver no mapa
          const name = std.name || "";
          const hex = COLORS_BY_MAT[name];
          if (hex !== undefined) {
            const wantsGlow = hex.toLowerCase() !== "#000000";

            if (wantsGlow) {
              std.emissive = new THREE.Color(hex);
              // intensidade base “padrão”
              std.emissiveIntensity = Math.max(std.emissiveIntensity ?? 1, 2.0);
            } else {
              std.emissive = new THREE.Color(0x000000);
              std.emissiveIntensity = 0;
            }

            // override fino só para Material.002 (estrelas do cabelo)
            if (name === STAR_MAT_NAME) {
              std.emissive = new THREE.Color(STAR_TUNE.emissive);
              std.emissiveIntensity = STAR_TUNE.intensity;
              // guarda referência para twinkle
              if (!starMatsRef.current.includes(std)) {
                starMatsRef.current.push(std);
              }
            }

            if (tintBaseColor && wantsGlow) {
              std.color = new THREE.Color(hex);
            }

            std.needsUpdate = true;
            touched++;
          }
        },
        (newMat) => { mesh.material = newMat; }
      );
    });

    console.log(` Materiais ajustados via mapa: ${touched}`);
  }, [cloned, tintBaseColor, STAR_TUNE.emissive, STAR_TUNE.intensity]);

  // animação sutil opcional (twinkle) — liga com enableTwinkle
  useFrame(({ clock }) => {
    if (!enableTwinkle || starMatsRef.current.length === 0) return;
    const t = clock.getElapsedTime();
    const mul = 1.0 + Math.sin(t * 1.2) * 0.08; // variação ±8%
    for (const m of starMatsRef.current) {
      (m as any).emissiveIntensity = STAR_TUNE.intensity * mul;
    }
  });

  return (
    <group {...rest} scale={scaleMul}>
      <primitive object={cloned} />
    </group>
  );
}

useGLTF.preload("/model/space_girl.glb");
