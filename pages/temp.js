import fetch from "node-fetch";
import React, { useState, useEffect, useRef } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";

import style from "./temp.module.css";

const fetchData = async () => {
  // const res = await fetch('http://192.168.1.10:8000/temp');
  const res = await fetch("/api/user");
  const data = await res.json();
  return data.temp;
};

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

const Temp = () => {
  const { cardIsOn, cardIsOff } = style;
  const [temp, setTemp] = useState(0);
  const [isOn, setOn] = useState(false);
  let [delay, setDelay] = useState(9000);

  useInterval(async () => {
    // Your custom logic here
    const data = await fetchData();
    console.log("temp component", data);
    setTemp(data);
  }, delay);

  const toggle = () => {
    setOn(!isOn);
    console.log("Toggle Fired");
    console.log(isOn);
  };

  return (
    <Card
      as="a"
      className={`${style.card} ${isOn ? cardIsOn : cardIsOff}`}
      onClick={toggle}
    >
      <Card.Body>
        <Card.Text align="center">Kitchen</Card.Text>
        <EmojiObjectsOutlinedIcon></EmojiObjectsOutlinedIcon>
      </Card.Body>
    </Card>
  );
};

export default Temp;
