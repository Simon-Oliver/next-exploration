import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
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
import ChartDropDown from './ChartDropDown';

import style from './Graph.module.css';

const filterData = (startTime, endTime, data) => {
  const format = 'hh:mm';
  startTime = moment(startTime, format).subtract(1, 'hours');
  endTime = moment(endTime, format).add(1, 'hours');
  const newData = data.filter((e) => {
    const time = moment(e.name, format);
    return time.isBetween(startTime, endTime, 'hours');
  });
  return newData;
};

// const minMax = (data) => {
//   const min = 0;
//   const max = 85;
//   for (const e in data) {
//     if (e.temp < min) min = e.temp;
//     if (e.temp > max) max = e.temp;
//   }
//   return [min, max];
// };

const Graph = (props) => {
  const { state, dispatch } = useStore();

  const { data, title } = props;

  useEffect(() => {
    console.log('Props ----->', props);
    console.log(state);
  }, [state]);

  return (
    <div className={style.lineChartContainer}>
      <div className={style.heading}>
        <h5>{title ? title : 'Temperature & Humidity'}</h5>
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
          {data[0].hum ? <Line type="monotone" dataKey="hum" stroke="#82ca9d" /> : ''}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
