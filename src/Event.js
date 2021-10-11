import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

class Event extends Component {
  state = {
    showDetails: false
  }

  showDetails = () => {
    this.setState({
      showDetails: !this.state.showDetails
    })
  }

  render() {
    // props passed from EventList Component
    const { event } = this.props;

    return <Col>
        <Card className='event m-1 p-2' bg='light' border='dark'>
        <Card.Body>
          <Card.Title className='name'>{event.summary}</Card.Title>
          <Card.Subtitle>
            <p>{new Date(event.start.dateTime).toLocaleDateString
            ('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'utc', timeZoneName: 'short' })
            }
            </p>
            <p className="mb-3">
                @ {event.summary} | {event.location}
            </p>
          </Card.Subtitle>
          {this.state.showDetails && (
            <div className='event-details'>
              <Card.Subtitle>About event:</Card.Subtitle>
              <a href={event.htmlLink}>See Details on Google Calendar</a>
                <Card.Text className='description mb-2'>{event.description}</Card.Text>
            </div>
          )}
            <br />
          <Button variant="info" className='details-btn m-2 p-1' onClick={this.showDetails}>{this.state.showDetails ? 'Hide Details' : 'Show Details'}</Button>
        </Card.Body>
      </Card>
    </Col>
    
  }
}

export default Event;