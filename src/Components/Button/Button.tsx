import type { ReactNode } from "react";

interface ButtonProps {
  title: string;
  id: string;
  ContainerClass?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button = ({
  title,
  id,
  ContainerClass = "",
  leftIcon,
  rightIcon,
}: ButtonProps) => {
  return (
    <button
      id={id}
      className={`group relative bg-violet-50 z-10 w-fit rounded-full overflow-hidden px-7 py-3 text-black cursor-pointer ${ContainerClass}`}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      <span className="inline-flex relative overflow-hidden font-general text-xs uppercase">
        {title}
      </span>
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
