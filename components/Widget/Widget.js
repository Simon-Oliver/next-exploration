import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '220px',
    marginRight: theme.spacing(2),
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  label: {
    margin: theme.spacing(1),
    width: '9ch',
  },
}));

export default function SimpleCard() {
  const classes = useStyles();
  const [timer, setTimer] = useState('00:00');
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [name, setName] = useState('');
  const [dateTime, setDateTime] = useState(0);
  const [stateMilSeconds, setMilSeconds] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [isActiveAlarm, setIsActiveAlarm] = useState(false);

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
    setSeconds(1);
    setIsActive(false);
  }

  function leadingZero(time) {
    return time < 10 ? `0${time}` : time;
  }

  function alarm() {}

  //   useEffect(() => {}, []);

  const countDown = () => {
    var now = new Date().getTime();
    const distance = dateTime - now;

    setMilSeconds(distance);

    if (isActive && stateMilSeconds > 0) {
      console.log(distance);

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
    } else if (isActive && stateMilSeconds <= 0) {
      setTimer('00:00');
      console.log('Alarm!!! ----- Beeep');
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
    <Card className={classes.card}>
      <CardContent>
        {isActive ? (
          <div>
            <Typography variant="h5" component="h5">
              {name}
            </Typography>
            <Typography variant="h3" component="h3">
              {timer}
            </Typography>
          </div>
        ) : (
          <form onChange={(e) => changeHandler(e)} noValidate autoComplete="off">
            <TextField value={name} id="name" label="Standard" />
            <TextField
              className={classes.label}
              value={time.minutes}
              id="minutes"
              label="Minutes"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              className={classes.label}
              value={time.seconds}
              id="seconds"
              label="Seconds"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={(e) => toggle(e)}>
          {isActive ? 'Stop' : 'Start'}
        </Button>
      </CardActions>
    </Card>
  );
}
