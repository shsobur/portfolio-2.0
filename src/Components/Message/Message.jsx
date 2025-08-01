import "./Message.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useMemo } from "react";

gsap.registerPlugin(ScrollTrigger);

const Message = ({ message }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const wordsRef = useRef([]);

  const messageWords = useMemo(() => message.split(" "), [message]);

  const setWordRef = useMemo(
    () => (index) => (el) => (wordsRef.current[index] = el),
    []
  );

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    const words = wordsRef.current.filter(Boolean);

    if (!container || !text || words.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(words, {
        opacity: 0,
        y: 80,
        rotateX: 60,
        transformOrigin: "50% 50%",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          end: "bottom 20%",
          scrub: 1.5,
        },
      });

      tl.to(
        words,
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.08,
          ease: "power2.out",
          duration: 0.7,
        },
        0
      );

      const floatingAnim = gsap.to(text, {
        y: -20,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        modifiers: {
          y: gsap.utils.unitize((y) => {
            const scrollY = ScrollTrigger.getById("textReveal")?.progress || 0;
            return parseFloat(y) - scrollY * 80;
          }),
        },
      });

      const bgAnim = gsap.to(container, {
        backgroundPosition: "200% 50%",
        duration: 12,
        ease: "none",
        repeat: -1,
      });

      ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => {
          floatingAnim.play();
          bgAnim.play();
        },
        onLeave: () => {
          floatingAnim.pause();
          bgAnim.pause();
        },
        onEnterBack: () => {
          floatingAnim.play();
          bgAnim.play();
        },
        onLeaveBack: () => {
          floatingAnim.pause();
          bgAnim.pause();
        },
      });
    }, container);

    return () => ctx.revert();
  }, [message]);

  return (
    <section ref={containerRef} className="message-section">
      <div className="message-bg-elements" />

      <div ref={textRef} className="message-text">
        <div className="message-words-container">
          {messageWords.map((word, index) => (
            <span
              key={index}
              ref={setWordRef(index)}
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

        <div className="message-dots-container">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="message-dot"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Message;