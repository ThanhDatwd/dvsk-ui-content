"use client";
import { getStaticURL } from "@/utils/constants";
import {
  Loader,
  OrbitControls,
  ScrollControls,
  useFBX,
  useTexture,
} from "@react-three/drei";
import { Canvas, RootState, extend, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
extend({ OrbitControls });

import { Color, Mesh, MeshStandardMaterial } from "three";

type Props = {
  character: string;
  scale?: number;
  autoRotate?: boolean;
  enableZoom?: boolean;
};

export const Scene = ({ character, scale }: Props) => {
  const groupRef = useRef();
  const fbx = useFBX(
    `${getStaticURL()}/assets/images/models/${character}/file.fbx`,
  );
  const texture = useTexture({
    map: `${getStaticURL()}/assets/images/models/${character}/texture.png`,
  });

  if (!fbx || !texture) {
    return;
  }

  const meshName = fbx.children.map((item) => item.name);

  const getMeshByName = (name: string) => {
    return fbx.getObjectByName(name) as THREE.Mesh;
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useFrame((state) => {
    state.camera.lookAt(0, 3, 0);
  });

  meshName.forEach((name) => {
    const bodyNode = getMeshByName(name);

    const bodyMaterial = new MeshStandardMaterial({
      map: texture.map,
    });
    bodyNode.material = bodyMaterial;
  });



  return (
    <>
      <group position={[0, 0, 0]}>
        <mesh>
          <primitive ref={groupRef} object={fbx} scale={scale || 0.03} />
        </mesh>
      </group>
    </>
  );
};

const SceneModel = ({
  character,
  scale,
  autoRotate = false,
  enableZoom = false,
}: Props) => {
  return (
    <div className="h-[600px] w-full overflow-hidden">
      <Canvas camera={{ position: [10, 4, 10], fov: 35 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 0]} />
        <Suspense fallback={null}>
          <ScrollControls pages={0}>
            <Scene character={character} scale={scale} />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
};
export default SceneModel;
