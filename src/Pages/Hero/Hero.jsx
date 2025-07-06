// File path__
import "./Hero.css";

// Package(GSAP, FIBER, MAATH, THREE)__
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import * as random from "maath/random/dist/maath-random.esm";
import { Points, PointMaterial, Float } from "@react-three/drei";

// From react__
import { Suspense } from "react";
import React, { useRef, useEffect, useCallback } from "react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Stars component creates a 3D particle background
 */
function Stars(props) {
  const ref = useRef();
  // Generate random points within a sphere
  const [sphere] = React.useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.5 })
  );

  // Animation frame for rotating particles
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

/**
 * FloatingShape component creates a 3D floating icosahedron
 */
function FloatingShape() {
  const meshRef = useRef();

  // Animation frame for floating and rotating
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
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

/**
 * Hero component - Main hero section of the portfolio
 */
const Hero = () => {
  // Refs for GSAP animations
  const heroRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const ctaRef = useRef();
  const scrollIndicatorRef = useRef();

  // GSAP animations on component mount
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Title animation
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    )
      // Subtitle animation
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.8"
      )
      // CTA buttons animation
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      // Scroll indicator animation
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

    // Background parallax effect
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

    // Scroll indicator bounce animation
    gsap.to(".scroll-indicator", {
      y: 10,
      duration: 1.5,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  // Scroll to next section handler
  const scrollToNext = useCallback(() => {
    const nextSection = document.querySelector(".about-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section ref={heroRef} className="hero-section">
      {/* 3D Background */}
      <div className="hero-bg">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <Stars />
            <FloatingShape />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="hero-content">
        <div className="container">
          <h1 ref={titleRef} className="hero-title">
            <span className="gradient-text">MERN_STACK</span>
            <span className="block-text">Developer_</span>
          </h1>

          <p ref={subtitleRef} className="hero-subtitle">
            Learning by building real projects. I enjoy making websites that
            look good and work well.
          </p>

          <div ref={ctaRef} className="hero-cta">
            <button className="btn btn-primary" onClick={scrollToNext}>
              Explore My Work
            </button>
            <a href="/path-to-your-cv.pdf" download className="btn btn-outline">
              Download CV
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
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