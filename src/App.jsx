import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

const App = () => {
  const [showContent, setShowContent] = useState(false);

  // Overlay animation
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "power1.inOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "expo.inOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onComplete: () => {
        document.querySelector(".svg-overlay").remove();
        setShowContent(true);
      },
    });
  }, []);

  // Mousemove parallax effect
  useGSAP(() => {
    if (!showContent) return;

    const main = document.querySelector(".main");

    // Set initial transform to match removed Tailwind class
    gsap.set(".texts", { xPercent: -50 });

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;

      gsap.to(".texts", {
        x: `${xMove * 0.4}%`,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(".sky", {
        x: xMove,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(".bg", {
        x: xMove * 1.7,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  }, [showContent]);

  return (
    <>
      <div className="svg-overlay fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-black">
        <svg
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
        >
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="/bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {showContent && (
        <div className="main w-full">
          <div className="landing w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-10 px-10">
              <div className="logo flex gap-7">
                <div className="lines flex flex-col gap-[5px]">
                  <div className="line w-15 h-2 bg-white"></div>
                  <div className="line w-8 h-2 bg-white"></div>
                  <div className="line w-5 h-2 bg-white"></div>
                </div>
                <h3 className="text-4xl -mt-[8px] leading-none text-white">
                  Rockstar
                </h3>
              </div>
            </div>

            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img
                className="absolute sky scale-[1.2] left-0 right-0 w-full h-full object-cover"
                src="/sky.png"
                alt=""
              />
              <img
                className="absolute scale-[1.3] bg left-0 right-0 w-full h-full object-cover"
                src="/bg.png"
                alt="Background"
              />
              <div className=" text-white flex flex-col gap-3 absolute top-10 left-1/2">
                <h1 className="text-[6rem] texts leading-none -ml-80">grand</h1>
                <h1 className="text-[6rem] texts leading-none -ml-60">theft</h1>
                <h1 className="text-[6rem] texts leading-none -ml-80">auto</h1>
              </div>
              <img
                className="absolute -bottom-[25%] left-1/2 -translate-x-1/2 h-screen scale-[1.4]"
                src="/girlbg.png"
                alt=""
              />
            </div>

            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-4">
                <i className="text-4xl ri-arrow-down-line"></i>
                <h3 className="text-xl font-[monospace]">Scroll Down</h3>
              </div>
              <img
                className="absolute h-[55px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                src="./ps5.png"
                alt=""
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
