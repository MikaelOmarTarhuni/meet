import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    showSuggestions: undefined
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    this.setState({ 
      query: value,
      suggestions,
     });
  }

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: false
    });
    // pass the clicked suggestion to the passed updateEvents prop
    this.props.updateEvents(suggestion);
    // console.log('handleItemClicked', suggestion);
  }

  render() {
    return (
      <Form>
        <Form.Label>Type City Name or See All Cites:</Form.Label>
        <Form.Group className="search mb-3">
          <Form.Control 
            type="text"
            className="city"
            value={this.state.query}
            onChange={this.handleInputChanged}
            onFocus={() => {this.setState({ showSuggestions: true }) }}
          />
          {/* if showSuggestions is true the list will be visible, otherwise not */}
          <ul className="suggestions" style={this.state.showSuggestions ? {}: { display: 'none' }}>
            {this.state.suggestions.map((suggestion) => (
              <li 
              key={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}
              >{suggestion}</li>
            ))}
            <li onClick={() => this.handleItemClicked("all")}>
              <b>See all cities</b>
            </li>
          </ul>
        </Form.Group>
      </Form>
    );
  }
}

export default CitySearch;