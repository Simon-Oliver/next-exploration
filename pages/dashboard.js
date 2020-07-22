import React from 'react';
import Temp from '../components/temp';

import style from './dashboard.module.css';

export default function dashboard() {
  return (
    <div className={style.container}>
      <Temp></Temp>
      <Temp></Temp>
    </div>
  );
}
