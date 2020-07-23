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
  { name: 'Page A', uv: 4000, pv: 9000 },
  { name: 'Page B', uv: 3000, pv: 7222 },
  { name: 'Page C', uv: 2000, pv: 6222 },
  { name: 'Page D', uv: 1223, pv: 5400 },
  { name: 'Page E', uv: 1890, pv: 3200 },
  { name: 'Page F', uv: 2390, pv: 2500 },
  { name: 'Page G', uv: 3490, pv: 1209 },
];
const SimpleAreaChart = () => {
  return (
    <div style={{ height: '60vh', width: '80vw' }}>
      <ResponsiveContainer width={700} height="80%">
        <LineChart
          width={800}
          height={400}
          data={data}
          syncId="anyId"
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" style={{ fill: 'white' }} dy={10} />
          <YAxis style={{ fill: 'white' }} dx={0} />
          <Tooltip />
          <Line type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
          <Brush margin={{ top: 10, right: 30, left: 0, bottom: 0 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleAreaChart;
