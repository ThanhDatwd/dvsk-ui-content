import React, { useRef, useEffect, useState } from "react";
import SceneModelHomepage from "./3D";
import { useOnboard } from "@/hooks/useOnboard";

const LazyLoaded3DAnimation = () => {
  const containerRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const { isLoadingBoardingDone } = useOnboard();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsIntersecting(entry.isIntersecting);
      });
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        opacity: isLoadingBoardingDone ? 1 : 0,
      }}
    >
      {isIntersecting && (
        <div>
          <SceneModelHomepage />
        </div>
      )}
    </div>
  );
};

export default LazyLoaded3DAnimation;
