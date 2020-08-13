import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerThreeQuarters, faTint } from '@fortawesome/free-solid-svg-icons';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import style from './dashboard.module.css';

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

function NavBar(props) {
  const [temp, setTemp] = useState({});
  let [delay, setDelay] = useState(5000);

  useInterval(async () => {
    const data = await fetchData();
    data.temp = Math.round(Number(data.temp));
    data.humidity = Math.round(Number(data.humidity));
    setTemp(data);
  }, delay);

  useEffect(() => {
    async function fetching() {
      const data = await fetchData();

      // If two decimals needed Math.round((Number(data.humidity) + Number.EPSILON) * 100) / 100;
      data.temp = Math.round(Number(data.temp));
      data.humidity = Math.round(Number(data.humidity));
      setTemp(data);
    }
    fetching();
  }, []);

  return (
    <div>
      <Navbar bg="dark" variant="dark" className={style.nav}>
        <Container>
          <Navbar.Brand>Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Link href="/tempprobe" passHref>
              <Nav.Link>Temp Probe</Nav.Link>
            </Link>
            <Link href="/dashboard" passHref>
              <Nav.Link>Dashboard</Nav.Link>
            </Link>
            <Link href="/controller" passHref>
              <Nav.Link>Controller</Nav.Link>
            </Link>
          </Nav>
          <div>
            <div>
              <FontAwesomeIcon icon={faThermometerThreeQuarters} size="1x" />
              {` ${temp.temp}°C`}
            </div>

            <div>
              <FontAwesomeIcon icon={faTint} size="1x" />
              {` ${temp.humidity}%`}
            </div>
          </div>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
