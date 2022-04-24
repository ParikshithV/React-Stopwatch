import { useState, useRef } from "react";

function Stopwatch() {
  const [status, setStatus] = useState(0);
  const [time, setTime] = useState(0);
  const timeRef = useRef(null);

  const [enableReset, setEnableReset] = useState(true);

  function toggle() {
    if (status === 0) {
      setStatus(1);
      if (localStorage.getItem("UserTime") != null) {
        setTime(parseInt(localStorage.getItem("UserTime")));
      }
      timeRef.current = setInterval(() => {
        setTime((sec) => sec + 1);
      }, 1000);
      setEnableReset(true);
    } else {
      pause();
    }
  }

  function pause() {
    if (status === 1) {
      setStatus(0);
      console.log("Store time in localStorage: ", time);
      localStorage.setItem("UserTime", time);
      clearInterval(timeRef.current);
      setEnableReset(false);
    }
  }

  function reset() {
    setStatus(0);
    setTime(0);
    localStorage.clear();
  }

  return (
    <div>
      <h1>{new Date(time * 1000).toISOString().substring(11, 19)}</h1>
      <button onClick={toggle}>Toggle Stopwatch</button>
      {/* <button onClick={pause} disabled={enablePause}>
        Pause Stopwatch
      </button> */}
      <button onClick={reset} disabled={enableReset}>
        Reset
      </button>
      <p>
        Time is saved only when stopwatch is paused
        <br />
        (by pressing the toggle button when the timer is running)
      </p>
    </div>
  );
}

export default Stopwatch;
