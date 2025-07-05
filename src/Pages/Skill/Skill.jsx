import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Skill.css";

gsap.registerPlugin(ScrollTrigger);

const Skill = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const categoriesRef = useRef([]);
  const skillsRefs = useRef([]);

  const skillsData = [
    {
      category: "Frontend",
      skills: [
        "React",
        "TypeScript",
        "Next.js",
        "Tailwind CSS",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Vue.js",
      ],
    },
    {
      category: "Backend",
      skills: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "PostgreSQL",
        "Python",
        "Django",
        "REST APIs",
        "GraphQL",
      ],
    },
    {
      category: "Tools & Others",
      skills: [
        "Git",
        "Docker",
        "AWS",
        "Firebase",
        "Webpack",
        "Figma",
        "VS Code",
        "Linux",
      ],
    },
  ];

  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 50; i++) {
      stars.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
      });
    }
    return stars;
  };

  const stars = generateStars();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".star", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
        stagger: { each: 2, from: "random" },
      });

      gsap.to(".star", {
        scale: 1.5,
        opacity: 0.8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: { each: 0.5, from: "random" },
      });

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      categoriesRef.current.forEach((el, i) => {
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 50, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: 0.6 + i * 0.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      skillsRefs.current.forEach((el, i) => {
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0, x: 30, scale: 0.8 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.6,
              delay: 1 + i * 0.08,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%",
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
    <section ref={sectionRef} className="skill-section">
      {/* Stars */}
      <div className="star-bg">
        {stars.map((s) => (
          <div
            key={s.id}
            className="star"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
            }}
          />
        ))}
      </div>

      <div className="skill-container">
        <div className="skill-header">
          <h2 ref={titleRef} className="skill-title">
            My Skills
          </h2>
          <p ref={subtitleRef} className="skill-subtitle">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="skill-grid">
          {skillsData.map((category, i) => (
            <div
              key={category.category}
              className="category-box"
              ref={(el) => (categoriesRef.current[i] = el)}
            >
              <h3 className="category-title">
                {category.category}
                <div className="category-underline" />
              </h3>
              <div className="skill-list">
                {category.skills.map((skill, j) => (
                  <div
                    key={skill}
                    className="skill-card"
                    ref={(el) => (skillsRefs.current[i * 10 + j] = el)}
                  >
                    <span className="skill-text">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="cta">
          <p className="cta-text">Ready to build something amazing together?</p>
          <button className="cta-button">Let's Connect</button>
        </div>
      </div>
    </section>
  );
};

export default Skill;
