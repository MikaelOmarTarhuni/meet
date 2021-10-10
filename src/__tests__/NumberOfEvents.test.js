import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32
  }

  handleChange = (event) => {
    // console.log('handleChange event', event)
    const value = event.target.value;
    this.setState({ 
      numberOfEvents: value,
     });
     this.props.updateEvents(null, value);
     console.log('handleChange numberOfEvents', value)
  }


  render() {
    const { numberOfEvents } = this.state
    return (
      <Form.Group className='numberOfEvents mb-3'>
          <Form.Label size="sm">Number of Events:</Form.Label>
        <Form.Control size="sm"
          type="number"
          className='event-number'
          value={numberOfEvents}
          max={32}
          min={1}
          onChange={this.handleChange}
        />
      </Form.Group>

    );
  }
}

export default NumberOfEvents;