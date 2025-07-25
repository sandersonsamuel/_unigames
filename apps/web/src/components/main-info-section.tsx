"use client";

import { redirectByRole } from "@/app/actions/user";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/constants/images";
import { motion } from "motion/react";
import Image from "next/image";

export const MainInfoSection = () => {
  const unigamesLogo = IMAGES.get("logo-unigames");
  const gradientLayout = IMAGES.get("layout-primary-gradient");
  const scorpion = IMAGES.get("scorpion");
  const marioKart = IMAGES.get("mario-kart");

  return (
    <section className="flex flex-col gap-10 items-center w-full relative h-[550px] md:h-full md:mb-20 px-3">
      {unigamesLogo && (
        <motion.span
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Image
            className="md:w-[600px] w-full"
            src={unigamesLogo?.src}
            alt={unigamesLogo.alt}
            width={600}
            height={70}
          />
        </motion.span>
      )}
      {gradientLayout && (
        <div className="md:relative mx-10">
          <Image
            priority
            className="w-[1200px] h-auto cursor-auto pointer-events-none hidden md:block"
            src={gradientLayout.src}
            alt={gradientLayout.alt}
            width={1200}
            height={385}
          />

          <div className="md:absolute flex flex-col items-center xl:gap-8 lg:gap-4 md:gap-3 gap-5 md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
            <h1 className="xl:text-5xl xl:w-[1000px] lg:text-4xl lg:w-[700px] md:text-3xl md:w-[500px] text-3xl text-center">
              Torneio de jogos eletrônicos Unifacema
            </h1>
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: [1, 1.05, 1] }}
            >
              <Button
                size={"lg"}
                variant={"secondary"}
                onClick={() => redirectByRole()}
                className="text-2xl md:hidden lg:block"
              >
                INSCREVA-SE
              </Button>
              <Button
                onClick={() => redirectByRole()}
                size={"default"}
                variant={"secondary"}
                className="lg:hidden md:block hidden text-xs"
              >
                INSCREVA-SE
              </Button>
            </motion.span>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex md:hidden"
          >
            {scorpion && marioKart && (
              <>
                <Image
                  priority
                  className="w-[200px] sm:w-[250px] h-auto absolute bottom-0 left-0 sm:left-14"
                  src={scorpion?.src}
                  alt={scorpion.alt}
                  width={200}
                  height={200}
                />
                <Image
                  priority
                  className="w-[200px] sm:w-[250px] h-auto absolute bottom-0 right-0 sm:right-14"
                  src={marioKart?.src}
                  alt={marioKart.alt}
                  width={200}
                  height={300}
                />
              </>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
};
