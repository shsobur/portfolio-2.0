import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  const styles = {
    section: {
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
      padding: "100px 20px",
      position: "relative",
      overflow: "hidden",
      color: "#ffffff",
    },
    floatingBackground: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 1,
    },
    floatingElement: {
      position: "absolute",
      background: "linear-gradient(45deg, #06b6d4, #8b5cf6)",
      filter: "blur(1px)",
    },
    container: {
      maxWidth: "1400px",
      margin: "0 auto",
      position: "relative",
      zIndex: 10,
    },
    title: {
      fontSize: "4.5rem",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "80px",
      background: "linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    mainContent: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "80px",
      marginBottom: "100px",
      alignItems: "center",
    },
    imageSection: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
    },
    imageContainer: {
      position: "relative",
      width: "350px",
      height: "450px",
      borderRadius: "20px",
      overflow: "hidden",
      background:
        "linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.2))",
      border: "2px solid rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
    },
    profileImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "18px",
    },
    textSection: {
      padding: "20px 0",
    },
    name: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#ffffff",
    },
    role: {
      fontSize: "1.5rem",
      color: "#06b6d4",
      marginBottom: "30px",
      fontWeight: "500",
    },
    paragraph: {
      fontSize: "1.125rem",
      lineHeight: "1.8",
      color: "#d1d5db",
      marginBottom: "25px",
      textAlign: "justify",
    },
    statsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "40px",
      marginBottom: "100px",
      padding: "60px 0",
    },
    statCard: {
      textAlign: "center",
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(10px)",
      borderRadius: "16px",
      padding: "30px 20px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.3s ease",
    },
    statNumber: {
      fontSize: "3rem",
      fontWeight: "bold",
      background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      marginBottom: "10px",
    },
    statLabel: {
      fontSize: "1rem",
      color: "#9ca3af",
      fontWeight: "500",
    },
    timelineSection: {
      position: "relative",
    },
    timelineTitle: {
      fontSize: "3rem",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "60px",
      color: "#ffffff",
    },
    timelineContainer: {
      position: "relative",
      maxWidth: "800px",
      margin: "0 auto",
    },
    timelineLine: {
      position: "absolute",
      left: "30px",
      top: 0,
      bottom: 0,
      width: "3px",
      background: "linear-gradient(180deg, #06b6d4, #8b5cf6)",
      borderRadius: "2px",
      transformOrigin: "top",
    },
    timelineItem: {
      position: "relative",
      paddingLeft: "80px",
      marginBottom: "50px",
    },
    timelineDot: {
      position: "absolute",
      left: "18px",
      top: "10px",
      width: "24px",
      height: "24px",
      background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
      borderRadius: "50%",
      border: "4px solid #0a0a0a",
    },
    timelineContent: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(10px)",
      borderRadius: "16px",
      padding: "25px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
    timelineYear: {
      fontSize: "1rem",
      color: "#06b6d4",
      fontWeight: "600",
      marginBottom: "5px",
    },
    timelineJobTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#ffffff",
      marginBottom: "5px",
    },
    timelineCompany: {
      fontSize: "1.125rem",
      color: "#8b5cf6",
      fontWeight: "500",
      marginBottom: "15px",
    },
    timelineDescription: {
      fontSize: "1rem",
      color: "#d1d5db",
      lineHeight: "1.6",
    },
  };

  // Add responsive styles
  const addResponsiveStyles = () => {
    const style = document.createElement("style");
    style.textContent = `
      @media (max-width: 768px) {
        .about-main-content {
          grid-template-columns: 1fr !important;
          gap: 40px !important;
          text-align: center;
        }
        .about-stats {
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 20px !important;
        }
        .about-title {
          font-size: 3rem !important;
        }
        .about-image-container {
          width: 280px !important;
          height: 350px !important;
        }
      }
      .stat-card:hover {
        transform: translateY(-5px);
        border-color: rgba(6, 182, 212, 0.5);
        box-shadow: 0 10px 30px rgba(6, 182, 212, 0.2);
      }
    `;
    document.head.appendChild(style);
  };

  useEffect(() => {
    addResponsiveStyles();
  }, []);

  return (
    <section ref={sectionRef} style={styles.section}>
      {/* Floating geometric background */}
      <div style={styles.floatingBackground}>
        {floatingElements.map((element) => (
          <div
            key={element.id}
            ref={(el) => (floatingElementsRef.current[element.id] = el)}
            style={{
              ...styles.floatingElement,
              left: `${element.left}%`,
              top: `${element.top}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
              borderRadius: element.shape === "circle" ? "50%" : "10px",
              opacity: element.opacity,
            }}
          />
        ))}
      </div>

      <div style={styles.container}>
        {/* Title */}
        <h2 ref={titleRef} style={styles.title} className="about-title">
          {aboutData.title}
        </h2>

        {/* Main Content */}
        <div style={styles.mainContent} className="about-main-content">
          {/* Image Section */}
          <div style={styles.imageSection}>
            <div
              ref={imageRef}
              style={styles.imageContainer}
              className="about-image-container"
            >
              {/* Placeholder image - replace with actual image */}
              <div
                style={{
                  ...styles.profileImage,
                  background:
                    "linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "4rem",
                  color: "white",
                }}
              >
                👨‍💻
              </div>
            </div>
          </div>

          {/* Text Section */}
          <div style={styles.textSection}>
            <h3 style={styles.name}>{aboutData.name}</h3>
            <p style={styles.role}>{aboutData.role}</p>

            {aboutData.description.map((paragraph, index) => (
              <p
                key={index}
                ref={(el) => (textRefs.current[index] = el)}
                style={styles.paragraph}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={styles.statsContainer} className="about-stats">
          {aboutData.stats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => (statsRefs.current[index] = el)}
              style={styles.statCard}
              className="stat-card"
            >
              <div style={styles.statNumber} className="stat-number">
                {stat.number}
              </div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div style={styles.timelineSection}>
          <h3 style={styles.timelineTitle}>My Journey</h3>
          <div ref={timelineRef} style={styles.timelineContainer}>
            <div style={styles.timelineLine} className="timeline-line"></div>
            {aboutData.timeline.map((item, index) => (
              <div
                key={index}
                style={styles.timelineItem}
                className="timeline-item"
              >
                <div style={styles.timelineDot}></div>
                <div style={styles.timelineContent}>
                  <div style={styles.timelineYear}>{item.year}</div>
                  <h4 style={styles.timelineJobTitle}>{item.title}</h4>
                  <div style={styles.timelineCompany}>{item.company}</div>
                  <p style={styles.timelineDescription}>{item.description}</p>
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