import { useRef } from "react";
import AnimatedTitle from "../AnimatedTitle/AnimatedTitle";
import gsap from "gsap";
import Button from "../Button/Button";

const Story = () => {
  const entranceRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e) => {
    if (!entranceRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      entranceRef.current.getBoundingClientRect();

    const x = clientX - left;
    const y = clientY - top;

    const centerX = width / 2;
    const centerY = height / 2;

    const rotateX = ((x - centerX) / centerX) * 40;
    const rotateY = ((y - centerY) / centerY) * -40;

    gsap.to(entranceRef.current, {
      rotateX,
      rotateY,
      duration: 0.3,
      perspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    if (!entranceRef.current) return;
    gsap.to(entranceRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.3,
      ease: "power1.inOut",
    });
  };
  return (
    <section className="min-h-dvh w-screen bg-black text-blue-50" id="story">
      <div
        id="prologue"
        className="flex flex-col items-center py-10 pb-24 size-full"
      >
        <p className="font-general text-sm uppercase md:text-[10px]">
          The multiverse ip world
        </p>

        <div className="relative size-full">
          <AnimatedTitle
            title="the st<b>o</b>ry of <br /> a hidden real<b>m</b>"
            containerClass="mt-5 pointer-event-none mix-blend-difference relative z-10"
          />
          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseEnter={handleMouseMove}
                  onMouseUp={handleMouseMove}
                  src="/img/entrance.webp"
                  alt="entrance"
                  ref={entranceRef}
                  className="object-contain"
                />
              </div>
            </div>
            {/* for the rounded corner */}
            <svg
              className="invisible absolute size-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="flt_tag"
                    operator="atop"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
        <div className="-mt-80 flex justify-center md:justify-end w-full md:-mt-64 md:me-44 ">
          <div className="flex flex-col items-center md:items-start h-full w-fit">
            <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start">
              Where realms converge, lies Zentry and the boundless pillar.
              Discover its secrets and shape your fate amidst infinite
              opportunities.
            </p>
            <Button
              id="realm-btn"
              title="discover prologue"
              ContainerClass="mt-5"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Story;
