import React, { Component } from 'react';

class NumberOfEvents extends Component {

  state = {
    eventNumber: 32,
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ 
      query: value,
    });
  };

  render() { 
    return (
      <div className="NumberOfEvents">
        <input 
        type="text" 
        className="numberOfEventsInput" 
        value={this.state.query} 
        onChange={this.handleInputChanged} />
      </div>
    );
  }
}

export default NumberOfEvents;