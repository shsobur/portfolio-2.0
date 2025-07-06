// File path__
import image from "../../assets/image.png";
import "./About.css";

// Packge(GSAP)__
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// From react__
import React, { useEffect, useRef } from "react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  // Refs for GSAP animations
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const statsRefs = useRef([]);
  const textRefs = useRef([]);
  const timelineRef = useRef(null);
  const floatingElementsRef = useRef([]);

  // Static content data
  const aboutData = {
    title: "About Me",
    name: "Sobur Hossen",
    role: "MERN Stack Developer",
    description: [
      "I'm a passionate front-end developer with solid skills in HTML5, CSS3, JavaScript, and React.js.",
      "In addition to my front-end expertise, I have foundational knowledge of Express.js, Node.js, and MongoDB, and I’m actively expanding my backend development skills to become a well-rounded MERN Stack developer.",
      "I am highly motivated to learn and embrace new challenges.",
    ],
    stats: [
      { number: "25+", label: "Projects Completed" },
      { number: "1+", label: "Years Experience" },
      { number: "5+", label: "Happy Clients" },
      { number: "19+", label: "Technologies" },
    ],
    timeline: [
      {
        year: "🧭 Jan 2024",
        title: "Started My Journey",
        company: "Self-taught Developer",
        description: "Began learning web development fundamentals.",
      },
      {
        year: "🧱 Jun 2024",
        title: "Freelance & Personal Projects",
        company: "Freelance & Personal Projects",
        description: "Built MERN stack projects.",
      },
      {
        year: "🚀 2025",
        title: "Frontend Developer (MERN)",
        company: "Open to Work",
        description: "Focused on writing clean, reusable React components.",
      },
    ],
  };

  /**
   * Generates floating background elements with random positions and properties
   */
  const generateFloatingElements = () => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 60 + 20,
      shape: Math.random() > 0.5 ? "circle" : "square",
      opacity: Math.random() * 0.1 + 0.05,
    }));
  };

  const floatingElements = generateFloatingElements();

  // GSAP animations setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating elements animation
      floatingElementsRef.current.forEach((el, i) => {
        if (el) {
          gsap.to(el, {
            y: "random(-50, 50)",
            x: "random(-30, 30)",
            rotation: "random(-180, 180)",
            duration: "random(8, 15)",
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: i * 0.2,
          });
        }
      });

      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, rotationY: -90, scale: 0.8 },
        {
          opacity: 1,
          rotationY: 0,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Text paragraphs animation
      textRefs.current.forEach((text, i) => {
        if (text) {
          gsap.fromTo(
            text,
            { opacity: 0, x: 50, y: 30 },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 1,
              ease: "power2.out",
              delay: 0.6 + i * 0.2,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      // Stats animation
      statsRefs.current.forEach((stat, i) => {
        if (stat) {
          gsap.fromTo(
            stat,
            { opacity: 0, y: 50, scale: 0.5 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.7)",
              delay: 1 + i * 0.15,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 50%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // Number counter animation
          const numberEl = stat.querySelector(".stat-number");
          if (numberEl) {
            const endValue = parseInt(numberEl.textContent.replace(/\D/g, ""));
            gsap.fromTo(
              { count: 0 },
              { count: endValue },
              {
                duration: 2,
                delay: 1.2 + i * 0.15,
                ease: "power2.out",
                onUpdate: function () {
                  const suffix = numberEl.textContent.replace(/\d/g, "");
                  numberEl.textContent =
                    Math.round(this.targets()[0].count) + suffix;
                },
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top 50%",
                  end: "bottom 20%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        }
      });

      // Timeline animation
      if (timelineRef.current) {
        const items = timelineRef.current.querySelectorAll(".timeline-item");
        const line = timelineRef.current.querySelector(".timeline-line");

        gsap.fromTo(
          items,
          { opacity: 0, x: -100, scale: 0.8 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.2,
            delay: 1.5,
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 70%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );

        if (line) {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 2,
              ease: "power2.out",
              delay: 1.2,
              scrollTrigger: {
                trigger: timelineRef.current,
                start: "top 70%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-section">
      {/* Floating background elements */}
      <div className="floating-background">
        {floatingElements.map((el) => (
          <div
            key={el.id}
            ref={(e) => (floatingElementsRef.current[el.id] = e)}
            className={`floating-element ${el.shape}`}
            style={{
              left: `${el.left}%`,
              top: `${el.top}%`,
              width: `${el.size}px`,
              height: `${el.size}px`,
              opacity: el.opacity,
            }}
          />
        ))}
      </div>

      <div className="about-container">
        <h2 ref={titleRef} className="about-title">
          {aboutData.title}
        </h2>

        <div className="about-main-content">
          <div className="about-image-section">
            <div ref={imageRef} className="about-image-container">
              <div className="profile-image-placeholder">
                <img src={image} alt={aboutData.name} />
              </div>
            </div>
          </div>

          <div className="about-text-section">
            <h3 className="about-name">{aboutData.name}</h3>
            <p className="about-role">{aboutData.role}</p>

            {aboutData.description.map((para, i) => (
              <p
                key={i}
                ref={(e) => (textRefs.current[i] = e)}
                className="about-paragraph"
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        <div className="about-stats-container">
          {aboutData.stats.map((stat, i) => (
            <div
              key={i}
              ref={(e) => (statsRefs.current[i] = e)}
              className="stat-card"
            >
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="about-timeline-section">
          <h3 className="timeline-title">My Journey</h3>
          <div ref={timelineRef} className="timeline-container">
            <div className="timeline-line"></div>
            {aboutData.timeline.map((item, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <h4 className="timeline-job-title">{item.title}</h4>
                  <div className="timeline-company">{item.company}</div>
                  <p className="timeline-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
