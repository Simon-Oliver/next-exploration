import fetch from 'node-fetch';
import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';

const fetchData = async () => {
  // const res = await fetch('http://192.168.1.10:8000/temp');
  const res = await fetch('/api/user');
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

const useStyles = makeStyles({
  root: {
    width: '8rem',
    height: '8rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  align: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  icon: {
    fontSize: 60,
  },

  green: {
    fontSize: 60,
    color: 'green',
  },
});

const Temp = () => {
  const classes = useStyles();
  const [temp, setTemp] = useState(0);
  const [isOn, setOn] = useState(false);
  let [delay, setDelay] = useState(1000);

  useInterval(async () => {
    // Your custom logic here
    const data = await fetchData();
    console.log('temp component', data);
    setTemp(data);
  }, delay);

  const toggle = () => {
    setOn(!isOn);
    console.log('Toggle Fired');
  };

  return (
    <CardActionArea className={classes.root} onClick={toggle}>
      <Card className={classes.root}>
        <CardContent className={classes.align}>
          <Typography align="center">Kitchen</Typography>
          <EmojiObjectsOutlinedIcon
            className={isOn ? classes.icon : classes.green}
          ></EmojiObjectsOutlinedIcon>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

export default Temp;
