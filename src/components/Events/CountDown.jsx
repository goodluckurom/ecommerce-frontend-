/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { server } from "../../server";

const CountDown = ({ data }) => {
  const calculateTimeLeft = useCallback(() => {
    if (!data || !data.finish_Date) return {};

    const difference = +new Date(data.finish_Date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }, [data]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    if (
      data &&
      data._id &&
      !timeLeft.days &&
      !timeLeft.hours &&
      !timeLeft.minutes &&
      !timeLeft.seconds
    ) {
      axios.delete(`${server}/event/delete-shop-event/${data._id}`);
    }

    return () => clearTimeout(timer);
  }, [calculateTimeLeft, timeLeft, data]);

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }

    return (
      <span className="text-[25px] text-[#475ad2]" key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-red-500 text-[25px]">Time's Up</span>
      )}
    </div>
  );
};

export default CountDown;
