"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useRef } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import ModelSpaceGirl from "./ModelSpaceGirl";


export default function Scene() {
  return (
    <div className="absolute inset-0 -z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true }}                 
        onCreated={(state) => {                  
          const gl = state.gl;
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.5;
        }}
        >
        <ambientLight intensity={0.15} />
        <directionalLight position={[4, 6, 6]} intensity={0.8} />

        {/* Fundo estrelado */}
        <Stars radius={60} depth={40} count={4000} factor={2} fade speed={1} />
        <EffectComposer>
          <Bloom intensity={0.9} luminanceThreshold={0.2} luminanceSmoothing={0.03} />
        </EffectComposer>
        {/* Placeholder 3D (substituir pelo seu modelo GLB de tartaruga+casa) */}
        {/* Modelo da tartaruga com casa */}
        <Suspense fallback={null}>
          {/* Ajuste scale/position/rotation conforme o tamanho do modelo */}
          <ModelSpaceGirl
            scaleMul={0.5}
            position={[0, -1.5, 0]}
            rotation={[0, Math.PI * 0.15, 0]}
            
          />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate ={true}
          autoRotateSpeed={0.2}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 6}
        />
      </Canvas>
    </div>
  );
}