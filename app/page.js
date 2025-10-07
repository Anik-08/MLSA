"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { gsap } from "gsap";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Events from "./components/Events";
import Teams from "./components/Teams";
import Footer from "./components/Footer";
import Second from "./components/Second";
import Fifth from "./components/Fifth";

export default function Home() {
  const logoRef = useRef(null);
  const navbarRef = useRef(null);
  const textSectionRef = useRef(null);
  const blobRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize AOS only
    AOS.init({
      offset: 120,
      duration: 800, // Shorter duration
      easing: "ease-out",
      once: true,
      mirror: false,
      debounceDelay: 50
    });
    
    // Add simple scroll optimization
    const handleScroll = () => {
      // Throttle scroll events
      if (!window.requestAnimationFrame) return;
      
      window.requestAnimationFrame(() => {
        // Any scroll-based logic here
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Debounced resize handler
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setIsMobile(window.matchMedia("(max-width: 767px)").matches);
      }, 100);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  useEffect(() => {
    // GSAP animations with cleanup
    const ctx = gsap.context(() => {
      const animateLogoAndText = () => {
        const logoScale = isMobile ? 0.18 : 0.25;
        const logoPosition = isMobile ? "-40vw" : "0";
        const logoVerticalShift = isMobile ? "-30rem" : "-27rem";

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(logoRef.current, {
          scale: logoScale,
          x: logoPosition,
          y: logoVerticalShift,
          duration: 0.5,
          delay: 1,
          force3D: true
        });

        tl.fromTo(
          navbarRef.current.querySelector(".left-nav"),
          { x: 50 },
          { x: 0, opacity: 1, duration: 0.5 },
          "<"
        ).fromTo(
          navbarRef.current.querySelector(".right-nav"),
          { x: -50 },
          { x: 0, opacity: 1, duration: 0.5 },
          "<"
        );

        tl.fromTo(
          textSectionRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1 },
          "<+0.5"
        );

        tl.fromTo(
          blobRef.current,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 1 },
          "<"
        );
      };

      animateLogoAndText();
    });

    return () => ctx.revert();
  }, [isMobile]);

  // Keep remaining logic the same
  const getTopValues = () => {
    if (isFullscreen) {
      return { meme1: "100vh", meme2: "100vh" };
    } else {
      return { meme1: "-40vh", meme2: "-55vh" };
    }
  };

  const topValues = getTopValues();

  return (
    <div id="home" className="min-h-full relative overflow-hidden bg-black">
      {/* Optimized Background Image */}
      <div className="absolute inset-0 w-full h-full bg-center max-sm:bg-contain lg:bg-cover z-0">
        <Image
          src="/Background.svg"
          alt="Background"
          width={1920}
          height={1080}
          priority
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-50 h-full w-full">
        <div ref={navbarRef}>
          <Navbar />
        </div>
        {/* Recruitment Banner - Absolute positioning */}
<div className="absolute top-20 left-0 right-0 z-40 w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#010a1c] via-[#010d46] to-[#000765] backdrop-blur-sm border-y border-[#1E2761]/30 max-sm:top-16 max-sm:px-3 max-sm:py-2 mt-2 max-sm:mt-1 max-sm:flex-col max-sm:gap-3 md:px-4 md:py-3">
  {/* Left side - Text with accent bar */}
  <div className="flex items-center gap-4 max-sm:gap-2 max-sm:w-full max-sm:justify-center md:gap-3">
    <div className="w-1 h-12 bg-gradient-to-b from-[#8AAAE5] to-[#1E2761] rounded-full max-sm:h-6 md:h-10"></div>
    <h2 className="text-2xl md:text-xl lg:text-2xl xl:text-3xl font-bold text-white font-[CB] max-sm:text-xs max-sm:text-center md:text-base">
      Ready to make an <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8AAAE5] to-[#408EC6]">Impact?</span> Join us At MLSACIT
    </h2>
  </div>

  {/* Right side - Join Us Button */}
  <button
    onClick={() => window.location.href = '/recruitment'}
    className="group relative px-6 py-3 bg-gradient-to-r from-[#8AAAE5] to-[#1E2761] text-white font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 max-sm:px-4 max-sm:py-2 max-sm:text-xs max-sm:w-full max-sm:justify-center md:px-4 md:py-2 md:text-sm flex-shrink-0"
  >
    <span className="relative z-10 flex items-center gap-2 justify-center">
      Recruitment Form
      <svg 
        className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 max-sm:w-3 max-sm:h-3 md:w-4 md:h-4" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-[#1E2761] to-[#408EC6] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </button>
</div>
        <div className="logo-custom absolute mt-32 w-full flex justify-center max-custom:h-[36rem] max-custom:mt-[9.4rem]">
          <Image
            ref={logoRef}
            src="/logo.svg"
            alt="MSC Logo"
            width={450}
            height={450}
            priority
          />
        </div>  


        {/* Rest of your components remain the same */}
        <div className="grid grid-cols-1 lg:grid-cols-3 w-full h-auto px-4 lg:px-8 py-12 gap-8 bg-am">
        <div className="relative flex flex-col col-span-3 lg:flex-row items-center justify-between w-full bg-red h-[80vh] md:justify-center sm:justify-center max-sm:justify-center  ">
            {/* Text Section */}
            <div
              ref={textSectionRef}
              className="text-white lg:w-auto text-center lg:text-left m-2 mb-8 lg:mb-0 bg-b z-10 lg:absolute lg:left-0 lg:ml-0 max-sm:p-3 lg:overflow-visible"
            >
              <h1 className="font-extrabold text-3xl md:text-5xl lg:text-6xl font-[CB] max-sm:mt-[2.5vh] bg-clip-text text-transparent bg-gradient-to-r from-[#8AAAE5] max-sm:-ml-[25vw] max-sm:text-[8vw]">
                Microsoft  Learn
              </h1>
              <h1 className="font-extrabold text-3xl md:text-5xl lg:text-6xl whitespace-nowrap font-[CB] max-sm:text-[8vw] max-sm:ml-[1vw]  bg-clip-text text-transparent bg-gradient-to-r from-[#333333]  to-[#FFFFFF] max-sm:-mt-[1vh] ">
                Student  Ambassadors
              </h1>
              
              <h2 className="font-extrabold  md:text-3xl lg:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-[#1E2761]  to-[#408EC6] font-[CB]  max-sm:text-[5vw] max-sm:-ml-[56vw]">
                CIT CHAPTER
              </h2>
              {/* <h3 className="text-xl md:text-2xl font-thin font-[CB] bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#8AAAE5] max-sm:text-[4vw] mb-2">
                An ISE Dept. Initiative
              </h3> */}
              <p className="p-3 font-mono font-semibold text-sm md:text-base mt-4 max-sm:mt-[42vh] max-sm:text-left bg-[#11182784] max-sm:p-3 rounded-2xl max-sm:text-[3.5vw]">
              More than a chapter — where every mind pens the next big page.
              </p>
            </div>

            {/* Foreground Image */}
            <div className="absolute right-0  flex justify-center lg:justify-end h-auto w-full pt-[3rem] md:h-auto sm:h-auto max-sm:pt-0 max-sm:h-auto lg:translate-x-[11rem] z-0  lg:w-[70vw]">
              <Image
                ref={blobRef}
                src="/blob.svg"
                alt="MSC Logo"
                layout="responsive"
                width={500}
                height={500}
                className="rounded-sm bg-opacity-100 object-cover "
              />
            </div>
          </div>
        </div>

        <div className="secpage w-full min-h-full">
          <Second />
        </div>

        {/* Section Divider */}
        <div className="relative w-full h-full mt-10">
          <Image
            src="/Banner2.svg"
            alt="banner"
            width={1920}
            height={36}
            className="absolute"
            data-aos="slide-right"
          />
          <Image
            src="/Banner1.svg"
            alt="banner"
            width={1920}
            height={36}
            data-aos="slide-left"
          />
        </div>

        {/* About Section */}
        <div
          id="about"
          className="about w-full min-h-screen scroll-mt-20 text-white px-4 lg:px-8 py-12 max-sm:py-0 max-sm:-mt-20"
        >
          <About />
        </div>

        {/* Events Section */}
        <div
          id="events"
          className="events w-full text-white px-4 lg:px-8 py-12 relative"
        >
          <Events />
        </div>

        <div className="secpage w-full h-full">
          <Fifth />
        </div>

        {/* Teams Section */}
        <div
          id="teams"
          className="teams w-full h-full text-white overflow-x-visible scroll-mt-10 px-4 lg:px-8 py-24 relative"
        >
          <Teams />
        </div>
      </div>

      <div className="w-full h-full  relative z-10">
        <Footer />
      </div>
    </div>
  );
}





