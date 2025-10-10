import AnimatedTitle from "../AnimatedTitle/AnimatedTitle";
import Button from "../Button/Button";

const imgClipBox = ({ src, clipClass }: { src: string; clipClass: string }) => {
  return (
    <div className={clipClass}>
      <img src={src} alt="Contact image" />
    </div>
  );
};

const Contact = () => {
  return (
    <div id="contact" className="min-h-96 w-screen my-20 px10">
      <div className="relative rounded-lg py-24 bg-black sm:overflow-hidden text-blue-50">
        <div className="absolute -left-20 lg:left-20 top-0 w-72 lg:w-96 hidden sm:block h-full overflow-hidden">
          {imgClipBox({
            src: "/img/contact-1.webp",
            clipClass: "contact-clip-path-1 ",
          })}
          {imgClipBox({
            src: "/img/contact-2.webp",
            clipClass: "contact-clip-path-2 lg:translate-y-0 translate-y-60",
          })}
        </div>
        <div className="absolute -top-40 left-20 lg:top-20 w-60 lg:w-80 sm:top-1/2 md:left-auto md:right-10">
          {imgClipBox({
            src: "/img/swordman-partial.webp",
            clipClass: "absolute md:scale-125",
          })}
          {imgClipBox({
            src: "/img/swordman.webp",
            clipClass: "sword-man-clip-path md:scale-125",
          })}
        </div>
        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">
            Join Zentry
          </p>

          <AnimatedTitle
            title="let&#39;s b<b>u</b>ild the <br /> new era of <br /> g<b>a</b>ming t<b>o</b>gether."
            containerClass="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          <Button
            id="contact-btn"
            title="contact us"
            ContainerClass="mt-10 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
