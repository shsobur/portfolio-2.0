import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Skill = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const categoriesRef = useRef([]);
  const skillsRefs = useRef([]);
  const floatingElementsRef = useRef([]);

  const skillsData = [
    {
      category: "Frontend",
      skills: [
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "JavaScript",
        "React",
        "Axios",
        "TenStackQuery",
      ],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express.js", "MongoDB"],
    },
    {
      category: "Tools & Others",
      skills: [
        "Git & GitHub",
        "Firebase",
        "JWT",
        "Figma",
        "Netlify",
        "Vercel",
        "Npm",
        "VS Code",
        "Chrome DevTools",
      ],
    },
  ];

  // Generate floating geometric shapes for background
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

      // Main title animation
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Categories animation
      categoriesRef.current.forEach((category, index) => {
        if (category) {
          gsap.fromTo(
            category,
            {
              opacity: 0,
              y: 50,
              scale: 0.9,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
              delay: 0.6 + index * 0.2,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      // Skills animation with stagger
      skillsRefs.current.forEach((skill, index) => {
        if (skill) {
          gsap.fromTo(
            skill,
            {
              opacity: 0,
              x: 30,
              scale: 0.8,
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.7)",
              delay: 1 + index * 0.08,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const styles = {
    section: {
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #000000 100%)",
      padding: "80px 20px",
      position: "relative",
      overflow: "hidden",
      fontFamily: "Inter, sans-serif",
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
      maxWidth: "1200px",
      margin: "0 auto",
      position: "relative",
      zIndex: 10,
    },
    headerContainer: {
      textAlign: "center",
      marginBottom: "80px",
    },
    title: {
      fontSize: "4rem",
      fontWeight: "bold",
      background: "linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      marginBottom: "24px",
      lineHeight: "1.2",
    },
    subtitle: {
      fontSize: "1.25rem",
      color: "#d1d5db",
      maxWidth: "600px",
      margin: "0 auto",
      lineHeight: "1.6",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "40px",
      marginBottom: "80px",
    },
    categoryContainer: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(10px)",
      borderRadius: "16px",
      padding: "32px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
    categoryTitle: {
      fontSize: "1.875rem",
      fontWeight: "bold",
      color: "#ffffff",
      marginBottom: "24px",
      position: "relative",
      paddingBottom: "12px",
    },
    categoryUnderline: {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "48px",
      height: "4px",
      background: "linear-gradient(90deg, #06b6d4, #8b5cf6)",
      borderRadius: "2px",
    },
    skillsContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    skillCard: {
      background:
        "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      padding: "16px",
      position: "relative",
      overflow: "hidden",
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    skillText: {
      fontSize: "1.125rem",
      fontWeight: "600",
      color: "#ffffff",
      position: "relative",
      zIndex: 2,
    },
    ctaContainer: {
      textAlign: "center",
      marginTop: "80px",
    },
    ctaText: {
      fontSize: "1.125rem",
      color: "#d1d5db",
      marginBottom: "32px",
    },
    ctaButton: {
      background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
      color: "#ffffff",
      border: "none",
      borderRadius: "50px",
      padding: "16px 32px",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      position: "relative",
      overflow: "hidden",
      transition: "all 0.3s ease",
    },
  };

  // Add dynamic hover styles
  const addHoverEffects = () => {
    const style = document.createElement("style");
    style.textContent = `
      .skill-card:hover {
        transform: translateY(-4px) scale(1.02);
        border-color: rgba(6, 182, 212, 0.5);
        box-shadow: 0 20px 40px rgba(6, 182, 212, 0.2);
      }
      .skill-card:hover .skill-text {
        color: #06b6d4;
      }
      .cta-button:hover {
        transform: translateY(-2px) scale(1.05);
        box-shadow: 0 10px 30px rgba(6, 182, 212, 0.4);
      }
    `;
    document.head.appendChild(style);
  };

  useEffect(() => {
    addHoverEffects();
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
        {/* Header */}
        <div style={styles.headerContainer}>
          <h2 ref={titleRef} style={styles.title}>
            My Skills
          </h2>
          <p ref={subtitleRef} style={styles.subtitle}>
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Skills Grid */}
        <div style={styles.grid}>
          {skillsData.map((category, categoryIndex) => {
            let skillCount = 0;
            return (
              <div
                key={category.category}
                ref={(el) => (categoriesRef.current[categoryIndex] = el)}
                style={styles.categoryContainer}
              >
                <h3 style={styles.categoryTitle}>
                  {category.category}
                  <div style={styles.categoryUnderline} />
                </h3>
                <div style={styles.skillsContainer}>
                  {category.skills.map((skill, skillIndex) => {
                    const globalIndex = skillCount + skillIndex;
                    skillCount++;
                    return (
                      <div
                        key={skill}
                        ref={(el) =>
                          (skillsRefs.current[categoryIndex * 10 + skillIndex] =
                            el)
                        }
                        className="skill-card"
                        style={styles.skillCard}
                      >
                        <span className="skill-text" style={styles.skillText}>
                          {skill}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div style={styles.ctaContainer}>
          <p style={styles.ctaText}>
            Ready to build something amazing together?
          </p>
          <button className="cta-button" style={styles.ctaButton}>
            Let's Connect
          </button>
        </div>
      </div>
    </section>
  );
};

export default Skill;
