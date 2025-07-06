import "./Message.css";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const Message = ({message}) => {
  // Refs for DOM elements
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const wordsRef = useRef([]);

  // Words to be animated
  const messageWords = message.split(" ");

  /**
   * Adds DOM elements to wordsRef array for animation
   * @param {HTMLElement} el - The DOM element to add
   */
  const addToRefs = (el) => {
    if (el && !wordsRef.current.includes(el)) {
      wordsRef.current.push(el);
    }
  };

  // Animation setup
  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    const words = wordsRef.current;

    // Early return if elements not found
    if (!container || !text || words.length === 0) return;

    // Set initial state for words
    gsap.set(words, {
      opacity: 0,
      y: 100,
      rotateX: 90,
      transformOrigin: "50% 50%",
    });

    // Scroll-triggered animation
    gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        onEnter: () => {
          gsap.to(words, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          });
        },
      },
    });

    // Continuous floating animation
    gsap.to(text, {
      y: -20,
      duration: 3,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Parallax effect on scroll
    gsap.to(text, {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    });

    // Background gradient animation
    gsap.to(container, {
      backgroundPosition: "200% 50%",
      duration: 8,
      ease: "none",
      repeat: -1,
    });

    // Cleanup animations on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="message-section">
      {/* Animated background elements */}
      <div className="message-bg-elements" />

      {/* Main text content */}
      <div ref={textRef} className="message-text">
        <div className="message-words-container">
          {messageWords.map((word, index) => (
            <span
              key={index}
              ref={addToRefs}
              className={`message-word ${
                index < 4 ? "gradient-light" : "gradient-colorful"
              }`}
              data-margin-right={word === "am?" ? "0" : "0.3em"}
              data-margin-bottom={index === 3 ? "0.2em" : "0"}
            >
              {word}
              {index === 3 && <br />}
            </span>
          ))}
        </div>

        {/* Decorative dots */}
        <div className="message-dots-container">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="message-dot"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Message;