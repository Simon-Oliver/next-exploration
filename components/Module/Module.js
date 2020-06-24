import React, { useState, useEffect, useRef } from 'react';
import { Button, Box, Container, Card, CardActionArea, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    height: '150px',
    width: '150px',
  },
});

const Module = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.card}>
        <Button variant="contained" color="primary" href="#contained-buttons">
          Link
        </Button>
      </CardActionArea>
    </Card>
  );
};

export default Module;
