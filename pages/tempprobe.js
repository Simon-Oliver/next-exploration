import React from 'react';
import Graph from '../components/Widget/Graph';

const data = [
  { name: '00:00', temp: 42 },
  { name: '01:00', temp: 12 },
  { name: '02:00', temp: 14 },
  { name: '03:00', temp: 16 },
  { name: '04:00', temp: 18 },
  { name: '05:00', temp: 27 },
  { name: '06:00', temp: 34 },
  { name: '07:00', temp: 25 },
  { name: '08:00', temp: 29 },
  { name: '09:00', temp: 25 },
  { name: '10:00', temp: 29 },
  { name: '11:00', temp: 25 },
  { name: '12:00', temp: 19 },
  { name: '13:00', temp: 21 },
  { name: '14:00', temp: 22 },
  { name: '15:00', temp: 25 },
  { name: '16:00', temp: 27 },
  { name: '17:00', temp: 26 },
  { name: '18:00', temp: 28 },
  { name: '19:00', temp: 30 },
  { name: '20:00', temp: 22 },
  { name: '21:00', temp: 25 },
  { name: '22:00', temp: 30 },
  { name: '23:00', temp: 46 },
  { name: '24:00', temp: 70 },
];

const TempProbe = () => {
  return (
    <>
      <Graph data={data} title={'Probe Temperature'}></Graph>
    </>
  );
};

export default TempProbe;
