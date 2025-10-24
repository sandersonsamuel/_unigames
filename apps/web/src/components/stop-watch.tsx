"use client";

import { env } from "@/env";
import useCountDown from "@/hooks/use-count-down";
import dayjs from "dayjs";
import { HTMLAttributes, useEffect, useState } from "react";
import { motion } from "motion/react";

export const StopWatch = (rest: HTMLAttributes<HTMLDivElement>) => {
  const [isClient, setIsClient] = useState(false);
  const targetDate = env.NEXT_PUBLIC_EVENT_DATE;
  const targetTime = env.NEXT_PUBLIC_EVENT_TIME;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { days, hours, minutes, seconds } = useCountDown();

  if (!isClient) {
    return null;
  }

  return (
    <div {...rest} className="flex justify-center p-3 md:p-10  text-softBlue">
      <div className="flex items-center justify-between flex-col sm:p-0 p-3 md:text-left xl:w-3/5">
        <p className="xl:text-3xl md:text-xl text-lg font-semibold">
          O evento{" "}
          <b className="text-primary border-b-4 border-primary">UNIGAMES</b>{" "}
          ocorrerá em:
        </p>

        <div className="w-full flex justify-between xl:gap-5 md:gap-2 gap-1.5 my-5 text-primary">
          <div className="flex flex-col items-center xl:w-[150px]">
            <div className="flex items-center">
              <motion.p
                key={days}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="xl:text-7xl text-4xl md:text-8xl font-semibold"
              >
                {days < 0 ? 0 : days}
              </motion.p>
            </div>
            <p className="xl:text-2xl font-bold">
              {days === 1 ? "Dia" : "Dias"}
            </p>
          </div>

          <div className="flex flex-col items-center xl:w-[150px]">
            <div className="flex items-center">
              <motion.p
                key={hours}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="xl:text-7xl text-4xl md:text-8xl font-semibold"
              >
                {hours < 0 ? 0 : hours}
              </motion.p>
            </div>
            <p className="xl:text-2xl font-bold">
              {hours === 1 ? "Hora" : "Horas"}
            </p>
          </div>

          <div className="flex flex-col items-center xl:w-[150px]">
            <div className="flex items-center">
              <motion.p
                key={minutes}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="xl:text-7xl text-4xl md:text-8xl font-semibold"
              >
                {minutes < 0 ? 0 : minutes}
              </motion.p>
            </div>
            <p className="xl:text-2xl font-bold">
              {minutes === 1 ? "Minuto" : "Minutos"}
            </p>
          </div>

          <div className="hidden sm:flex flex-col items-center xl:w-[150px]">
            <div className="flex items-center">
              <motion.p
                key={seconds}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.1 }}
                className="xl:text-7xl text-4xl md:text-8xl font-semibold"
              >
                {seconds < 0 ? 0 : seconds}
              </motion.p>
            </div>
            <p className="xl:text-2xl font-bold">
              {seconds === 1 ? "Segundo" : "Segundos"}
            </p>
          </div>
        </div>

        <p className="xl:text-3xl md:text-xl text-lg font-semibold">
          No dia {dayjs(targetDate).format("DD/MM/YYYY")} ás {targetTime}h
        </p>

        <p className="xl:text-3xl md:text-xl text-lg font-semibold mt-5 text-justify text-primary">
          R. Aarão Réis, 1000, Centro, Caxias - MA, 65606-020
        </p>
      </div>
    </div>
  );
};

export default StopWatch;
