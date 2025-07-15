import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useEffect, useState } from "react";
import { env } from "@/env";

dayjs.extend(duration);

const useCountDown = () => {
  const targetDate = env.NEXT_PUBLIC_EVENT_DATE;
  const targetTime = env.NEXT_PUBLIC_EVENT_TIME;

  const getDiff = () => {
    const now = dayjs();
    const target = dayjs(targetDate).add(targetTime, "hour");

    const months = target.diff(now, "month");
    const days = target.diff(now, "day") % 30;
    const hours = target.diff(now, "hour") % 24;
    const minutes = target.diff(now, "minute") % 60;
    const seconds = target.diff(now, "second") % 60;

    return {
      months,
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [timeDiff, setTimeDiff] = useState(getDiff());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDiff(getDiff());
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeDiff;
};

export default useCountDown;
