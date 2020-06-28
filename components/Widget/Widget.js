import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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
});

export default function SimpleCard() {
  const classes = useStyles();
  const [timer, setTimer] = useState('');
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [dateTime, setDateTime] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function toggle(e) {
    console.log(e.target);
    var countDownDate = new Date();
    countDownDate.setMinutes(countDownDate.getMinutes() + Number(time.minutes));
    countDownDate.setSeconds(countDownDate.getSeconds() + (Number(time.seconds) + 2));
    countDownDate.getTime();
    setDateTime(countDownDate);
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  //   useEffect(() => {}, []);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        var now = new Date().getTime();
        const distance = dateTime - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        console.log(distance, minutes, seconds);

        setTimer(`${minutes}:${seconds}`);
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const changeHandler = (e) => {
    console.log(e.target.value);
    console.log(e.target.id);

    setTime({ ...time, [e.target.id]: e.target.value });
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <form
          onChange={(e) => changeHandler(e)}
          className={classes.root}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="minutes"
            label="Minutes"
            type="minutes"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="seconds"
            label="Seconds"
            type="seconds"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
        <Typography variant="h5" component="h2">
          TIME: {seconds}
          Timer: {timer}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={(e) => toggle(e)}>
          Start
        </Button>
      </CardActions>
    </Card>
  );
}
