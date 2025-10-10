import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import { BiPauseCircle, BiPlayCircle } from "react-icons/bi";

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const navContainerRef = useRef<HTMLDivElement>(null);
  const audioElementRef = useRef<HTMLAudioElement>(null);

  function toggleIndicator() {
    setIsAudioPlaying((prev) => !prev);
  }

  useEffect(() => {
    if (isAudioPlaying) audioElementRef.current?.play();
    else audioElementRef.current?.pause();
  }, [isAudioPlaying]);

  const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0  z-50 h-16 border-none transition-all duration-700 sm:inset-x-6  "
    >
      <header className="absolute top-1/2 -translate-y-1/2 w-full">
        <nav className="flex items-center justify-between size-full p-4">
          <div className="flex items-center gap-7">
            <img src="/public/img/logo.png" alt="Logo" className="w-10" />
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              ContainerClass="bg-blue-50 items-center justify-center hidden md:flex gap-1"
            />
          </div>
          <div className="h-full flex items-center ">
            <div className="hidden md:block">
              {navItems.map((item) => (
                <a
                  href={`#${item.toLowerCase()}`}
                  key={item}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>
            {playAudio({
              isAudioPlaying,
              toggleIndicator,
              audioElementRef,
            })}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;

function playAudio({
  isAudioPlaying,
  toggleIndicator,
  audioElementRef,
}: {
  isAudioPlaying: boolean;
  toggleIndicator: () => void;
  audioElementRef: React.RefObject<HTMLAudioElement | null>;
}) {
  return (
    <div className="flex items-center justify-center  ml-3">
      <button
        onClick={toggleIndicator}
        className={`group relative flex items-center justify-center w-8 h-8 rounded-full overflow-hidden
bg-gradient-to-tr from-purple-500 to-indigo-500 shadow-[0_0_30px_rgba(139,92,246,0.7)]
transition-all duration-500 hover:scale-110 hover:shadow-[0_0_60px_rgba(99,102,241,0.9)]`}
      >
        {/* Glowing ring */}
        <div
          className={`absolute inset-0 rounded-full border-4 border-purple-400/50 animate-[spin_4s_linear_infinite]`}
        ></div>

        {/* Inner pulse */}
        <div
          className={`absolute w-16 h-16 rounded-full bg-purple-600 blur-md animate-pulse`}
        ></div>

        {/* Icon */}
        {isAudioPlaying ? (
          <BiPauseCircle
            size={44}
            className="text-white relative z-10 group-hover:scale-90 transition-transform duration-300"
          />
        ) : (
          <BiPlayCircle
            size={44}
            className="text-white relative z-10 group-hover:scale-90 transition-transform duration-300"
          />
        )}
      </button>

      <audio
        src="/audio/loop.mp3"
        loop
        className="hidden "
        ref={audioElementRef}
      />
    </div>
  );
}