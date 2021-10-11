import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    showSuggestions: undefined
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({showSuggestions:true});
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    if (suggestions.length === 0) {
      this.setState({
        query: value,
        infoText: 'We can not find the city you are looking for. Please try another city',
      });
    } else {
      return this.setState({
        query: value,
        suggestions,
        infoText:''
      });
    }
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: false,
      infoText:''
    });
    this.props.updateEvents(suggestion);
  }

  render() {
    return (
      <Form className="CitySearch">
        <Form.Label className="mb-0">Type City Name or See All Cites:</Form.Label>
        <Form.Text>
            <InfoAlert text={this.state.infoText} />
        </Form.Text>
        <Form.Group className="search mt-2">
          <Form.Control 
            type="text"
            className="city"
            placeholder="Search for city"
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