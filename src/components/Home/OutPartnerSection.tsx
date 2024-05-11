/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";

export const OutPartnerSection = () => {
  const myElementRef = useRef<any>(null);
  const [isAnimate, setIsAnimate] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const myElement = myElementRef.current;
      if (myElement) {
        const rect = myElement.getBoundingClientRect();
        const distanceToTop = rect.top;
        const viewportHeight = window.innerHeight;
        if (distanceToTop <= viewportHeight * 0.9) {
          setIsAnimate(true);
        } else {
          setIsAnimate(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div ref={myElementRef} className="flex flex-col ">
      <div className="mb-[30px] flex flex-col">
        <span
          className={`${
            isAnimate && "active"
          } title-rotate text-[40px] font-extrabold leading-none`}
        >
          OUT
        </span>
        <span
          className={`${
            isAnimate && "active"
          } title-rotate text-[40px] font-extrabold leading-none`}
        >
          PARTNER
        </span>
      </div>
      <div className="section">
        <div className="section-item ">
          <div className="partner-item bg-[red]">
            <figure className=" partner__image relative">
              <img
                alt="Vertex Labs"
                src="https://cdn.sanity.io/images/ivpmqllf/production/0978e4dddd4dcd44e1600dee319bf9165352d249-1280x1280.jpg"
              />

              <span className="partner__name">Vertex Labs</span>
            </figure>
          </div>
        </div>
        <div className="section-item ">
          <div className="partner-item bg-[red]">
            <figure className=" partner__image relative">
              <img
                alt="Vertex Labs"
                src="https://cdn.sanity.io/images/ivpmqllf/production/0978e4dddd4dcd44e1600dee319bf9165352d249-1280x1280.jpg"
              />

              <span className="partner__name">Vertex Labs</span>
            </figure>
          </div>
        </div>
        <div className="section-item ">
          <div className="partner-item bg-[red]">
            <figure className=" partner__image relative">
              <img
                alt="Vertex Labs"
                src="https://cdn.sanity.io/images/ivpmqllf/production/0978e4dddd4dcd44e1600dee319bf9165352d249-1280x1280.jpg"
              />

              <span className="partner__name">Vertex Labs</span>
            </figure>
          </div>
        </div>
        <div className="section-item ">
          <div className="partner-item bg-[red]">
            <figure className=" partner__image relative">
              <img
                alt="Vertex Labs"
                src="https://cdn.sanity.io/images/ivpmqllf/production/0978e4dddd4dcd44e1600dee319bf9165352d249-1280x1280.jpg"
              />

              <span className="partner__name">Vertex Labs</span>
            </figure>
          </div>
        </div>
        <div className="section-item ">
          <div className="partner-item bg-[red]">
            <figure className=" partner__image relative">
              <img
                alt="Vertex Labs"
                src="https://cdn.sanity.io/images/ivpmqllf/production/0978e4dddd4dcd44e1600dee319bf9165352d249-1280x1280.jpg"
              />

              <span className="partner__name">Vertex Labs</span>
            </figure>
          </div>
        </div>
        <div className="section-item ">
          <div className="partner-item bg-[red]">
            <figure className=" partner__image relative">
              <img
                alt="Vertex Labs"
                src="https://cdn.sanity.io/images/ivpmqllf/production/0978e4dddd4dcd44e1600dee319bf9165352d249-1280x1280.jpg"
              />

              <span className="partner__name">Vertex Labs</span>
            </figure>
          </div>
        </div>
        <div className="section-item ">
          <div className="partner-item bg-[red]">
            <figure className=" partner__image relative">
              <img
                alt="Vertex Labs"
                src="https://cdn.sanity.io/images/ivpmqllf/production/0978e4dddd4dcd44e1600dee319bf9165352d249-1280x1280.jpg"
              />

              <span className="partner__name">Vertex Labs</span>
            </figure>
          </div>
        </div>
        <div className="section-item ">
          <div className="partner-item bg-[red]">
            <figure className=" partner__image relative">
              <img
                alt="Vertex Labs"
                src="https://cdn.sanity.io/images/ivpmqllf/production/0978e4dddd4dcd44e1600dee319bf9165352d249-1280x1280.jpg"
              />

              <span className="partner__name">Vertex Labs</span>
            </figure>
          </div>
        </div>
        <div className="section-item ">
          <div className="partner-item mr-[50px] bg-[red]">
            <figure className=" partner__image relative">
              <img
                alt="Vertex Labs"
                src="https://cdn.sanity.io/images/ivpmqllf/production/0978e4dddd4dcd44e1600dee319bf9165352d249-1280x1280.jpg"
              />

              <span className="partner__name">Vertex Labs</span>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};
