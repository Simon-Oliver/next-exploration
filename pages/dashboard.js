import React, { useState, useEffect, useRef } from 'react';
import { Button, Box, Container, makeStyles } from '@material-ui/core';
import { Navbar, Module } from '../components';

const useStyles = makeStyles({
  card: {
    height: '150px',
    width: '150px',
  },
  container: {
    marginTop: '20px',
  },
});

const Dashboard = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <Container className={classes.container}>
        <Module></Module>
      </Container>
    </React.Fragment>
  );
};

export default Dashboard;
