import React, { useState } from 'react';
import { useStore } from '../store';

import { Card, Dropdown, FormControl, Form, Row, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import style from './ChartDropDown.module.css';
import moment from 'moment';
// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const { state, dispatch } = useStore();

    const timeItem = () => {
      const arr = [];
      for (let index = 0; index < 25; index++) {
        if (index === 0) {
          arr.push(<option key={index}>00:00</option>);
        } else if (index < 10) {
          arr.push(<option key={index}>{`0${index}:00`}</option>);
        } else {
          arr.push(<option key={index}>{`${index}:00`}</option>);
        }
      }
      return arr;
    };

    const handleChange = (evt) => {
      dispatch({ type: evt.target.id, data: evt.target.value });
    };

    return (
      <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
        <Form onChange={(e) => handleChange(e)}>
          <Form.Row>
            <Form.Group as={Col} controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <FormControl autoFocus type="date" defaultValue={state.startDate} />
            </Form.Group>
            <Form.Group as={Col} controlId="startTime">
              <Form.Label>Time</Form.Label>
              <Form.Control as="select" defaultValue={state.startTime}>
                {timeItem()}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <FormControl autoFocus type="date" defaultValue={state.endDate} />
            </Form.Group>
            <Form.Group as={Col} controlId="endTime">
              <Form.Label>Time</Form.Label>
              <Form.Control as="select" defaultValue={state.endTime}>
                {timeItem()}
              </Form.Control>
            </Form.Group>
          </Form.Row>
        </Form>
      </div>
    );
  }
);

const Bootstrap = () => {
  return (
    <Dropdown drop="left">
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        <FontAwesomeIcon icon={faChevronDown} size="1x" />
      </Dropdown.Toggle>

      <Dropdown.Menu className={style.dropdown} as={CustomMenu}></Dropdown.Menu>
    </Dropdown>
  );
};

export default Bootstrap;
