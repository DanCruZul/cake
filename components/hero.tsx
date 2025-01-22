"use client";

import { CustomButton } from "@/components/ui/custom-button";
import { Sparkles } from "@/components/ui/sparkles";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, memo } from "react";
import { cn } from "@/lib/utils";
import { Cake, Cookie, Croissant, IceCream } from "lucide-react";
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
  }) => {
    const basePath = src;
    const imageWidth = index <= 1 ? 600 : 400;

    return (
      <picture>
        <source
          type="image/avif"
          srcSet={`${basePath}-300.avif 300w, ${basePath}-400.avif 400w, ${basePath}-600.avif 600w, ${basePath}-750.avif 750w`}
          sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 600px"
        />
        <source
          type="image/webp"
          srcSet={`${basePath}-300.webp 300w, ${basePath}-400.webp 400w, ${basePath}-600.webp 600w, ${basePath}-750.webp 750w`}
          sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 600px"
        />
        <Image
          src={`${basePath}-${imageWidth}.webp`}
          fill
          className={cn("object-cover", className)}
          alt={alt || ""}
          sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 600px"
          priority={index <= 1}
          quality={80}
          loading={index <= 1 ? "eager" : "lazy"}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVigAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyUC8zLy4vMzA2PEA4Njs/NzpAQD9KSUA9Q0RBQUFBQUFBQUFBQUH/2wBDAR"
        />
      </picture>
    );
  }
);

ImageComponent.displayName = "ImageComponent";

const DecorativeIcon = ({
  Icon,
  className,
  rotate = 0,
}: {
  Icon: typeof Cake;
  className?: string;
  rotate?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className={cn(
      "absolute w-10 h-10 md:w-14 md:h-14 bg-[#FFE4B5] rounded-xl p-2 md:p-2.5 shadow-lg z-10",
      className
    )}
  >
    <Icon
      className="w-full h-full text-[#4a1e1b]"
      style={{ transform: `rotate(${rotate}deg)` }}
    />
  </motion.div>
);

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
        <div className="relative flex h-full items-center justify-center pb-24 pt-16 md:pt-0 lg:pb-0 z-20 px-[5%] md:-mt-20">
          <div className="mx-auto max-w-lg text-center">
            <div className="relative mb-4 md:mb-6 inline-block">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="relative h-40 w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 rounded-full overflow-hidden border-3 border-[#4a1e1b] bg-white shadow-2xl transition-transform duration-300 hover:scale-105">
                  <ImageComponent
                    src="/images/chef.webp"
                    alt="Nuestra chef pastelera"
                    index={0}
                    className="!object-cover"
                  />
                </div>

                <DecorativeIcon
                  Icon={Cake}
                  className="-top-2 md:-top-3 right-4 md:right-6 transform rotate-12"
                  rotate={15}
                />
                <DecorativeIcon
                  Icon={Cookie}
                  className="top-1/3 -left-2 md:-left-3 transform -rotate-12"
                  rotate={-20}
                />
                <DecorativeIcon
                  Icon={Croissant}
                  className="bottom-1/3 -right-2 md:-right-3 transform rotate-45"
                  rotate={45}
                />
                <DecorativeIcon
                  Icon={IceCream}
                  className="-bottom-2 md:-bottom-3 left-4 md:left-6 transform -rotate-12"
                  rotate={-12}
                />
              </motion.div>
            </div>
            <Sparkles>
              <h1
                className={`mb-5 text-7xl font-bold text-white md:mb-6 md:text-9xl lg:text-[16rem] xl:text-[18rem] drop-shadow-[0_4px_4px_rgba(74,30,27,0.3)] text-shadow-lg [text-shadow:_4px_4px_15px_rgb(74_30_27_/_40%)] ${dancingScript.className}`}
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
      src: "/images/pastel-frutos-rojos",
      alt: "Pastel con frutos rojos",
    },
    {
      src: "/images/macarons",
      alt: "Macarons coloridos",
    },
    {
      src: "/images/croissants",
      alt: "Croissants recién horneados",
    },
    {
      src: "/images/pastel-cumpleanos",
      alt: "Pastel de cumpleaños con flores",
    },
    {
      src: "/images/cupcakes",
      alt: "Exhibición de cupcakes",
    },
    {
      src: "/images/pasteles",
      alt: "Selección de pasteles",
    },
  ],
};
