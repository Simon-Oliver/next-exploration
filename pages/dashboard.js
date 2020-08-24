import React, { useState, useEffect, useRef } from 'react';
import Temp from '../components/temp';
import Graph from '../components/Widget/Graph';
import Timer from '../components/Widget/Timer';

import style from '../components/dashboard.module.css';

const data = [
  { name: '00:00', temp: 42, hum: 55 },
  { name: '01:00', temp: 12, hum: 20 },
  { name: '02:00', temp: 14, hum: 19 },
  { name: '03:00', temp: 16, hum: 34 },
  { name: '04:00', temp: 18, hum: 26 },
  { name: '05:00', temp: 27, hum: 37 },
  { name: '06:00', temp: 34, hum: 19 },
  { name: '07:00', temp: 25, hum: 43 },
  { name: '08:00', temp: 29, hum: 63 },
  { name: '09:00', temp: 25, hum: 75 },
  { name: '10:00', temp: 29, hum: 84 },
  { name: '11:00', temp: 25, hum: 43 },
  { name: '12:00', temp: 19, hum: 32 },
  { name: '13:00', temp: 21, hum: 37 },
  { name: '14:00', temp: 22, hum: 40 },
  { name: '15:00', temp: 25, hum: 55 },
  { name: '16:00', temp: 27, hum: 60 },
  { name: '17:00', temp: 26, hum: 58 },
  { name: '18:00', temp: 28, hum: 70 },
  { name: '19:00', temp: 30, hum: 78 },
  { name: '20:00', temp: 22, hum: 48 },
  { name: '21:00', temp: 25, hum: 50 },
  { name: '22:00', temp: 30, hum: 66 },
  { name: '23:00', temp: 46, hum: 70 },
  { name: '24:00', temp: 70, hum: 70 },
];

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

const fetchData = async () => {
  const res = await fetch('http://192.168.1.10:8000');
  const data = await res.json();
  return data;
};

export default function dashboard() {
  let [delay, setDelay] = useState(5000);

  useInterval(async () => {
    const data = await fetchData();
    const arr = JSON.parse(data.data);
    console.log(arr.slice(Math.max(arr.length - 5, 0)));
  }, delay);

  return (
    <>
      <Temp></Temp>
      <Temp></Temp>
      <Temp></Temp>
      <Timer></Timer>
      <Temp></Temp>
      <Temp></Temp>
      <Temp></Temp>
      <Temp></Temp>
      <Temp></Temp>
      <Graph data={data}></Graph>
    </>
  );
}
