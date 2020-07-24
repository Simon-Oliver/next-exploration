import Head from 'next/head';
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

const data = [
  { name: '15:00', temp: 25, hum: 55 },
  { name: '16:00', temp: 27, hum: 60 },
  { name: '17:00', temp: 26, hum: 58 },
  { name: '18:00', temp: 28, hum: 70 },
  { name: '19:00', temp: 30, hum: 78 },
  { name: '20:00', temp: 22, hum: 48 },
  { name: '21:00', temp: 25, hum: 50 },
];
const SimpleAreaChart = () => {
  return (
    <div style={{ height: '60vh', width: '80vw', background: 'red' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={800} height={400} data={data} syncId="anyId" margin={{ top: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            tick={{ fill: '#000000' }}
            stroke="#efefef"
            dataKey="name"
            style={{ fill: 'white' }}
            dy={10}
            height={40}
          />
          <YAxis
            tick={{ fill: '#000000' }}
            stroke="#efefef"
            style={{ fill: 'white' }}
            dx={0}
            domain={[0, 100]}
          />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#8884d8" fill="#8884d8" />
          <Line type="monotone" dataKey="hum" stroke="#82ca9d" />
          <Brush dataKey="name" margin={{ top: 10 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleAreaChart;
