"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { DateTime } from "luxon";
import { calculateTimeRemaining } from "@/utils";
import { TimeRange } from "@/utils/constants";

export const CountDownCard = ({
  startDate,
  onTimeUp,
  boxNumber,
  isBlocked,
}: {
  startDate: string | undefined;
  onTimeUp: () => void;
  boxNumber?: number | null;
  isBlocked?: boolean;
}) => {
  const { t } = useTranslation();

  const [timeRemaining, setTimeRemaining] = useState(
    calculateTimeRemaining(
      DateTime.now()
        .plus({ seconds: TimeRange })
        .toISO({ includeOffset: false }) as string,
    ),
  );

  const handleTimerComplete = () => {
    setTimeRemaining({
      timeRemaining: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    onTimeUp();
  };

  useEffect(() => {
    if (isBlocked) {
      setTimeRemaining({
        timeRemaining: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    } else if (boxNumber) {
      setTimeRemaining(
        calculateTimeRemaining(
          DateTime.now()
            .plus({ seconds: TimeRange })
            .toISO({ includeOffset: false }) as string,
        ),
      );
    }
  }, [boxNumber, isBlocked]);

  useEffect(() => {
    if (!startDate) {
      setTimeRemaining(
        calculateTimeRemaining(
          DateTime.now()
            .plus({ seconds: TimeRange })
            .toISO({ includeOffset: false }) as string,
        ),
      );
    } else {
      const lockedTime = calculateTimeRemaining(
        DateTime.fromMillis(Number(startDate))
          .plus({ seconds: TimeRange })
          .toISO({ includeOffset: false }) as string,
      );
      if (lockedTime.timeRemaining < 0) {
        handleTimerComplete();
      } else {
        const timer = setInterval(() => {
          const remaining = calculateTimeRemaining(
            DateTime.fromMillis(Number(startDate))
              .plus({ seconds: TimeRange })
              .toISO() as string,
          );

          if (remaining.timeRemaining < 0) {
            handleTimerComplete();
            return () => clearInterval(timer);
          }

          setTimeRemaining(remaining);
        }, 1000);

        return () => clearInterval(timer);
      }
    }
  }, [startDate]);

  return (
    <div className="flex h-full w-full flex-col rounded-lg bg-[#DCD3C9] p-4 dark:bg-primaryDark ">
      {/* <p className="mb-6 text-lg font-bold text-[#333] dark:text-[#FAFAFA] lg:text-base">
        {t("timeRemaining")}
      </p> */}
      <div className="relative flex flex-1 flex-col items-center gap-2 text-[#333] dark:text-[#FAFAFA]">
        <div className="grid w-full grid-cols-2 items-center justify-between ">
          <p
            className="text-center text-[40px] font-bold"
            suppressHydrationWarning
          >
            {timeRemaining.minutes}
          </p>
          <p className="flex-4 absolute left-1/2 flex h-8 items-center justify-center text-[40px] text-base">
            :
          </p>
          <p
            className="text-center text-[40px] font-bold"
            suppressHydrationWarning
          >
            {timeRemaining.seconds}
          </p>
        </div>
        <div className="flex w-full items-center justify-between">
          <p className="w-1/2 text-center lg:text-base">{t("minutes")}</p>
          <p className="w-1/2 text-center lg:text-base">{t("seconds")}</p>
        </div>
      </div>
    </div>
  );
};
