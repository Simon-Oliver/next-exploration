import React, { useState, useRef, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Link from 'next/link';

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
  const res = await fetch('http://192.168.1.10:8000/temp/si7021');
  const data = await res.json();
  return data;
};

function ResponsiveDrawer(props) {
  const [temp, setTemp] = useState({});
  let [delay, setDelay] = useState(5000);

  useInterval(async () => {
    // Your custom logic here
    const data = await fetchData();
    data.temp = Math.round((Number(data.temp) + Number.EPSILON) * 100) / 100;
    data.humidity = Math.round((Number(data.humidity) + Number.EPSILON) * 100) / 100;
    setTemp(data);
  }, delay);

  useEffect(() => {
    async function fetching() {
      const data = await fetchData();
      data.temp = Math.round((Number(data.temp) + Number.EPSILON) * 100) / 100;
      data.humidity = Math.round((Number(data.humidity) + Number.EPSILON) * 100) / 100;
      setTemp(data);
    }
    fetching();
  }, []);

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Link href="/index" passHref>
            <Nav.Link>Bootstrap</Nav.Link>
          </Link>
          <Link href="/temp" passHref>
            <Nav.Link>Temp</Nav.Link>
          </Link>
          <Link href="/index" passHref>
            <Nav.Link>Bootstrap</Nav.Link>
          </Link>
        </Nav>
      </Navbar>

      <div>{`Temp. Kitchen: ${temp.temp}°C`}</div>
      <div>{`Humidity Kitchen: ${temp.humidity}%`}</div>
    </div>
  );
}

export default ResponsiveDrawer;
