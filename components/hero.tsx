"use client";

import { CustomButton } from "@/components/ui/custom-button";
import { Sparkles } from "@/components/ui/sparkles";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, memo } from "react";
import { cn } from "@/lib/utils";
import { Flower2 } from "lucide-react";
import { Dancing_Script } from "next/font/google";
import Image from "next/image";

const dancingScript = Dancing_Script({ subsets: ["latin"] });

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

const ImageComponent = memo(
  ({
    src,
    alt,
    index,
    className,
  }: {
    src: string;
    alt?: string;
    index: number;
    className?: string;
  }) => (
    <Image
      src={src}
      fill
      className={cn("object-cover", className)}
      alt={alt || ""}
      sizes="(max-width: 768px) 30vw, 22vw"
      priority={index <= 1}
      quality={65}
      loading={index <= 1 ? "eager" : "lazy"}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVigAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyUC8zLy4vMzA2PEA4Njs/NzpAQD9KSUA9Q0RBQUFBQUFBQUFBQUH/2wBDAR"
    />
  )
);

ImageComponent.displayName = "ImageComponent";

export const Hero = memo((props: HeroProps) => {
  const { heading, description, buttons, images, className, ...rest } = {
    ...heroDefaults,
    ...props,
  };

  const transformRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: transformRef,
    offset: ["start start", "end end"],
  });
  const animatedScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
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
        {/* Dark overlay for better text contrast */}
        <div className="fixed inset-0 bg-black/20 z-10 pointer-events-none" />

        <div className="absolute bottom-0 left-0 right-auto top-0 z-[5] px-[5%]">
          <motion.div
            className="flex flex-col gap-[26vw] pt-[70vh]"
            style={{ y: yFirst }}
            initial={{ y: 0 }}
          >
            {images.slice(0, 4).map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                <ImageComponent src={image.src} alt={image.alt} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-0 left-auto right-0 top-0 z-0 px-[5%]"
          style={{ y: ySecond }}
          initial={{ y: 0 }}
        >
          <div className="flex flex-col gap-[26vw] pt-[70vh]">
            {images.slice(4, 6).map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.75, scale: 1 }}
                transition={{ duration: 0.5, delay: (index + 4) * 0.1 }}
                className={cn(
                  "relative h-[35vw] pt-[120%] sm:h-auto rounded-2xl overflow-hidden shadow-xl",
                  {
                    "w-[28vw] md:w-[26vw] lg:w-[20vw]": index === 0,
                    "right-[50vw] mt-[-44vw] w-[26vw] md:w-[24vw] lg:right-[54vw] lg:w-[18vw]":
                      index === 1,
                  }
                )}
              >
                <ImageComponent
                  src={image.src}
                  alt={image.alt}
                  index={index + 4}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
        <div className="relative flex h-full items-center justify-center pb-24 pt-16 md:pt-0 lg:pb-0 z-20 px-[5%]">
          <div className="mx-auto max-w-lg text-center">
            <div className="relative mb-12 inline-block">
              <div className="absolute -left-8 -top-8">
                <Flower2 className="h-14 w-14 rotate-45 text-white/80 drop-shadow-lg transition-transform hover:scale-110" />
              </div>
              <div className="absolute -right-8 -top-8">
                <Flower2 className="h-14 w-14 -rotate-45 text-white/80 drop-shadow-lg transition-transform hover:scale-110" />
              </div>

              <div className="relative h-40 w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 rounded-full overflow-hidden border-4 border-white/90 shadow-2xl transition-transform hover:scale-105 duration-300">
                <ImageComponent
                  src="/images/chef.webp"
                  alt="Nuestra chef pastelera"
                  index={0}
                  className="!object-cover"
                />
              </div>

              <div className="absolute -bottom-8 -left-8">
                <Flower2 className="h-14 w-14 -rotate-[135deg] text-white/80 drop-shadow-lg transition-transform hover:scale-110" />
              </div>
              <div className="absolute -bottom-8 -right-8">
                <Flower2 className="h-14 w-14 rotate-[135deg] text-white/80 drop-shadow-lg transition-transform hover:scale-110" />
              </div>
            </div>
            <Sparkles>
              <h1
                className={`mb-5 text-6xl font-bold text-white md:mb-6 md:text-9xl lg:text-10xl drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)] ${dancingScript.className}`}
              >
                {heading}
              </h1>
            </Sparkles>
            <p className="relative z-20 text-white text-lg md:text-xl mb-8 font-sans drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] max-w-[90%] mx-auto">
              {description}
            </p>
            <div className="relative z-20 flex items-center justify-center">
              <CustomButton>Ver Productos</CustomButton>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 mt-[35rem] md:mt-[100vh]" />
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

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
      src: "/images/pastel-frutos-rojos.webp",
      alt: "Pastel con frutos rojos",
    },
    {
      src: "/images/macarons.webp",
      alt: "Macarons coloridos",
    },
    {
      src: "/images/croissants.webp",
      alt: "Croissants recién horneados",
    },
    {
      src: "/images/pastel-cumpleanos.webp",
      alt: "Pastel de cumpleaños con flores",
    },
    {
      src: "/images/cupcakes.webp",
      alt: "Exhibición de cupcakes",
    },
    {
      src: "/images/pasteles.webp",
      alt: "Selección de pasteles",
    },
  ],
};
