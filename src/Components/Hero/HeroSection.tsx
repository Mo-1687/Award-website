import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "../Button/Button";
import { FaLocationArrow } from "react-icons/fa";
import { ScrollTrigger } from "gsap/all";

const HeroSection = ({
  setIsLoading,
  isLoading,
}: {
  setIsLoading: (loading: boolean) => void;
  isLoading: boolean;
}) => {
  gsap.registerPlugin(ScrollTrigger);

  const [videoState, setVideoState] = useState({
    currentIndex: 1,
    backgroundIndex: 1,
    isClicked: false,
  });
  const [loadedVideo, setLoadedVideo] = useState(0);

  const totalVideo = 4;
  const nextVideoRef = useRef<HTMLVideoElement | null>(null);
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const loadedVideosRef = useRef(new Set<number>());
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const upComingVideo: number = (videoState.currentIndex % totalVideo) + 1;

  // Update isLoading based on loadedVideo
  useEffect(() => {
    if (loadedVideo >= 2) {
      // Only need initial and upcoming videos
      setIsLoading(false);
    }
  }, [loadedVideo, setIsLoading]);

  // Lazy load initial and upcoming videos
  useEffect(() => {
    const preloadVideo = async (index: number) => {
      if (loadedVideosRef.current.has(index)) return;
      const video = document.createElement("video");
      video.src = getVideoSrc(index);
      video.preload = "auto";
      await new Promise((resolve) => {
        video.onloadeddata = () => {
          loadedVideosRef.current.add(index);
          setLoadedVideo(loadedVideosRef.current.size);
          resolve(null);
        };
        video.onerror = () => {
          console.error(`Failed to load video ${index}`);
          resolve(null);
        };
      });
    };

    preloadVideo(videoState.backgroundIndex);
    preloadVideo(upComingVideo);
  }, [videoState.backgroundIndex, upComingVideo]);

  function handleVDClick() {
    if (debounceRef.current) return;
    setVideoState((prev) => ({
      ...prev,
      isClicked: true,
      currentIndex: upComingVideo,
    }));
    debounceRef.current = setTimeout(() => {
      setVideoState((prev) => ({ ...prev, isClicked: false }));
      debounceRef.current = null;
    }, 500); // Reduced duration for snappier feel
  }

  function getVideoSrc(index: number) {
    return `videos/hero-${index}.mp4`;
  }

  // Combined GSAP animations
  useGSAP(() => {
    if (isLoading) return;

    // Set initial styles for video-frame
    gsap.set("#video-frame", {
      clipPath: "inset(10% 10% 20% 10%)", // Simplified clipPath
      borderRadius: "0 0 20% 10%",
    });

    // ScrollTrigger animation
    const scrollAnimation = gsap.from("#video-frame", {
      clipPath: "inset(0% 0% 0% 0%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });

    // Click animation
    if (videoState.isClicked) {
      const tl = gsap.timeline();
      tl.set("#next-video", { visibility: "visible", width: 64, height: 64 })
        .to(
          "#next-video",
          {
            transformOrigin: "center center",
            scale: 1,
            width: "100%",
            height: "100%",
            duration: 1,
            ease: "power1.inOut",
            onStart: () => nextVideoRef.current?.play(),
            onComplete: () => {
              setVideoState((prev) => ({
                ...prev,
                backgroundIndex: prev.currentIndex,
              }));
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

    return () => {
      scrollAnimation.scrollTrigger?.kill();
      scrollAnimation.kill();
    };
  }, [isLoading, videoState.isClicked, videoState.currentIndex]);

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
          <div
            onClick={handleVDClick}
            onKeyDown={(e) => e.key === "Enter" && handleVDClick()}
            role="button"
            tabIndex={0}
            aria-label="Switch to next video"
            className={`z-50 mask-clip-path absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-64 overflow-hidden rounded-lg group 
            `}
          >
            <div className="origin-center cursor-pointer scale-50 opacity-0 transition-all duration-500 ease-in-out group-hover:scale-100 group-hover:opacity-100">
              <video
                src={getVideoSrc(upComingVideo)}
                loop
                muted
                playsInline
                ref={previewVideoRef}
                id="preview-video"
                className="size-64 origin-center object-cover object-center"
              />
            </div>
          </div>

          {/* Invisible upcoming video */}
          <video
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-64 invisible object-center object-cover z-20"
            loop
            muted
            playsInline
            id="next-video"
            src={getVideoSrc(videoState.currentIndex)}
            ref={nextVideoRef}
          />

          {/* Background video */}
          <video
            src={getVideoSrc(videoState.backgroundIndex)}
            loop
            autoPlay
            muted
            playsInline
            id="background-video"
            className="absolute left-0 top-0 size-full object-center object-cover"
          />
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
              Unleash the play Economy
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              ContainerClass="bg-yellow-300 flex-center gap-1 animate-pulse"
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
