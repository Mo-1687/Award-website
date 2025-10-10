import React, { useRef, useState } from "react";
import Card from "../Card/Card";

const TiltCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {

  const [transFormStyle, setTransFormStyle] = useState("")

  const itemRef = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if(!itemRef.current) return
    const {left, height, top, width} = itemRef.current.getBoundingClientRect()
    
    // Get Relative X and Y
    const relativeX = (e.clientX - left) / width
    const relativeY = (e.clientY - top) / height

    // Get Tilt 
    const tiltX = (relativeX - 0.5) * -20
    const tiltY = (relativeY - 0.5) * 20

    setTransFormStyle(`perspective(700px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale3D(0.95, 0.95, 0.95)`)


  }

  function handleMouseLeave(){
   setTransFormStyle("") 
  }
  return <div className={` ${className}`} style={{transform: transFormStyle}} ref={itemRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>{children}</div>;
};
const Features = () => {
  return (
    <div id="vault" className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">
            Into the MetaGame layer
          </p>
          <p className="max-w-md opacity-50 font-circular-web text-blue-50">
            Immerse yourself in a rich and ever-expanding universe where a
            vibrant array of products Converge into an interconnected overlay
            experience in your world
          </p>
        </div>
        <TiltCard className="border-hsla relative mb-7 md:h-[75vh] h-96 rounded-md overflow-hidden w-full">
          <Card
            src="/videos/feature-1.mp4"
            title={
              <>
                radi<b>n</b>t
              </>
            }
            description="The game-of-games portal where every moment of play turns into rewards and high-value gaming data"
          />
        </TiltCard>
        <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
          <TiltCard className="bento-tilt_1 row-span-1 md:row-span-2 1">
            <Card
              src="/videos/feature-2.mp4"
              title={
                <>
                  Zig<b>m</b>a
                </>
              }
              description="The game-of-games portal where every moment of play turns into rewards and high-value gaming data"
            />
          </TiltCard>
          <TiltCard className="bento-tilt_1 row-span-1  ms-32 md:ms-0">
            <Card
              src="/videos/feature-3.mp4"
              title={
                <>
                  n<b>ex</b>us
                </>
              }
              description="The game-of-games portal where every moment of play turns into rewards and high-value gaming data"
            />
          </TiltCard>
          <TiltCard className="bento-tilt_1   me-14 md:me-0">
            <Card
              src="/videos/feature-4.mp4"
              title={
                <>
                  az<b>u</b>l
                </>
              }
              description="The game-of-games portal where every moment of play turns into rewards and high-value gaming data"
            />
          </TiltCard>

          <TiltCard className="bento-tilt_2">
            <div className="flex size-full flex-col bg-violet-300 justify-between p-5">
              <h1 className="bento-title special-font max-w-64">
                M<b>o</b>re C<b>o</b>ming So<b>o</b>n
              </h1>
            </div>
          </TiltCard>
          <TiltCard className="bento-tilt_2">
            <video
              src="/videos/feature-5.mp4"
              loop
              muted
              autoPlay
              className="size-full object-center object-cover"
            ></video>
          </TiltCard>
        </div>
      </div>
    </div>
  );
};

export default Features;
