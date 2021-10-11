import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import './nprogress.css';
import Container from 'react-bootstrap/Container';
import { WarningAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      locations: [],
      numberOfEvents: 32,
      currentLocation: 'all',
      showWelcomeScreen: undefined
    }
  }

  async componentDidMount() {
    this.mounted = true;
    if (!navigator.onLine) {
      this.setState({
        warningText: 'Currently not online. List may not be up to date.',
      });
    } else {
      this.setState({
        warningText: ''
      });
    }

    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search)
    const code = searchParams.get("code");

    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
        this.setState({ 
          events: events.slice(0, this.state.numberOfEvents), 
          locations: extractLocations(events) });
        }
      });
    }
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
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    const { numberOfEvents } = this.state
    return (
      <div>
        <Container className="App" bg="dark">
          <WarningAlert text={this.state.warningText} />
          <h1>Meet App</h1>
          <CitySearch 
          locations={this.state.locations} 
          updateEvents={this.updateEvents} />
          <NumberOfEvents 
          numberOfEvents={numberOfEvents}
          updateEvents={this.updateEvents} />
          <EventList 
          events={this.state.events} />
          <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }} />
        </Container>
      </div>
    );
  }
}

export default App;