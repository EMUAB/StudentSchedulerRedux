import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DashNavbar from "./components/Navbar";
import { Button, Card } from "react-bootstrap";

const localizer = momentLocalizer(moment);


class App extends Component {
  setIsLoggedIn = (state) => {
    this.setState({ isLoggedIn: state });
  }

  state = {
    isLoggedIn: true,
    selectedTerm: "Fall 2021",
    advisorName: "Dr. John Doe",
    events: [
      {
        start: moment().toDate(),
        end: moment()
          .add(1, "days")
          .toDate(),
        title: "Some title"
      }
    ]
  };

  render() {
    return (
      <div className="App">
        <DashNavbar
          isLoggedIn={this.state.isLoggedIn}
          setIsLoggedIn={this.setIsLoggedIn}
        />
        <div className="card-divs" style={{fontFamily: 'Inter'}}>
          <div className="top-link-card-container" style={{ display: 'flex', marginTop: '1rem', marginBottom: '1rem', textAlign: 'left' }}>
            <Card style={{ width: '18rem', marginRight: '1rem', marginLeft: '1rem' }}>
              <Card.Body>
                <Card.Title style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{this.state.selectedTerm}</Card.Title>
                <Card.Text>
                  <Button variant="secondary" size="sm">Change term</Button>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: '18rem', marginRight: '1rem', marginLeft: '1rem' }}>
              <Card.Body>
                <Card.Title style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{this.state.advisorName}</Card.Title>
                <Card.Text>
                  <Button variant="secondary" size="sm">Contact advisor</Button>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div className="courses-container" style={{ display: 'flex', marginTop: '1rem', marginBottom: '1rem', textAlign: 'left' }}>
            <Card style={{ width: '100%', marginRight: '0.5rem', marginLeft: '1rem' }}>
              <Card.Body>
                <Card.Title style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Selected Courses</Card.Title>
                <Card.Text>
                  <Button variant="secondary" size="sm">Add courses</Button>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: '100%', marginRight: '1rem', marginLeft: '0.5rem' }}>
              <Card.Body>
                <Card.Title style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Recommended Courses</Card.Title>
                <Card.Text>
                  <Button variant="secondary" size="sm">View recommendations</Button>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div className="schedules-container" style={{ display: 'flex', marginTop: '1rem', marginBottom: '1rem', textAlign: 'left' }}>
            <Card style={{ width: '100%', marginRight: '0.5rem', marginLeft: '1rem' }}>
              <Card.Body>
                <Card.Title style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Chosen Schedule</Card.Title>
                <Card.Text>
                  No schedule chosen!
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: '100%', marginRight: '1rem', marginLeft: '0.5rem' }}>
              <Card.Body>
                <Card.Title style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Possible Schedules</Card.Title>
                <Card.Text>
                  No possible schedules!
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div >

        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: "100vh" }}
        />
      </div >
    );
  }
}

export default App;
