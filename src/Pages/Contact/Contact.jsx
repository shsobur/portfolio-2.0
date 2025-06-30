import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Contact.css";

const Contact = () => {
  const sectionRef = useRef();
  const titleRef = useRef();
  const formRef = useRef();
  const socialRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Form animation
    gsap.fromTo(
      formRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Social links animation
    gsap.fromTo(
      socialRef.current.children,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.1,
        scrollTrigger: {
          trigger: socialRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Floating elements animation
    gsap.to(".contact-float", {
      y: -15,
      duration: 3,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.5,
    });

    // Background particle animation
    gsap.to(".contact-particle", {
      rotation: 360,
      duration: 20,
      ease: "none",
      repeat: -1,
      stagger: 1,
    });
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);

    // Animate submit button
    gsap.to(e.target.querySelector(".submit-btn"), {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
    });

    // Reset form
    setFormData({ name: "", email: "", message: "" });

    // Show success message (you can customize this)
    alert("Thank you! Your message has been sent.");
  };

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com",
      icon: "⚡",
      color: "#333",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      icon: "💼",
      color: "#0077b5",
    },
    {
      name: "Twitter",
      url: "https://twitter.com",
      icon: "🐦",
      color: "#1da1f2",
    },
    {
      name: "Email",
      url: "mailto:hello@example.com",
      icon: "📧",
      color: "#ea4335",
    },
    {
      name: "Discord",
      url: "https://discord.com",
      icon: "🎮",
      color: "#7289da",
    },
  ];

  return (
    <section ref={sectionRef} className="contact-section section">
      <div className="contact-bg">
        <div className="contact-particle contact-particle-1"></div>
        <div className="contact-particle contact-particle-2"></div>
        <div className="contact-particle contact-particle-3"></div>
        <div className="contact-particle contact-particle-4"></div>
      </div>

      <div className="container">

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-float">
              <h3 className="contact-subtitle">Ready to collaborate?</h3>
              <p className="contact-description">
                I'm always excited to work on new projects and collaborate with
                amazing people. Whether you have a project in mind, want to
                discuss opportunities, or just want to say hello, I'd love to
                hear from you!
              </p>
            </div>

            <div className="contact-highlights">
              <div className="highlight-card contact-float">
                <div className="highlight-icon">🚀</div>
                <h4>Fast Response</h4>
                <p>I typically respond within 24 hours</p>
              </div>

              <div className="highlight-card contact-float">
                <div className="highlight-icon">💡</div>
                <h4>Creative Solutions</h4>
                <p>Bringing innovative ideas to every project</p>
              </div>

              <div className="highlight-card contact-float">
                <div className="highlight-icon">🎯</div>
                <h4>Quality Focus</h4>
                <p>Committed to delivering exceptional results</p>
              </div>
            </div>

            <div ref={socialRef} className="social-links">
              <h4 className="social-title">Connect with me</h4>
              <div className="social-grid">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ "--social-color": social.color }}
                  >
                    <span className="social-icon">{social.icon}</span>
                    <span className="social-name">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form
              ref={formRef}
              className="contact-form"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Tell me about your project or just say hello..."
                  rows="6"
                  required
                />
              </div>

              <button type="submit" className="submit-btn btn btn-primary">
                <span className="btn-text">Send Message</span>
                <span className="btn-icon">→</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-content">
            <p>
              &copy; 2024 Portfolio Website. Built with React, GSAP & Three.js
            </p>
            <p>Designed with ❤️ and lots of ☕</p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
