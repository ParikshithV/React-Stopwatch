import { useState, useRef } from "react";

function Stopwatch() {
  const [status, setStatus] = useState(0);
  const [time, setTime] = useState(0);
  const timeRef = useRef(null);

  function toggle() {
    // console.log("Status: ", status);
    // console.log("Time: ", time);
    if (status === 0) {
      setStatus(1);
      if (localStorage.getItem("UserTime") != null) {
        setTime(parseInt(localStorage.getItem("UserTime")));
      }
      timeRef.current = setInterval(() => {
        setTime((sec) => sec + 1);
        // localStorage.setItem("UserTime", time);
        console.log("UserTime", time);
      }, 1000);
    }
  }

  function pause() {
    if (status === 1) {
      setStatus(0);
      console.log("Store time in localStorage: ", time);
      localStorage.setItem("UserTime", time);
      clearInterval(timeRef.current);
    }
  }

  function reset() {
    setStatus(0);
    setTime(0);
    localStorage.clear();
  }

  return (
    <div>
      <p>{new Date(time * 1000).toISOString().substring(11, 19)}</p>
      <button onClick={toggle}>Toggle Stopwatch</button>
      <button onClick={pause}>Pause Stopwatch</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Stopwatch;
