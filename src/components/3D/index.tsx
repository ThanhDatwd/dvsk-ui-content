/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import { getStaticURL } from "@/utils/constants";
import {
  ContactShadows,
  Scroll,
  ScrollControls,
  Sky,
  useAnimations,
  useFBX,
  useGLTF,
  useScroll,
  useTexture,
} from "@react-three/drei";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
extend({ ScrollControls });

import Image from "next/image";
import * as THREE from "three";
import { MeshStandardMaterial } from "three";
import { TrailerModal } from "../TrailerModal";
import HeaderScene from "./HeaderScene";
import { SceneText } from "./SceneText";
import { useOnboard } from "@/hooks/useOnboard";

const Scene = (props: any) => {
  const { dataScroll } = props;
  const model = useRef();
  const character = "TranKhanhDu";

  const fbxCharacterModel = useFBX(
    `${getStaticURL()}/assets/images/animations/${character}/file.fbx`,
  );

  const textureCharacterModel = useTexture({
    map: `${getStaticURL()}/assets/images/animations/${character}/texture.png`,
    normalMap: `${getStaticURL()}/assets/images/animations/${character}/texture_normal.png`,
  });

  const { animations } = useGLTF(
    `${getStaticURL()}/assets/images/animations/${character}/file.glb`,
  );
  const { mixer, clips } = useAnimations(animations);

  useFrame((state) => {
    const offset = dataScroll?.offset || 0;
    const initialPosition = [0, 50, 10];
    const finalPosition = [0, 10, 0];
    const initialZoom = 2;
    const finalZoom = 0.6;
    const initialRotation = [0, 0, 0];
    const finalRotation = [0, 0, Math.PI * 2];

    const interpolatedZoom = initialZoom + (finalZoom - initialZoom) * offset;

    state.camera.position.set(
      initialPosition[0] + (finalPosition[0] - initialPosition[0]) * offset,
      initialPosition[1] + (finalPosition[1] - initialPosition[1]) * offset,
      initialPosition[2] + (finalPosition[2] - initialPosition[2]) * offset,
    );
    if (model.current) {
      const group = model.current as any;
      group.rotation.set(
        initialRotation[0] + (finalRotation[0] - initialRotation[0]) * offset,
        initialRotation[1] + (finalRotation[1] - initialRotation[1]) * offset,
        initialRotation[2] + (finalRotation[2] - initialRotation[2]) * offset,
      );
    }

    state.camera.zoom = interpolatedZoom;
    state.camera.updateProjectionMatrix();

    state.camera.lookAt(0, (1 - offset) * 10, 0);
  });

  const getMeshByName = useCallback(
    (name: string) => {
      return fbxCharacterModel?.getObjectByName(name) as THREE.Mesh;
    },
    [fbxCharacterModel],
  );

  useEffect(() => {
    if (fbxCharacterModel && textureCharacterModel) {
      fbxCharacterModel.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          const bodyNode = getMeshByName(child.name);

          const bodyMaterial = new MeshStandardMaterial({
            map: textureCharacterModel.map,
            normalMap: textureCharacterModel.normalMap,
          });
          bodyNode.material = bodyMaterial;
        }
      });
    }
  }, [fbxCharacterModel, getMeshByName, textureCharacterModel]);

  useEffect(() => {
    if (clips && clips.length) {
      const action = mixer.clipAction(clips[0], fbxCharacterModel);

      action.play();
    }
  }, [clips, fbxCharacterModel, mixer]);

  return (
    <group position={[0, 0, 45]}>
      <mesh
        castShadow
        position={[0, -45, 0]}
        rotation={[0, 0, 0]}
        scale={2}
        receiveShadow
      >
        <primitive ref={model} object={fbxCharacterModel} />
        <shadowMaterial
          transparent
          opacity={0.4}
          polygonOffset
          polygonOffsetFactor={10}
          color="#000030"
        />
      </mesh>
    </group>
  );
};

