import React, { useState, useRef, useEffect } from 'react';
import Graph from '../components/Widget/Graph';
import { useStore } from '../components/store';

import moment from 'moment';

const data = [];

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

  const [temp, setTemp] = useState([{ name: '', hum: '', temp: '' }]);
  let [delay, setDelay] = useState(1000);

  useInterval(async () => {
    const data = await fetchData();
    const arr = {
      temp: Math.round(Number(data.temp.temp)),
      name: moment().format('ss'),
      hum: ' ',
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
      <Graph data={state.tempProbeData} title={'Probe Temperature'}></Graph>
    </>
  );
};

export default TempProbe;
