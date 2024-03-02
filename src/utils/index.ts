import { DateTime } from "luxon";

export const debounce = (fn: Function, delay: number) => {
  let timer: any;
  return function (...args: any) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export const generateBuyGiftMsg = (address: string): string => {
  return `I want to buy a gift. My address is ${address}, on chain bnb.`;
};

export const checkWidthMobile = (
  mobile: number,
  tablet: number,
  desktop: number,
) => {
  const width = window.innerWidth;
  if (width < 768) {
    return mobile;
  } else if (width >= 768 && width < 992) {
    return tablet;
  } else {
    return desktop;
  }
};

export const calculateTimeRemaining = (endsInTimer: string) => {
  const endTime = DateTime.fromISO(endsInTimer);

  const now = DateTime.local();

  const diff = endTime.diff(now, ["days", "hours", "minutes", "seconds"]);

  const timeRemaining = Math.round(diff.as("seconds"));

  const days = diff.toObject().days;
  const hours = diff.toObject().hours;
  let minutes = Number(diff.toObject().minutes);
  let seconds = 0;
  if (Math.round(Number(diff.toObject().seconds)) === 60) {
    minutes += 1;
  } else {
    seconds = Math.round(Number(diff.toObject().seconds));
  }

  return { timeRemaining, days, hours, minutes, seconds };
};
