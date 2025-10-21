"use client";

import { useGLTF } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";

// Tipagem leve: se precisar de acesso a meshes individuais, podemos detalhar depois.
type ModelProps = ThreeElements['group'] & {
  /** Multiplicador de escala; ajuste conforme o tamanho do seu GLB */
  scaleMul?: number;
};

export default function ModelTurtleHouse({
  scaleMul = 1,
  ...groupProps
}: ModelProps) {
  // Carrega a cena do GLB
  const { scene } = useGLTF("/model/space_girl.glb");

  // Evita mutar o original (boa prática se um dia instanciar várias vezes)
  const cloned = useMemo(() => scene.clone(true), [scene]);

  // Opcional: habilitar sombras (se usar shadows no Canvas/lights)
  useMemo(() => {
    cloned.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const m = obj as THREE.Mesh;
        m.castShadow = true;
        m.receiveShadow = true;
      }
    });
  }, [cloned]);

  return (
    <group {...groupProps} scale={scaleMul}>
      <primitive object={cloned} />
    </group>
  );
}

// Pré-carrega (melhora o carregamento quando a seção entra em viewport)
useGLTF.preload("/model/space_girl.glb");
