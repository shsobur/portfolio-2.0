// File path__
import "./Hero.css";
import Loader from "../../Components/Loader/Loader";

// Package__
import { gsap } from "gsap";
gsap.registerPlugin(ScrollTrigger);
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { MdOutlineFileDownload } from "react-icons/md";
import * as random from "maath/random/dist/maath-random.esm";
import { Points, PointMaterial, Float } from "@react-three/drei";

// From react
import { Suspense, useMemo, useRef, useEffect, useCallback } from "react";

function Stars(props) {
  const ref = useRef();
  const sphere = useMemo(
    () => random.inSphere(new Float32Array(2500), { radius: 1.3 }),
    []
  );

  useFrame((_, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#667eea"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function FloatingShape() {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.3;
    meshRef.current.position.y = Math.sin(t) * 0.2;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={[2, 0, -2]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#764ba2"
          transparent
          opacity={0.8}
          wireframe
        />
      </mesh>
    </Float>
  );
}

const Hero = () => {
  const heroRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const ctaRef = useRef();
  const scrollIndicatorRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

    gsap.to(".hero-bg", {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".scroll-indicator", {
      y: 10,
      duration: 1.5,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  const scrollToNext = useCallback(() => {
    const nextSection = document.querySelector(".about-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section ref={heroRef} className="hero-section">
      <div className="hero-bg">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={<Loader />}>
            <Stars />
            <FloatingShape />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
          </Suspense>
        </Canvas>
      </div>

      <div className="hero-content">
        <div className="container">
          <h1 ref={titleRef} className="hero-title">
            <span className="gradient-text">MERN {"</>"} STACK</span>
            <span className="block-text">DEVELOPER</span>
          </h1>

          <p ref={subtitleRef} className="hero-subtitle">
            I learn by building real projects. Making websites is fun… until the
            bugs💀 show up. [Do you feel the same?]
          </p>

          <div ref={ctaRef} className="hero-cta">
            <button className="btn btn-primary" onClick={scrollToNext}>
              Explore My Work
            </button>
            <a href="/path-to-your-cv.pdf" download className="btn btn-outline">
              <MdOutlineFileDownload size={20} /> Download CV / Resume
            </a>
          </div>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="scroll-indicator"
        onClick={scrollToNext}
      >
        <div className="scroll-arrow">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p>Scroll to explore</p>
      </div>
    </section>
  );
};

export default Hero;