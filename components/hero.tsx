"use client";

import { CustomButton } from "@/components/ui/custom-button";
import { Sparkles } from "@/components/ui/sparkles";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Flower2 } from "lucide-react";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  description: string;
  buttons: Array<{
    title: string;
    variant?: "default" | "secondary" | "outline";
  }>;
  images: ImageProps[];
};

export type HeroProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Hero = (props: HeroProps) => {
  const { heading, description, buttons, images, className, ...rest } = {
    ...heroDefaults,
    ...props,
  };

  const transformRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: transformRef });
  const animatedScrollYProgress = useSpring(scrollYProgress, {
    bounce: 0,
  });
  const yFirst = useTransform(
    animatedScrollYProgress,
    [0, 1],
    ["0vh", "-87.5vh"]
  );
  const ySecond = useTransform(
    animatedScrollYProgress,
    [0, 1],
    ["0vh", "-39.6vh"]
  );

  return (
    <section
      ref={transformRef}
      className={cn(
        "relative h-[150vh] bg-gradient-to-b from-pastel-cream to-pastel-pink md:h-[300vh]",
        className
      )}
      {...rest}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Dark overlay for better text contrast - ahora cubre todo el ancho */}
        <div className="fixed inset-0 bg-black/20 z-10 pointer-events-none" />

        <div className="absolute bottom-0 left-0 right-auto top-0 z-[5] px-[5%]">
          <motion.div
            className="flex flex-col gap-[26vw] pt-[70vh]"
            style={{ y: yFirst }}
          >
            {images.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className={cn(
                  "relative h-[35vw] pt-[120%] sm:h-auto rounded-2xl overflow-hidden shadow-xl",
                  {
                    "w-[30vw] md:w-[28vw] lg:w-[22vw]": index === 0,
                    "left-[52vw] mt-[-46vw] w-[30vw] md:w-[28vw] lg:left-[58vw] lg:w-[22vw]":
                      index === 1,
                    "left-[4vw] mt-[-5vw] w-[28vw] md:w-[26vw] lg:w-[20vw]":
                      index === 2,
                    "left-[64vw] mt-[-45vw] w-[26vw] md:w-[24vw] lg:w-[18vw]":
                      index === 3,
                  }
                )}
              >
                <img
                  src={image.src}
                  className="absolute inset-0 size-full object-cover"
                  alt={image.alt}
                />
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-0 left-auto right-0 top-0 z-0 px-[5%]"
          style={{ y: ySecond }}
        >
          <div className="flex flex-col gap-[26vw] pt-[70vh]">
            {images.slice(4).map((image, index) => (
              <div
                key={index}
                className={cn(
                  "relative h-[35vw] pt-[120%] opacity-75 sm:h-auto rounded-2xl overflow-hidden shadow-xl",
                  {
                    "w-[28vw] md:w-[26vw] lg:w-[20vw]": index === 0,
                    "right-[50vw] mt-[-44vw] w-[26vw] md:w-[24vw] lg:right-[54vw] lg:w-[18vw]":
                      index === 1,
                  }
                )}
              >
                <img
                  src={image.src}
                  className="absolute inset-0 size-full object-cover"
                  alt={image.alt}
                />
              </div>
            ))}
          </div>
        </motion.div>
        <div className="relative flex h-full items-center justify-center pb-24 pt-16 md:pt-24 lg:py-28 z-20 px-[5%]">
          <div className="mx-auto max-w-lg text-center">
            <div className="relative mb-16 md:mb-20 inline-block">
              <div className="relative h-40 w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 rounded-full overflow-hidden border-[6px] border-white/90 shadow-2xl transition-transform hover:scale-105 duration-300">
                <img
                  src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f"
                  alt="Nuestra chef pastelera"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <Sparkles>
              <h1 className="font-display mb-8 md:mb-10 text-6xl md:text-8xl lg:text-9xl font-bold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)]">
                {heading}
              </h1>
            </Sparkles>
            <p className="font-sans text-lg md:text-xl mb-10 md:mb-12 text-white/90 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] max-w-[85%] mx-auto leading-relaxed">
              {description}
            </p>
            <div className="relative z-20 flex items-center justify-center">
              <CustomButton className="font-sans text-base md:text-lg px-8 py-3 md:px-10 md:py-4 shadow-xl hover:shadow-2xl transition-all">
                Ver Productos
              </CustomButton>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 mt-[35rem] md:mt-[100vh]" />
      </div>
    </section>
  );
};

export const heroDefaults: Props = {
  heading: "Camelia",
  description:
    "Descubre nuestros pasteles y postres artesanales, elaborados con amor y los mejores ingredientes. Perfectos para cualquier ocasión especial.",
  buttons: [
    {
      title: "Ver Productos",
      variant: "default",
    },
  ],
  images: [
    {
      src: "https://images.unsplash.com/photo-1488477181946-6428a0291777",
      alt: "Pastel con frutos rojos",
    },
    {
      src: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e",
      alt: "Macarons coloridos",
    },
    {
      src: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d",
      alt: "Croissants recién horneados",
    },
    {
      src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
      alt: "Pastel de cumpleaños con flores",
    },
    {
      src: "https://images.unsplash.com/photo-1616690710400-a16d146927c5",
      alt: "Exhibición de cupcakes",
    },
    {
      src: "https://images.unsplash.com/photo-1557308536-ee471ef2c390",
      alt: "Selección de pasteles",
    },
  ],
};
