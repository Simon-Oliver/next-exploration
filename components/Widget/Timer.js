import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography } from '@material-ui/core';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import style from './Timer.module.css';

export default function SimpleCard() {
  const [timer, setTimer] = useState('00:00');
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [name, setName] = useState('');
  const [dateTime, setDateTime] = useState(0);
  const [stateMilSeconds, setMilSeconds] = useState(1);
  const [isActive, setIsActive] = useState(false);

  function toggle(e) {
    setIsActive(!isActive);
    console.log(e.target);
    var countDownDate = new Date();
    countDownDate.setMinutes(countDownDate.getMinutes() + Number(time.minutes));
    countDownDate.setSeconds(countDownDate.getSeconds() + (Number(time.seconds) + 1));
    countDownDate.getTime();
    setDateTime(countDownDate);
  }

  function reset() {
    setMilSeconds(1);
    setIsActive(false);
  }

  function leadingZero(time) {
    return time < 10 ? `0${time}` : time;
  }

  function alarm() {
    setTimer('00:00');
    var audio = document.getElementById('a1');
    console.log(audio);
    audio.play();
    console.log('Alarm!!! ----- Beeep');
  }

  //   useEffect(() => {}, []);

  const countDown = () => {
    var now = new Date().getTime();
    const distance = dateTime - now;

    if (isActive && distance > 0) {
      if (time.minutes > 90) {
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimer(`${leadingZero(hours)}:${leadingZero(minutes)}:${leadingZero(seconds)}`);
      } else if (time.minutes <= 90) {
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimer(`${leadingZero(minutes)}:${leadingZero(seconds)}`);
      }
    } else if (isActive && distance <= 0) {
      alarm();
    }
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      countDown();
      interval = setInterval(countDown, 1000);
    } else if (!isActive && stateMilSeconds === 0) {
      console.log('TIMER DONE --------------');
      clearInterval(interval);
      reset();
    }
    return () => clearInterval(interval);
  }, [isActive, stateMilSeconds]);

  const changeHandler = (e) => {
    console.log(e.target.value);
    console.log(e.target.id);

    if (e.target.id === 'name') {
      setName(e.target.value);
    }

    setTime({ ...time, [e.target.id]: e.target.value });
  };

  return (
    <Card className={style.card}>
      <audio id="a1" src="/audio/beep.wav"></audio>
      <Card.Body>
        {isActive ? (
          <div className={style.timer}>
            <h3>{name}</h3>
            <h2>{timer}</h2>
          </div>
        ) : (
          <Form onChange={(e) => changeHandler(e)} noValidate autoComplete="off">
            <Form.Group controlId="name">
              <Form.Label>Timer Name</Form.Label>
              <Form.Control type="text" placeholder="Timer Name" autoFocus defaultValue={name} />
            </Form.Group>
            <div className={style.container}>
              <Form.Group controlId="minutes">
                <Form.Label>Minutes</Form.Label>
                <Form.Control type="number" defaultValue={time.minutes} min="0" />
              </Form.Group>
              <Form.Group controlId="seconds">
                <Form.Label>Seconds</Form.Label>
                <Form.Control type="number" defaultValue={time.seconds} min="0" max="59" />
              </Form.Group>
            </div>
          </Form>
        )}
      </Card.Body>
      <Button size="small" onClick={(e) => toggle(e)}>
        {isActive ? 'Stop' : 'Start'}
      </Button>
    </Card>
  );
}
