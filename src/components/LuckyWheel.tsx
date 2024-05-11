import { checkWidthMobile } from "@/utils";
import { getStaticURL } from "@/utils/constants";
import Image from "next/image";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { ButtonPrimary } from "./core/Button";
import { useTranslation } from "react-i18next";
import { Option } from "./ModalWheel";
import { LoadingSpinner } from "./LoadingSpinner";

export const LuckyWheel: React.FC<{
  onFinished: () => void;
  data: Option[];
  getResult: () => Promise<number | null>;
}> = ({ onFinished, data, getResult }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [radius] = useState(checkWidthMobile(65, 100, 100)); // Increased radius value
  const [rotate, setRotate] = useState(0);
  const [easeOut, setEaseOut] = useState(0);
  const { t } = useTranslation();
  const [angle, setAngle] = useState(0);
  const [top, setTop] = useState<number | null>(null);
  const [offset, setOffset] = useState<number | null>(null);
  const [net, setNet] = useState<number | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [spinFinished, setSpinFinished] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [timer, setTimer] = useState<number>(5);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    renderWheel();
    renderSmallCircle();
  }, []);

  const renderWheel = () => {
    const numOptions = data.length;
    const arcSize = (2 * Math.PI) / numOptions;
    setAngle(arcSize);

    topPosition(numOptions, arcSize);

    let angle = 0;
    for (let i = 0; i < numOptions; i++) {
      const text = data[i].option;
      renderSector(
        i + 1,
        text,
        angle,
        arcSize,
        data[i].style.textColor,
        data[i].style.backgroundColor,
      );
      angle += arcSize;
    }
  };

  const renderSmallCircle = () => {
    const circleContainer = document.getElementById(
      "circleContainer",
    ) as HTMLElement;
    const largeCircle = document.getElementById("largeCircle") as HTMLElement;

    const numberOfSmallCircles = 24;
    const largeCircleRadius =
      largeCircle.offsetWidth / 2 + checkWidthMobile(7, 11, 11);

    for (let i = 0; i < numberOfSmallCircles; i++) {
      const smallCircle = document.createElement("div");
      smallCircle.classList.add("small-circle");

      const angle = (360 / numberOfSmallCircles) * i;
      const radians = angle * (Math.PI / 180);
      const x = largeCircleRadius * Math.cos(radians);
      const y = largeCircleRadius * Math.sin(radians);

      smallCircle.style.left =
        largeCircle.offsetLeft +
        largeCircleRadius +
        x -
        checkWidthMobile(11, 18, 18) +
        "px";
      smallCircle.style.top =
        largeCircle.offsetTop +
        largeCircleRadius +
        y -
        checkWidthMobile(11, 18, 18) +
        "px";

      circleContainer.appendChild(smallCircle);
    }
  };

  const topPosition = (num: number, angle: number) => {
    let topSpot: number | null = null;
    let degreesOff: number | null = null;

    if (num === 9) {
      topSpot = 7;
      degreesOff = Math.PI / 2 - angle * 2;
    } else if (num === 8) {
      topSpot = 6;
      degreesOff = 0;
    } else if (num <= 7 && num > 4) {
      topSpot = num - 1;
      degreesOff = Math.PI / 2 - angle;
    } else if (num === 4) {
      topSpot = num - 1;
      degreesOff = 0;
    } else if (num <= 3) {
      topSpot = num;
      degreesOff = Math.PI / 2;
    }

    setTop(topSpot !== null ? topSpot - 1 : null);
    setOffset(degreesOff);
  };

  const renderSector = (
    index: number,
    text: string,
    start: number,
    arc: number,
    color: string,
    bgColor: string,
  ) => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const x = canvas.width / 2;
    const y = canvas.height / 2;

    ctx.beginPath();
    ctx.arc(x, y, radius, start, start + arc, false);
    ctx.lineWidth = radius * 2; // Adjusted line width
    ctx.strokeStyle = bgColor;
    ctx.font = `${radius * 0.2}px Arial`; // Adjusted font size
    ctx.fillStyle = color;
    ctx.stroke();

    ctx.save();
    ctx.translate(
      radius * 2 + Math.cos(index * arc - arc / 2) * (radius * 1.5 - 20),
      radius * 2 + Math.sin(index * arc - arc / 2) * (radius * 1.5 - 20),
    );
    ctx.rotate(index * arc - arc / 2);
    ctx.fillText(text, -ctx.measureText(text).width / 2, 6);
    ctx.restore();
  };

  const spin = async () => {
    if (!spinning) {
      setSpinning(true);

      setIsLoading(true);
      const spinResult = await getResult();
      if (spinResult) {
        smoothRotateCanvas(spinResult);
        setResult(spinResult);
        setTimeout(() => {
          setSpinFinished(true);
          onFinished();
          setSpinning(false);
        }, 6000);
      } else {
        setSpinning(false);
      }
      setIsLoading(false);
    }
  };

  const easeInOutQuad = (t: number) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  const smoothRotateCanvas = (result: number | null) => {
    const start = performance.now();
    const duration = 5000;

    const animate = (time: number) => {
      const elapsed = time - start;
      const targetAngle = (360 / data.length) * (result ?? 1) - 60;
      const progress = easeInOutQuad(Math.min(elapsed / duration, 1));
      let rotate = progress * 360 * 6;

      if (result) {
        rotate = progress * 360 * 6 + 5 + targetAngle;
      }

      const canvas = canvasRef.current!;
      canvas.style.transform = `rotate(${rotate}deg)`;

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const handleReset = () => {
    const canvas = canvasRef.current!;
    canvas.style.transform = `rotate(0deg)`;
    setResult(null);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="relative mb-10 w-fit -rotate-90 overflow-hidden">
        <div
          className="rounded-full bg-[#FDC74D] p-1.5 md:p-3"
          style={{
            boxShadow: "inset 0 0 10px -5px #000",
          }}
        >
          <div
            id="circleContainer"
            className="rounded-full bg-[#890005] p-3.5 md:p-6"
            style={{
              boxShadow: "inset 0 0 15px -3px #000, 0 0 8px -3px #000",
            }}
          >
            <div
              id="largeCircle"
              className="rounded-full bg-[#FDC74D] p-1.5 md:p-3"
              style={{
                boxShadow: "inset 0 0 8px -3px #000, 0 0 8px -3px #000",
              }}
            >
              <div className="relative">
                <canvas
                  id="wheel"
                  ref={canvasRef}
                  width={`${radius * 4}px`}
                  height={`${radius * 4}px`}
                  style={{
                    transform: `rotate(${rotate}deg)`,
                    transition: `transform ${easeOut}s ease-in-out`,
                  }}
                />
                <div
                  className="absolute left-0 top-0 z-20 h-full w-full rounded-full bg-transparent"
                  style={{
                    boxShadow: "inset 0 0 15px 0px #000, 0 0 8px -3px #000",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <Image
          src={`${getStaticURL()}/assets/images/Spinner.svg`}
          width={50}
          height={50}
          className="absolute left-1/2 top-1/2 z-10  -translate-y-1/2 rotate-90 transform "
          alt="wheel"
        />
      </div>
      {!spinFinished ? (
        <ButtonPrimary
          onClick={spin}
          disabled={isLoading}
          className="flex gap-2"
        >
          {t(isLoading ? "verifying" : spinning ? "spinning" : "reward")}
          {isLoading && (
            <div className="h-6 w-6">
              <LoadingSpinner />
            </div>
          )}
        </ButtonPrimary>
      ) : (
        <ButtonPrimary
          onClick={() => {
            handleReset();
            setSpinFinished(false);
          }}
          disabled={isLoading}
        >
          {t("continue")}
        </ButtonPrimary>
      )}
    </div>
  );
};

export default LuckyWheel;
