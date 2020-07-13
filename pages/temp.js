import fetch from 'node-fetch';
import React, { useState, useEffect, useRef } from 'react';

const fetchData = async () => {
  const res = await fetch('http://192.168.1.10:8000/temp');
  const data = await res.json();
  return data.temp;
};

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Temp = () => {
  const [temp, setTemp] = useState(0);
  let [delay, setDelay] = useState(1000);

  useInterval(async () => {
    // Your custom logic here
    const data = await fetchData();
    console.log('temp component', data);
    setTemp(data);
  }, delay);

  return <p className="description">{temp.temp}</p>;
};

export default Temp;
