import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
  const [dateTime, setDateTime] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function toggle(e) {
    console.log(e.target);
    var countDownDate = new Date();
    countDownDate.setMinutes(countDownDate.getMinutes() + 30);
    countDownDate.setSeconds(countDownDate.getSeconds() + 2);
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

  return (
    <Card className={classes.root}>
      <CardContent>
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
