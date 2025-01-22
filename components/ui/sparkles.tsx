"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const Sparkles = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [sparkles, setSparkles] = useState<Array<{ id: string; color: string; size: number; style: any }>>([]);

  useEffect(() => {
    const generateSparkle = () => {
      return {
        id: Math.random().toString(36).slice(2),
        color: `hsl(${Math.random() * 360}deg, 100%, 75%)`,
        size: Math.random() * 10 + 10,
        style: {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          zIndex: 2,
        },
      };
    };

    const interval = setInterval(() => {
      const sparkle = generateSparkle();
      setSparkles((sparkles) => [...sparkles, sparkle]);
      setTimeout(() => {
        setSparkles((sparkles) => sparkles.filter((s) => s.id !== sparkle.id));
      }, 200);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={cn("relative inline-block", className)} {...props}>
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="pointer-events-none absolute inline-block animate-sparkle"
          style={{
            ...sparkle.style,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
          }}
        >
          <svg
            className="absolute inset-0"
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
              fill={sparkle.color}
            />
          </svg>
        </span>
      ))}
      <span className="relative z-10">{children}</span>
    </span>
  );
};