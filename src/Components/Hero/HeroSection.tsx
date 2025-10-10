import {  useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "../Button/Button";
import { FaLocationArrow } from "react-icons/fa";
import { ScrollTrigger } from "gsap/all";

const HeroSection = ({setIsLoading, isLoading}: {setIsLoading: (loading: boolean) => void, isLoading: boolean}) => {
  gsap.registerPlugin(ScrollTrigger);

  const [currentIndex, setCurrentIndex] = useState(1);
  const [backgroundIndex, setBackgroundIndex] = useState(1);
  const [isClicked, setIsClicked] = useState(false);
  const [loadedVideo, setLoadedVideo] = useState(0);

  const totalVideo = 4;
  const nextVideoRef = useRef<HTMLVideoElement | null>(null);
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const loadedVideosRef = useRef(new Set<number>());

  const upComingVideo: number = (currentIndex % totalVideo) + 1;

  //  Properly watch loadedVideo changes
  useEffect(() => {
    setIsLoading(true);
    if (loadedVideo >= totalVideo) {
      setIsLoading(false);
    }
  }, [loadedVideo]);

  //  Preload all videos on mount
  useEffect(() => {
    const preloadVideos = async () => {
      const promises = [];
      for (let i = 1; i <= totalVideo; i++) {
        const video = document.createElement("video");
        video.src = getVideoSrc(i);
        video.preload = "auto";
        promises.push(
          new Promise((resolve) => {
            video.onloadeddata = () => {
              loadedVideosRef.current.add(i);
              setLoadedVideo(loadedVideosRef.current.size);
              resolve(null);
            };
            video.onerror = () => {
              console.error(`Failed to load video ${i}`);
              resolve(null);
            };
          })
        );
      }
      await Promise.all(promises);
    };

    preloadVideos();
  }, []);

  function handleVDClick() {
    setIsClicked(true);
    setCurrentIndex(upComingVideo);

    // Reset click state after animation
    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  }

  function getVideoSrc(index: number) {
    return `videos/hero-${index}.mp4`;
  }

  // cleanup for GSAP animations
  useGSAP(
    () => {
      if (isClicked) {
        const tl = gsap.timeline();

        tl.set("#next-video", {
          visibility: "visible",
          scale: 0,
        })
          .to(
            "#next-video",
            {
              transformOrigin: "center center",
              scale: 1,
              width: "100%",
              height: "100%",
              duration: 1,
              ease: "power1.inOut",
              onStart: () => {
                nextVideoRef.current?.play();
              },
              onComplete: () => {
                setBackgroundIndex(currentIndex);
              },
            },
            0
          )
          .from(
            "#preview-video",
            {
              transformOrigin: "center center",
              scale: 0,
              duration: 1,
              ease: "power1.inOut",
            },
            0
          );

        return () => {
          tl.kill();
        };
      }
    },
    { dependencies: [isClicked, currentIndex] }
  );

  //   cleanup ScrollTrigger
  useGSAP(
    () => {
      if (!isLoading) {
        gsap.set("#video-frame", {
          clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
          borderRadius: "0 0 40% 10%",
        });

        const animation = gsap.from("#video-frame", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          borderRadius: "0 0 0 0",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: "#video-frame",
            start: "center center",
            end: "bottom center",
            scrub: true,
          },
        });

        return () => {
          animation.scrollTrigger?.kill();
          animation.kill();
        };
      }
    },
    { dependencies: [isLoading] }
  );

  return (
    <div id="nexus" className="relative h-dvh w-screen overflow-x-hidden">
      
      <div
        id="video-frame"
        className="relative h-dvh w-screen overflow-hidden rounded-lg bg-blue-50 z-10"
      >
        <div>
          <div className="z-50 mask-clip-path absolute-center absolute size-64 overflow-hidden rounded-lg group">
            <div
              onClick={handleVDClick}
              className="origin-center cursor-pointer scale-50 opacity-0 transition-all duration-500 ease-in group-hover:scale-100 group-hover:opacity-100"
            >
              <video
                src={getVideoSrc(upComingVideo)}
                loop
                muted
                playsInline
                ref={previewVideoRef}
                id="preview-video"
                className="size-64 origin-center scale-150 object-cover object-center"
              ></video>
            </div>
          </div>

          {/* Invisible upcoming video */}
          <video
            className="absolute-center size-64 invisible object-center object-cover z-20 absolute"
            loop
            muted
            playsInline
            id="next-video"
            src={getVideoSrc(currentIndex)}
            ref={nextVideoRef}
          ></video>

          {/* Background video */}
          <video
            src={getVideoSrc(backgroundIndex)}
            loop
            autoPlay
            muted
            playsInline
            id="background-video"
            className="absolute left-0 top-0 size-full object-center object-cover"
          ></video>
        </div>
        <h1 className="special-font hero-heading absolute bottom-0 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>
        <div className="absolute left-0 top-0 size-full z-40">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi <b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the MetaGame layer <br />
              Unleash the play Economy{" "}
            </p>

            <Button
              id="watch-trailer"
              title="Watch Trailer"
              ContainerClass="bg-yellow-300 flex-center gap-1"
              leftIcon={<FaLocationArrow />}
            />
          </div>
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-0 right-5  text-black">
        G<b>a</b>ming
      </h1>
    </div>
  );
};

export default HeroSection;
