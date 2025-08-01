import image from "../../assets/image.png";
import "./About.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef, useMemo, useCallback } from "react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const statsRefs = useRef([]);
  const textRefs = useRef([]);
  const timelineRef = useRef(null);
  const floatingElementsRef = useRef([]);

  // Memoize static data
  const aboutData = useMemo(
    () => ({
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
    }),
    []
  );

  // Memoize floating elements generation
  const floatingElements = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 40 + 20,
      shape: Math.random() > 0.5 ? "circle" : "square",
      opacity: Math.random() * 0.1 + 0.05,
    }));
  }, []);

  // Optimized GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Batch animations where possible
      const section = sectionRef.current;
      const commonTrigger = {
        trigger: section,
        toggleActions: "play none none reverse",
      };

      // Floating elements animation
      floatingElementsRef.current.forEach((el, i) => {
        if (el) {
          gsap.to(el, {
            y: "random(-30, 30)",
            x: "random(-20, 20)",
            rotation: "random(-90, 90)",
            duration: "random(10, 15)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.3,
          });
        }
      });

      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            ...commonTrigger,
            start: "top 85%",
          },
        }
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, rotationY: -45 },
        {
          opacity: 1,
          rotationY: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            ...commonTrigger,
            start: "top 75%",
          },
        }
      );

      // Text paragraphs animation
      textRefs.current.forEach((text, i) => {
        if (text) {
          gsap.fromTo(
            text,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              delay: 0.2 + i * 0.15,
              scrollTrigger: commonTrigger,
            }
          );
        }
      });

      // Stats animation
      statsRefs.current.forEach((stat, i) => {
        if (stat) {
          gsap.fromTo(
            stat,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.4)",
              delay: 0.4 + i * 0.1,
              scrollTrigger: commonTrigger,
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
                duration: 1.5,
                delay: 0.6 + i * 0.15,
                ease: "power2.out",
                onUpdate: function () {
                  const suffix = numberEl.textContent.replace(/\d/g, "");
                  numberEl.textContent =
                    Math.round(this.targets()[0].count) + suffix;
                },
                scrollTrigger: commonTrigger,
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
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: {
              ...commonTrigger,
              trigger: timelineRef.current,
            },
          }
        );

        if (line) {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                ...commonTrigger,
                trigger: timelineRef.current,
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Memoized callback for ref assignment
  const setTextRef = useCallback(
    (index) => (el) => {
      textRefs.current[index] = el;
    },
    []
  );

  const setStatRef = useCallback(
    (index) => (el) => {
      statsRefs.current[index] = el;
    },
    []
  );

  const setFloatingRef = useCallback(
    (index) => (el) => {
      floatingElementsRef.current[index] = el;
    },
    []
  );

  return (
    <section ref={sectionRef} className="about-section">
      <div className="floating-background">
        {floatingElements.map((el, index) => (
          <div
            key={el.id}
            ref={setFloatingRef(index)}
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
                <img
                  src={image}
                  alt={aboutData.name}
                  width="520"
                  height="520"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="about-text-section">
            <h3 className="about-name">{aboutData.name}</h3>
            <p className="about-role">{aboutData.role}</p>

            {aboutData.description.map((para, i) => (
              <p key={i} ref={setTextRef(i)} className="about-paragraph">
                {para}
              </p>
            ))}
          </div>
        </div>

        <div className="about-stats-container">
          {aboutData.stats.map((stat, i) => (
            <div key={i} ref={setStatRef(i)} className="stat-card">
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