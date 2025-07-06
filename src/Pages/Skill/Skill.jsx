import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Skill.css"; // Import the CSS file

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

  return (
    <section ref={sectionRef} className="skills-section">
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

      <div className="skills-container">
        {/* Header */}
        <div className="skills-header">
          <h2 ref={titleRef} className="skills-title">
            My Skills
          </h2>
          <p ref={subtitleRef} className="skills-subtitle">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {skillsData.map((category, categoryIndex) => (
            <div
              key={category.category}
              ref={(el) => (categoriesRef.current[categoryIndex] = el)}
              className="skills-category"
            >
              <h3 className="category-title">
                {category.category}
                <div className="category-underline" />
              </h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill}
                    ref={(el) =>
                      (skillsRefs.current[categoryIndex * 10 + skillIndex] = el)
                    }
                    className="skill-card"
                  >
                    <span className="skill-text">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="skills-cta">
          <p className="cta-text">Ready to build something amazing together?</p>
          <button className="cta-button">Let's Connect</button>
        </div>
      </div>
    </section>
  );
};

export default Skill;