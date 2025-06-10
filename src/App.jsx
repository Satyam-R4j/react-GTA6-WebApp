import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const App = () => {
  const [showContent, setShowContent] = useState(false); // Start with SVG overlay

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
        // Remove overlay and show content
        document.querySelector(".svg-overlay").remove();
        setShowContent(true);
      },
    });
  }, []);

  return (
    <>
      {/* SVG Overlay */}
      <div className="svg-overlay fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-black">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
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

      {/* Main Content */}
      {showContent && (
        <div className="main w-full">
          <div className="landing w-full h-screen bg-black">
          <div className="navbar absolute top-0 left-0 z-[10] w-full py-10 px-10 ">
            <div className="logo flex  gap-10">
              <div className="lines flex flex-col  gap-1">
                <div className="line w-10 h-2 bg-white"></div>
                <div className="line w-8 h-2 bg-white"></div>
                <div className="line w-5 h-2 bg-white"></div>

              </div>
              <h3 className="text-3xl text-white">Rockstar</h3>
            </div>
          </div>
            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img className="absolute left-0 right-0 w-full h-full object-cover" src="/sky.png" alt="" />
              <img
                className="absolute left-0 right-0 w-full h-full object-cover"
                src="/bg.png"
                alt="Background"
              />
              <img className="absolute -bottom-[25%] left-1/2 -translate-x-1/2 h-screen scale-[1.4]  "  src="/girlbg.png" alt="" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
