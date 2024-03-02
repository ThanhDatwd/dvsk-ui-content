import React, { useRef, useEffect, useState } from "react";
import SceneModelHomepage from "./3D";

const LazyLoaded3DAnimation = () => {
  const containerRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isLoadingDone, setIsLoadingDone] = useState(false);

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

  console.log(isLoadingDone);
  

  return (
    <div ref={containerRef}>
      {isIntersecting && (
        <div>
          <SceneModelHomepage />
        </div>
      )}
    </div>
  );
};

export default LazyLoaded3DAnimation;
