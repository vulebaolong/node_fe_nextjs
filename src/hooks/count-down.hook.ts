import { useEffect, useState, useRef } from "react";

export const useCountdown = (start: number, end: number, key: string) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCountdown = () => {
    const storedEndTime = localStorage.getItem(key);

    if (!storedEndTime) {
      const endTime = Date.now() + start * 1000;
      localStorage.setItem(key, `${endTime}`);
    }

    const endTime = localStorage.getItem(key);
    const initialTimeLeft = Math.max(0, Math.floor((Number(endTime) - Date.now()) / 1000));
    setTimeLeft(initialTimeLeft);

    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        const endTime = localStorage.getItem(key);
        const timeLeft = Math.max(0, Math.floor((Number(endTime) - Date.now()) / 1000));

        setTimeLeft(timeLeft);

        if (timeLeft <= end) {
          clearInterval(intervalRef.current || 0);
          intervalRef.current = null;
          localStorage.removeItem(key);
        }
      }, 1000);
    }
  };

  useEffect(() => {
    const storedEndTime = localStorage.getItem(key);
    if (storedEndTime) {
      const timeLeft = Math.max(0, Math.floor((Number(storedEndTime) - Date.now()) / 1000));
      setTimeLeft(timeLeft);

      if (timeLeft > end) {
        startCountdown();
      } else {
        localStorage.removeItem(key);
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { timeLeft, startCountdown };
};
