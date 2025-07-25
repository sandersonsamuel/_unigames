"use client";

import { GameCard } from "@/components/games/game-card";
import { Skeleton } from "@/components/ui/skeleton";
import { GameType } from "@/types/games";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { use } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {
  gamesPromise: Promise<GameType[]>;
};

export const SwiperGamesList = ({ gamesPromise }: Props) => {
  const games = use(gamesPromise);

  return (
    <>
      {games && (
        <div className="min-h-[300px] relative">
          <Swiper
            loop
            autoplay={{ delay: 1300 }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            modules={[Navigation, Pagination, Autoplay]}
            pagination={{ clickable: true }}
            breakpoints={{
              1360: { slidesPerView: 5 },
              1100: { slidesPerView: 4 },
              850: { slidesPerView: 3 },
              650: { slidesPerView: 2 },
            }}
            className="flex items-center h-full"
          >
            {games.map((game) => (
              <SwiperSlide key={game.id} className="h-full !flex !items-center !justify-center">
                <GameCard game={game} />
              </SwiperSlide>
            ))}
          </Swiper>
          <button className="swiper-button-prev-custom absolute left-[0rem] sm:left-[-1rem] top-1/2 -translate-y-1/2 z-10 text-primary p-2 bg-secondary/50">
            <ChevronLeft size={24} />
          </button>
          <button className="swiper-button-next-custom absolute right-[0rem] sm:right-[-1rem] top-1/2 -translate-y-1/2 z-10 text-primary p-2 bg-secondary/50">
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </>
  );
};

export const SwiperGamesListSkeleton = () => {
  return (
    <div className="h-[300px] relative">
      <Swiper
        loop
        autoplay={{ delay: 1300 }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        modules={[Autoplay, Navigation, Pagination]}
        pagination={{ clickable: true }}
        breakpoints={{
          1360: { slidesPerView: 5 },
          1100: { slidesPerView: 4 },
          850: { slidesPerView: 3 },
          650: { slidesPerView: 2 },
        }}
        className="flex items-center h-full"
      >
        {[...Array(10)].map((_, index) => (
          <SwiperSlide
            key={index}
            className="h-full !flex !items-center !justify-center"
          >
            <motion.div
              className="w-[250px] h-[300px] max-h-[350px] cursor-pointer bg-card border-4 flex flex-col items-center justify-center gap-2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Skeleton className="size-[194px]"/>
              <div className="px-6 w-full flex flex-col gap-1">
                <Skeleton className="w-full h-[20px]"/>
                <Skeleton className="w-full h-[20px]"/>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="swiper-button-prev-custom absolute left-[0rem] sm:left-[-1rem] top-1/2 -translate-y-1/2 z-10 text-primary p-2 bg-secondary/50">
        <ChevronLeft size={24} />
      </button>
      <button className="swiper-button-next-custom absolute right-[0rem] sm:right-[-1rem] top-1/2 -translate-y-1/2 z-10 text-primary p-2 bg-secondary/50">
        <ChevronRight size={24} />
      </button>
    </div>
  );
};
