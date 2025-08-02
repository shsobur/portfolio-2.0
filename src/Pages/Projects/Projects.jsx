// File path__
import "./Projects.css";
import project1 from "../../assets/GlobeTrek.png";
import project2 from "../../assets/StudyGroup.png";

// Package()__
import { gsap } from "gsap";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// From react__
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const titleRef = useRef(null);
  const projectsGridRef = useRef(null);
  const projectCardsRef = useRef([]);

  // Sample project data - you can replace with your actual projects
  const projects = [
    {
      title: "A Tourism Platform",
      description:
        "A full-stack tourism platform built with React, Node.js, Express, and MongoDB. It supports three user roles: Tourist, Tour Guide, and Admin. Key features include authentication, tour package browsing, booking system, tour guide applications, and fully functional dashboards with role-based access and CRUD operations. Designed to simulate a real-world travel service experience.",
      tags: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Tailwind CSS",
        "Tour Booking",
        "Dashboard",
        "Role-Based Access",
        "Full-Stack",
      ],
      image: project1,
      liveLink: "https://globetrek-4557f.web.app/",
      githubLink: "https://github.com/shsobur",
    },
    {
      title: "Assignment Collaboration Platform",
      description:
        "A full-stack group-study application built with React, Node.js, Express, and MongoDB. Students can create, submit, and evaluate various assignments. Key features include secure authentication, difficulty-based filtering, grading, and protected routes — designed to simulate a real-time collaborative learning platform for enhanced student interaction.",
      tags: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Firebase Auth",
        "JWT",
        "Tailwind CSS",
        "React AOS",
        "CRUD",
        "Full-Stack",
      ],
      image: project2,
      liveLink: "https://study-group-cb18a.web.app/",
      githubLink: "https://github.com/shsobur",
    },
    {
      title: "AI Chat Assistant",
      description:
        "An intelligent chat assistant powered by machine learning, featuring natural language processing and context-aware responses.",
      tags: ["Python", "TensorFlow", "FastAPI", "React"],
      image: "/api/placeholder/400/250",
      liveLink: "https://globetrek-4557f.web.app/",
      githubLink: "https://github.com/shsobur",
    },
    {
      title: "Weather Dashboard",
      description:
        "A responsive weather dashboard with interactive maps, forecasts, and location-based weather alerts using modern APIs.",
      tags: ["JavaScript", "D3.js", "Weather API", "CSS3"],
      image: "/api/placeholder/400/250",
      liveLink: "https://globetrek-4557f.web.app/",
      githubLink: "https://github.com/shsobur",
    },
    {
      title: "Portfolio Website",
      description:
        "A modern, responsive portfolio website with 3D animations, smooth scrolling, and optimized performance across all devices.",
      tags: ["React", "Three.js", "GSAP", "CSS3"],
      image: "/api/placeholder/400/250",
      liveLink: "https://globetrek-4557f.web.app/",
      githubLink: "https://github.com/shsobur",
    },
    {
      title: "Social Media Analytics",
      description:
        "A comprehensive analytics dashboard for social media insights with data visualization and automated reporting features.",
      tags: ["React", "Chart.js", "Node.js", "Redis"],
      image: "/api/placeholder/400/250",
      liveLink: "https://globetrek-4557f.web.app/",
      githubLink: "https://github.com/shsobur",
    },
  ];

  useEffect(() => {
    // Three.js setup for background animation
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Create floating geometric shapes
    const geometries = [
      new THREE.OctahedronGeometry(0.5),
      new THREE.TetrahedronGeometry(0.7),
      new THREE.IcosahedronGeometry(0.6),
      new THREE.DodecahedronGeometry(0.5),
    ];

    const materials = [
      new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
      new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
    ];

    const meshes = [];
    for (let i = 0; i < 15; i++) {
      const geometry =
        geometries[Math.floor(Math.random() * geometries.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );

      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      meshes.push(mesh);
      scene.add(mesh);
    }

    camera.position.z = 10;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.005 + index * 0.001;
        mesh.rotation.y += 0.007 + index * 0.001;
        mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
      });

      renderer.render(scene, camera);
    };

    animate();

    // GSAP Animations
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
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Projects grid animation
    gsap.fromTo(
      projectsGridRef.current,
      {
        opacity: 0,
        y: 80,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: projectsGridRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Individual project cards animation
    projectCardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
            rotationX: 45,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.8,
            delay: 0.6 + index * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="projects-section" ref={containerRef}>
      <canvas ref={canvasRef} className="projects-canvas" />

      <div className="projects-container">
        <div className="projects-header">
          <h2 className="projects-title" ref={titleRef}>
            <span className="title-accent">My</span> Projects
          </h2>
          <div className="title-underline"></div>
          <p className="projects-subtitle">
            Showcasing my latest work and creative solutions
          </p>
        </div>

        <div className="projects-grid" ref={projectsGridRef}>
          {projects.map((project, index) => (
            <a
              href="#"
              key={index}
              className="project-card"
              ref={(el) => (projectCardsRef.current[index] = el)}
            >
              <div className="card-inner">
                <div className="card-front">
                  <a target="main" href={project?.liveLink}>
                    <div className="project-image">
                      <img src={project.image} alt={project.title} />
                      <div className="image-overlay">
                        <div className="overlay-content">
                          <span className="view-project">View Project</span>
                          <div className="project-arrow">→</div>
                        </div>
                      </div>
                    </div>
                  </a>

                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="project-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="git_repo_btn_parent_container">
                      <a target="main" href={project?.githubLink}>
                        <button className="view-all-projects">
                          GitHub Repository →
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="floating-elements">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
      </div>
    </section>
  );
};

export default Projects;
