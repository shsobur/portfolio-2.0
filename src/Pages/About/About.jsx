import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css"; // Import the CSS file

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const statsRefs = useRef([]);
  const textRefs = useRef([]);
  const timelineRef = useRef(null);
  const floatingElementsRef = useRef([]);

  // About data
  const aboutData = {
    title: "About Me",
    name: "John Doe",
    role: "Full Stack Developer & Designer",
    description: [
      "I'm a passionate full-stack developer with over 5 years of experience creating digital experiences that matter. I specialize in modern web technologies and love turning complex problems into simple, beautiful solutions.",
      "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or mentoring aspiring developers. I believe in writing clean, efficient code and creating user experiences that delight.",
      "My journey in tech started with curiosity and has evolved into a career driven by continuous learning and innovation. I'm always excited to take on new challenges and collaborate with teams to build something amazing.",
    ],
    stats: [
      { number: "50+", label: "Projects Completed" },
      { number: "5+", label: "Years Experience" },
      { number: "20+", label: "Happy Clients" },
      { number: "15+", label: "Technologies" },
    ],
    timeline: [
      {
        year: "2024",
        title: "Senior Full Stack Developer",
        company: "Tech Solutions Inc.",
        description:
          "Leading development of enterprise applications using React, Node.js, and cloud technologies.",
      },
      {
        year: "2022",
        title: "Full Stack Developer",
        company: "Digital Agency Co.",
        description:
          "Developed responsive web applications and collaborated with design teams to create seamless user experiences.",
      },
      {
        year: "2020",
        title: "Frontend Developer",
        company: "Startup Ventures",
        description:
          "Built modern, responsive interfaces using React and modern CSS frameworks.",
      },
      {
        year: "2019",
        title: "Started My Journey",
        company: "Self-taught",
        description:
          "Began learning web development and fell in love with creating digital experiences.",
      },
    ],
  };

  // Generate floating geometric shapes
  const generateFloatingElements = () => {
    const elements = [];
    for (let i = 0; i < 15; i++) {
      elements.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 60 + 20,
        shape: Math.random() > 0.5 ? "circle" : "square",
        opacity: Math.random() * 0.1 + 0.05,
      });
    }
    return elements;
  };

  const floatingElements = generateFloatingElements();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating elements animation
      floatingElementsRef.current.forEach((element, index) => {
        if (element) {
          gsap.to(element, {
            y: "random(-50, 50)",
            x: "random(-30, 30)",
            rotation: "random(-180, 180)",
            duration: "random(8, 15)",
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: index * 0.2,
          });
        }
      });

      // Title animation
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
        },
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

      // Image animation with 3D effect
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          rotationY: -90,
          scale: 0.8,
        },
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

      // Text paragraphs staggered animation
      textRefs.current.forEach((text, index) => {
        if (text) {
          gsap.fromTo(
            text,
            {
              opacity: 0,
              x: 50,
              y: 30,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 1,
              ease: "power2.out",
              delay: 0.6 + index * 0.2,
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

      // Stats animation with counter effect
      statsRefs.current.forEach((stat, index) => {
        if (stat) {
          gsap.fromTo(
            stat,
            {
              opacity: 0,
              y: 50,
              scale: 0.5,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.7)",
              delay: 1 + index * 0.15,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 50%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // Counter animation for numbers
          const numberElement = stat.querySelector(".stat-number");
          if (numberElement) {
            const endValue = parseInt(
              numberElement.textContent.replace(/\D/g, "")
            );
            gsap.fromTo(
              { count: 0 },
              { count: endValue },
              {
                duration: 2,
                delay: 1.2 + index * 0.15,
                ease: "power2.out",
                onUpdate: function () {
                  const suffix = numberElement.textContent.replace(/\d/g, "");
                  numberElement.textContent =
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
        const timelineItems =
          timelineRef.current.querySelectorAll(".timeline-item");

        gsap.fromTo(
          timelineItems,
          {
            opacity: 0,
            x: -100,
            scale: 0.8,
          },
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

        // Timeline line animation
        const timelineLine =
          timelineRef.current.querySelector(".timeline-line");
        if (timelineLine) {
          gsap.fromTo(
            timelineLine,
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
      {/* Floating geometric background */}
      <div className="floating-background">
        {floatingElements.map((element) => (
          <div
            key={element.id}
            ref={(el) => (floatingElementsRef.current[element.id] = el)}
            className={`floating-element ${
              element.shape === "circle" ? "circle" : "square"
            }`}
            style={{
              left: `${element.left}%`,
              top: `${element.top}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
              opacity: element.opacity,
            }}
          />
        ))}
      </div>

      <div className="about-container">
        {/* Title */}
        <h2 ref={titleRef} className="about-title">
          {aboutData.title}
        </h2>

        {/* Main Content */}
        <div className="about-main-content">
          {/* Image Section */}
          <div className="about-image-section">
            <div ref={imageRef} className="about-image-container">
              {/* Placeholder image - replace with actual image */}
              <div className="profile-image-placeholder">👨‍💻</div>
            </div>
          </div>

          {/* Text Section */}
          <div className="about-text-section">
            <h3 className="about-name">{aboutData.name}</h3>
            <p className="about-role">{aboutData.role}</p>

            {aboutData.description.map((paragraph, index) => (
              <p
                key={index}
                ref={(el) => (textRefs.current[index] = el)}
                className="about-paragraph"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="about-stats-container">
          {aboutData.stats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => (statsRefs.current[index] = el)}
              className="stat-card"
            >
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="about-timeline-section">
          <h3 className="timeline-title">My Journey</h3>
          <div ref={timelineRef} className="timeline-container">
            <div className="timeline-line"></div>
            {aboutData.timeline.map((item, index) => (
              <div key={index} className="timeline-item">
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