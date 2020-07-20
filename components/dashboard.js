import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThermometerThreeQuarters,
  faTint,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import Link from "next/link";

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
  const res = await fetch("http://192.168.1.10:8000/temp/si7021");
  const data = await res.json();
  return data;
};

function ResponsiveDrawer(props) {
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
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Link href="/" passHref>
            <Nav.Link>Bootstrap</Nav.Link>
          </Link>
          <Link href="/temp" passHref>
            <Nav.Link>Temperature</Nav.Link>
          </Link>
          <Link href="/index" passHref>
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
      </Navbar>
    </div>
  );
}

export default ResponsiveDrawer;
