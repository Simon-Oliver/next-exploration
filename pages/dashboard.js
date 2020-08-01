import React from 'react';
import Temp from '../components/temp';
import Graph from '../components/Widget/Graph';

import style from '../components/dashboard.module.css';

export default function dashboard() {
  return (
    <>
      <Temp></Temp>
      <Temp></Temp>
      <Graph></Graph>
      <Temp></Temp>
      <Temp></Temp>
    </>
  );
}
