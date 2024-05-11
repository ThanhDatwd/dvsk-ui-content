/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use strict";
import { useOnboard } from "@/hooks/useOnboard";
import { getStaticURL } from "@/utils/constants";
import {
  ContactShadows,
  Scroll,
  ScrollControls,
  Sky,
  useAnimations,
  useGLTF,
  useScroll,
} from "@react-three/drei";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import LazyLoad from "react-lazyload";
import { TrailerModal } from "../TrailerModal";
import HeaderScene from "./HeaderScene";
import { SceneText } from "./SceneText";
extend({ ScrollControls });

const urlGLB = `${getStaticURL()}/assets/images/animations/TranKhanhDu/file.glb`;
useGLTF.preload(urlGLB);

const Scene = (props: any) => {
  const { dataScroll } = props;
  const model = useRef();

  const { animations, scene } = useGLTF(urlGLB);

  const { mixer } = useAnimations(animations);

  useEffect(() => {
    if (mixer && animations.length && scene) {
      const action = mixer.clipAction(animations[0], scene);
      action.play();
    }
  }, [mixer, animations, scene]);

  useFrame((state) => {
    const offset = dataScroll?.offset || 0;
    const clampedOffset = Math.min(Math.max(offset, 0), 0.99);
    const adjustedOffset = Math.sin(clampedOffset * Math.PI * 0.5);
    const initialPosition = [0, 15, 0.5];
    const finalPosition = [0, 10, 0];
    const initialZoom = 3.5;
    const finalZoom = 0.6;
    const initialRotation = [0, -Math.PI * 0.2, 0];
    const finalRotation = [0, Math.PI * 1.8, 0];

    const interpolatedZoom =
      initialZoom + (finalZoom - initialZoom) * adjustedOffset;

    state.camera.position.set(
      initialPosition[0] +
        (finalPosition[0] - initialPosition[0]) * adjustedOffset,
      initialPosition[1] +
        (finalPosition[1] - initialPosition[1]) * adjustedOffset,
      initialPosition[2] +
        (finalPosition[2] - initialPosition[2]) * adjustedOffset,
    );
    if (model.current) {
      const group = model.current as any;
      group.rotation.set(
        initialRotation[0] +
          (finalRotation[0] - initialRotation[0]) * adjustedOffset,
        initialRotation[1] +
          (finalRotation[1] - initialRotation[1]) * adjustedOffset,
        initialRotation[2] +
          (finalRotation[2] - initialRotation[2]) * adjustedOffset,
      );
    }

    state.camera.zoom = interpolatedZoom;
    state.camera.updateProjectionMatrix();

    state.camera.lookAt(0, (1 - adjustedOffset) * 10, 0);
  });

  return (
    <group scale={50} position={[0, -10, 10]} rotation={[Math.PI * 5.5, 0, 0]}>
      <primitive ref={model} object={scene} />
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
      Number(dataScroll?.offset.toFixed(3)) !== Number(offset.toFixed(3)) &&
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
          <div className="mx-auto whitespace-nowrap mt-[100px] w-full xs:text-[50px] sm:text-[60px] md:text-[80px] lg:text-[120px] xl:text-[140px]">
            {isLoadingBoardingDone && (
              <div className="mx-auto w-full overflow-hidden xs:px-4 md:px-14 ">
                <div className="flex flex-nowrap justify-center font-bold text-[#d8d9db]">
                  ĐẠI VIỆT &nbsp;
                  <div className="relative mr-2">
                    <div className="text-map transaction text-map font-bold text-[#d8d9db] duration-500 ease-in-out lg:text-[150px]">
                      S
                    </div>
                    <Image
                      src={`${getStaticURL()}/assets/images/map.svg`}
                      width={50}
                      height={50}
                      className="map-img absolute w-auto h-full left-0 xs:top-0"
                      alt="Map Image"
                    />
                  </div>
                  <div className="font-bold text-[#d8d9db]">Ử KÝ</div>
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
      Number(dataScroll?.offset.toFixed(4)) !== Number(offset.toFixed(4)) &&
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
      <LazyLoad>
        <div className="fixed z-[6] h-screen w-full">
          <Canvas shadows="basic" camera={{ fov: 50 }}>
            <hemisphereLight intensity={2.5} position={[0, 0, 0]} />
            <directionalLight position={[0, 50, -200]} castShadow />
            <directionalLight position={[0, 50, 0]} castShadow />
            <ContactShadows
              position={[0, -0.8, 0]}
              opacity={0.25}
              scale={10}
              blur={1.5}
              far={0.8}
            />
            <ScrollControls pages={12}>
              <Scene dataScroll={dataScroll} />
            </ScrollControls>
          </Canvas>
        </div>
      </LazyLoad>
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
      <LazyLoad>
        <div className="fixed z-[8] h-screen w-full">
          <Canvas shadows="basic" camera={{ fov: 50 }}>
            <ScrollControls pages={3}>
              <Foo position={[0, -100, 0]} dataScroll={dataScroll} />
            </ScrollControls>
          </Canvas>
        </div>
      </LazyLoad>
      <LazyLoad>
        <div className="fixed z-[3] h-screen w-full">
          <Canvas shadows="basic" camera={{ fov: 50 }}>
            <ScrollControls pages={3}>
              <Foo2 position={[0, -100, 0]} dataScroll={dataScroll} />
            </ScrollControls>
          </Canvas>
        </div>
      </LazyLoad>

      <LazyLoad>
        <div className="fixed z-[10] h-screen w-full">
          <Canvas shadows="basic" camera={{ fov: 50 }}>
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
          </Canvas>
        </div>
      </LazyLoad>
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
