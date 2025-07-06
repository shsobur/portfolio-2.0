// File path__
import "./HomePageLayout.css";
import Hero from "../Hero/Hero";
import About from "../About/About";

// Package(Lenis)__
import { gsap } from "gsap";
gsap.registerPlugin(ScrollTrigger);
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// From react_
import React, { useEffect } from "react";
import Contact from "../Contact/Contact";
import Skill from "../Skill/Skill";
import Projects from "../Projects/Projects";
import Message from "../../Components/Message/Message";

const HomePageLayout = () => {
  // Register GSAP plugins__

  useEffect(() => {
    // Initialize Lenis for smooth scrolling__

    const lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Update ScrollTrigger when Lenis scrolls
    lenis.on("scroll", ScrollTrigger.update);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <section id="main_page_container">
        <Hero></Hero>
        <Message message={"Curious who I am? Let's scroll down_"}></Message>
        <About></About>
        <Message message={"Here are the tools I work with_"}></Message>
        <Skill></Skill>
        <Message message={"Let me show you what I’ve built_"}></Message>
        <Projects></Projects>
        <Message message={"Like my work? Let’s connect_"}></Message>
        <Contact></Contact>
      </section>
    </>
  );
};

export default HomePageLayout;
