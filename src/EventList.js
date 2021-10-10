import React, { Component } from "react";
import Event from "./Event";
import Row from 'react-bootstrap/Row';

class EventList extends Component {
  render() {
    // props passed from App Component
    const { events } = this.props;
    return (
      <ul className="EventList">
        {events.map(event =>
          <li key={event.id}>
            <Row>
              <Event event={event} />
            </Row>
          </li>
        )}
      </ul>
    );
  }
}

export default EventList;