/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { PiTimerFill } from "react-icons/pi";

const TimerChat = ({ maxMinutes, maxSeconds }) => {
  const [minutes, setMinutes] = useState(maxMinutes);
  const [seconds, setSeconds] = useState(maxSeconds);

  useEffect(() => {
    let interval = setInterval(() => {
      if (minutes !== 0 || seconds !== 0) {
        if (seconds === 0) {
          if (minutes !== 0) {
            setMinutes(minutes - 1);
            setSeconds(maxSeconds);
          }
        } else {
          setSeconds(seconds - 1);
        }
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutes, seconds]);

  return (
    <p className="text-danger d-flex justify-content-center align-items-center">
      <PiTimerFill className="fs-4 " />
      {minutes}:{seconds}
    </p>
  );
};

export default TimerChat;
