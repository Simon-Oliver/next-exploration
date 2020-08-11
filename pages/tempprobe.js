import React, { useState, useRef, useEffect } from 'react';
import Graph from '../components/Widget/Graph';
import { useStore } from '../components/store';

import moment from 'moment';
import style from './tempprobe.module.css';

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

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
  const res = await fetch('http://192.168.1.10:8000/temp');
  const data = await res.json();
  return data;
};

const TempProbe = () => {
  const { state, dispatch } = useStore();

  const [temp, setTemp] = useState([{ name: '', hum: '', temp: '', min: '', max: '' }]);
  let [delay, setDelay] = useState(1000);

  useInterval(async () => {
    const data = await fetchData();
    const arr = {
      temp: round(Number(data.temp.temp), 1).toFixed(1),
      name: moment().format('ss'),
      hum: ' ',
      max: 29,
      min: 23,
    };
    dispatch({ type: 'SetTempProbeData', data: arr });
  }, delay);

  //   useEffect(() => {
  //     async function fetching() {
  //       const data = await fetchData();

  //       // If two decimals needed Math.round((Number(data.humidity) + Number.EPSILON) * 100) / 100;
  //       data.temp = Math.round(Number(data.temp));
  //       data.humidity = Math.round(Number(data.humidity));
  //       data.name = moment().format('HH:mm');
  //       setTemp(data);
  //     }
  //     fetching();
  //   }, []);

  return (
    <>
      <div className={style.card}>
        <h2>{state.tempProbeData.slice(-1)[0].temp}°C</h2>
        <div className={style.box}>
          <h7>Min: {state.tempProbeData.slice(-1)[0].min}°C</h7>
          <h7>Max: {state.tempProbeData.slice(-1)[0].max}°C</h7>
        </div>
      </div>
    </>
  );
};

export default TempProbe;
