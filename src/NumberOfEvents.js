import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

class NumberOfEvents extends Component {

  state = {
    eventNumber: 32,
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ 
      eventCount: value,
    });
    this.props.updateEvents(value);
  };

  render() { 
    return (
      <Form.Group className='numberOfEvents mb-3'>
          <Form.Label size="sm">Number of Events:</Form.Label>
        <Form.Control size="sm"
          type="number"
          className='event-number'
          value={this.props.input}
          onChange={this.props.handleChange}
        />
      </Form.Group>
    );
  }
}

export default NumberOfEvents;