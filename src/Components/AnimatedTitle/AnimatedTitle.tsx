import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";

const AnimatedTitle = ({
  title,
  containerClass,
}: {
  title: string;
  containerClass: string;
}) => {
  const containerRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger)

  useEffect(() => {
    const context = gsap.context(() => {
    const animationTitle = gsap.timeline({
         scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center center",
          toggleActions: "play none none reverse",
        },
    })
    animationTitle.to(".animated-word", {
      opacity: 1,
      transform: "translate3d(0,0,0) rotateY(0deg) rotateX(0deg)",
      ease: "power2.inOut",
      stagger: 0.02,
    });
    }, containerRef)

    // Clean it when unMount 
    return () => context.revert()
  }, []);


  
  return (
    <div className={`animated-title ${containerClass}`} ref={containerRef}>
      {" "}
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex-center flex-wrap max-w-full gap-2 md:gap-3 px-10"
        >
          {line.split(" ").map((word, i) => (
            <span
              key={i}
              dangerouslySetInnerHTML={{ __html: word }}
              className="animated-word"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
