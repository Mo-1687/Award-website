import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "../AnimatedTitle/AnimatedTitle";

const About = () => {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center ",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    })
    .to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
});

  return (
    <section id="about" className=" min-h-screen w-screen ">
      <div className="relative mb-8 mt-36 flex flex-col items-center">
        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> l<b>a</b>rgest shared adventure"
          containerClass="text-center uppercase text-4xl leading-[0.8] mt-5 md:text-[6rem]"
        />
        <div className="about-subtext">
          <p>The Game of Games begins your life, now is an epic MMORPG </p>
          <p>Zentry unites every player from countless games and platforms </p>
        </div>
      </div>
      <div className="h-dvh w-screen " id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="../../../public/img/about.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
