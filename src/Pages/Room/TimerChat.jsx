/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { PiTimerFill } from "react-icons/pi";

const TimerChat = ({ maxMinutes, maxSeconds }) => {
  /* const maxMinutes = 15;
    const maxSeconds = 59; */
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
        clearInterval(interval); // Detener el intervalo cuando ambos minutos y segundos llegan a cero
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [minutes, seconds]); // Agregar 'minutes' y 'seconds' como dependencias para evitar bucles infinitos

  return (
    <p className="text-danger d-flex justify-content-center align-items-center">
      <PiTimerFill className="fs-4 " />
      {minutes}:{seconds}
    </p>
  );
};

export default TimerChat;
