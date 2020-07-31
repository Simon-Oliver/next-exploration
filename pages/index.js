import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { useStore } from '../components/store';
import moment from 'moment';

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import ChartDropDown from '../components/ChartDropDown';

import style from './lineChart.module.css';

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

const filterData = (startTime, endTime, data) => {
  console.log(startTime, endTime);
  const format = 'hh:mm';
  startTime = moment(startTime, format).subtract(1, 'hours');
  endTime = moment(endTime, format).add(1, 'hours');
  const newData = data.filter((e) => {
    const time = moment(e.name, format);
    return time.isBetween(startTime, endTime, 'hours');
  });
  return newData;
};

const Graph = () => {
  const { state, dispatch } = useStore();

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className={style.lineChartContainer}>
      <div className={style.heading}>
        <h5>Temperatur & Humidity</h5>
        <ChartDropDown></ChartDropDown>
      </div>
      <ResponsiveContainer className={style.line} width="90%" height="90%">
        <LineChart
          data={filterData(state.chartDateTime.startTime, state.chartDateTime.endTime, data)}
          syncId="anyId"
          margin={{
            top: 5,
            right: 20,
            left: -20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            tick={{ fill: '#000000', fontSize: '0.5rem' }}
            stroke="#efefef"
            dataKey="name"
            style={{ fill: 'white' }}
            dy={10}
            height={40}
          />
          <YAxis
            tick={{ fill: '#000000', fontSize: '0.7rem' }}
            stroke="#efefef"
            style={{ fill: 'white' }}
            dx={0}
            domain={[0, 100]}
          />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#8884d8" fill="#8884d8" />
          <Line type="monotone" dataKey="hum" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