function Foo2(props: any) {
  const { dataScroll } = props;
  const { isLoadingBoardingDone } = useOnboard();

  const [offset, setOffset] = useState(0);
  useFrame(() => {
    dataScroll?.offset &&
      dataScroll?.offset > 0 &&
      Number(dataScroll?.offset.toFixed(4)) !== Number(offset.toFixed(4)) &&
      setOffset(dataScroll.offset);
  });
  return (
    <Scroll
      html
      style={{ width: "100%", position: "absolute", zIndex: "-100px" }}
    >
      <div
        style={{
          top: `${-4000 * offset}px`,
        }}
        className={`relative left-0  -z-40 h-[300vh] w-full`}
      >
        <div className="absolute left-0 top-0 z-[-100] h-[500vh] w-full">
          <div className="mx-auto mt-[100px] w-full ">
            {isLoadingBoardingDone && (
              <div className="mx-auto w-full overflow-hidden xs:px-4 md:px-14">
                <div className="flex flex-nowrap justify-center font-bold text-[#d8d9db] xs:text-[40px] lg:text-[140px]">
                  ĐẠI VIỆT &nbsp;
                  <div className="relative">
                    <div className="text-map transaction text-map font-bold text-[#d8d9db] duration-500 ease-in-out xs:text-[40px] lg:text-[150px]">
                      S
                    </div>
                    <Image
                      src={`${getStaticURL()}/assets/images/map.svg`}
                      width={10}
                      height={10}
                      className="map-img  absolute left-0 w-auto xs:top-0 xs:h-[60px] md:h-[180px] lg:top-3"
                      alt="Map Image"
                    />
                  </div>
                  <div className="font-bold text-[#d8d9db] xs:text-[40px] lg:text-[140px]">
                    Ử KÝ
                  </div>
                </div>
                <div className="line w-full rounded-xl bg-[#6b0e01] xs:h-[2px] lg:h-[5px]" />
              </div>
            )}
          </div>
        </div>
      </div>
    </Scroll>
  );
}
function Foo(props: any) {
  const { dataScroll } = props;
  const [offset, setOffset] = useState(0);
  useFrame(() => {
    dataScroll?.offset &&
      dataScroll?.offset > 0 &&
      Number(dataScroll?.offset.toFixed(2)) !== Number(offset.toFixed(2)) &&
      setOffset(dataScroll.offset);
  });
  return (
    <Scroll
      html
      style={{ width: "100%", position: "absolute", zIndex: "-100px" }}
    >
      <SceneText offset={offset} />
    </Scroll>
  );
}
function FirstLayer({
  setScrollData,
}: {
  setScrollData: (value: any) => void;
}) {
  const scroll = useScroll();
  useFrame(() => {
    setScrollData && setScrollData(scroll);
  });
  return (
    <Scroll html style={{ height: "100%" }}>
      <div className="h-[100vh]"></div>
    </Scroll>
  );
}

const SceneModelHomepage = () => {
  const [dataScroll, setDataScroll] = useState(null);
  const [openTrailer, setOpenTrailer] = useState(false);

  return (
    <>
      <div className="fixed z-[6] h-screen w-full">
        <Canvas shadows="basic" camera={{ fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[0, 100, 0]} />
          <ContactShadows
            position={[0, -0.8, 0]}
            opacity={0.25}
            scale={10}
            blur={1.5}
            far={0.8}
          />
          <Suspense fallback={null}>
            <ScrollControls pages={12}>
              <group position={[0, 0, -10]}>
                <Scene dataScroll={dataScroll} />
              </group>
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>
      <div className="z-2 fixed h-screen w-full">
        <Canvas shadows="basic" camera={{ fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[0, 0, 20]} />
          <Sky distance={4500} sunPosition={[100, 40, 100]} />

          <ContactShadows
            position={[0, -0.8, 0]}
            opacity={0.25}
            scale={10}
            blur={1.5}
            far={0.8}
          />
        </Canvas>
      </div>
      <div className="fixed z-[8] h-screen w-full">
        <Canvas shadows="basic" camera={{ fov: 50 }}>
          <Suspense fallback={null}>
            <ScrollControls pages={3}>
              <Foo position={[0, -100, 0]} dataScroll={dataScroll} />
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>
      <div className="fixed z-[3] h-screen w-full">
        <Canvas shadows="basic" camera={{ fov: 50 }}>
          <Suspense fallback={null}>
            <ScrollControls pages={3}>
              <Foo2 position={[0, -100, 0]} dataScroll={dataScroll} />
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>

      <div className="fixed z-[10] h-screen w-full">
        <Canvas shadows="basic" camera={{ fov: 50 }}>
          <Suspense fallback={null}>
            <ScrollControls pages={12}>
              <FirstLayer setScrollData={setDataScroll} />
              <Scroll
                html
                style={{
                  width: "100%",
                  position: "absolute",
                  zIndex: "-100px",
                }}
              >
                <div
                  className={`relative left-0 top-[0px] -z-40 h-[1200vh] w-full`}
                >
                  <HeaderScene setOpenTrailer={setOpenTrailer} />
                </div>
              </Scroll>
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>
      {openTrailer && (
        <TrailerModal
          src={`${getStaticURL()}/assets/videos/home_trailer.mp4`}
          onClose={() => {
            setOpenTrailer(false);
          }}
        />
      )}
    </>
  );
};
export default SceneModelHomepage;
