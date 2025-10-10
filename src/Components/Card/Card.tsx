import type React from "react";

const Card = ({
  src,
  title,
  description,
}: {
  src: string;
  title: React.ReactNode;
  description: string;
}) => {
  return(
    <div className="relative size-full">
         <video src={src} loop muted autoPlay className="absolute left-0 top-0 size-full object-center object-cover"/>
         <div className="relative size-full flex flex-col text-blue-50 z-10 p-5 justify-between">
            <div>
                <h1 className="special-font bento-title">{title}</h1>
                {description && <p className="mt-3 text-xs md:text-base max-w-64">{description}</p>}
            </div>
         </div>
    </div>
  )
};

export default Card;
