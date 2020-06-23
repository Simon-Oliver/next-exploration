import React, { useState, useEffect, useRef } from 'react';
import { Button, Box, Container, Card, CardActionArea, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    height: '15vw',
    width: '15vw',
  },
});

const Dashboard = () => {
  const classes = useStyles();
  return (
    <Container>
      <Card className={classes.card}>
        <CardActionArea className={classes.card}>
          <Button variant="contained" color="primary" href="#contained-buttons">
            Link
          </Button>
        </CardActionArea>
      </Card>
    </Container>
  );
};

export default Dashboard;
