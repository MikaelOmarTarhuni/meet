import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import Container from 'react-bootstrap/Container';


class App extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      locations: [],
      numberOfEvents: 32,
      currentLocation: 'all'
    }
    
    // this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events: events.slice(0, this.state.numberOfEvents), 
          locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    const { currentLocation, numberOfEvents } = this.state;
    if (location) {
      getEvents().then((events) => {
        const locationEvents = (location === 'all') 
        ? events 
        : events.filter((event) => event.location === location);
        const filteredEvents = locationEvents.slice(0, numberOfEvents);
        this.setState({
          events: filteredEvents,
          currentLocation: location
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents = (currentLocation === 'all') 
        ? events 
        : events.filter((event) => event.location === currentLocation);
        const filteredEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: filteredEvents,
          numberOfEvents: eventCount
        });
      });
    }
  }

  render() {
    const { numberOfEvents } = this.state
    return (
      <Container className="App" bg="dark">
        <h1 className="mb-2">Meet App</h1>
        <CitySearch 
        locations={this.state.locations} 
        updateEvents={this.updateEvents} />
        <NumberOfEvents 
        // input={this.state.numberOfEvents} 
        // handleChange={this.handleChange} 
        numberOfEvents={numberOfEvents}
        updateEvents={this.updateEvents} />
        <EventList 
        events={this.state.events} />
      </Container>
    );
  }
}

export default App;