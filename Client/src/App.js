import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import RefreshIcon from '@mui/icons-material/Refresh';
import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DashNavbar from "./components/Navbar";
import { Button, Card } from "react-bootstrap";
import possibleSchedData from "./possible-sched-data";
import Column from "./components/Column";

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
    ],
    possibleSchedules: possibleSchedData.schedules
  };

  onDragEnd = (result) => { };

  render() {
    return (
      <div className="App">
        <DashNavbar
          isLoggedIn={this.state.isLoggedIn}
          setIsLoggedIn={this.setIsLoggedIn}
        />
        <div className="card-divs">
          <div className="top-link-card-container" style={{ display: 'flex', marginTop: '1rem', marginBottom: '1rem', textAlign: 'left' }}>
            <Card style={{ width: '18rem', marginRight: '1rem', marginLeft: '1rem', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: "#1b604a", color: "#fff" }}>
              <Card.Body>
                <Card.Title style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{this.state.selectedTerm}</Card.Title>
                <Card.Text>
                  <Button variant="light" size="sm" href="#">Change term</Button>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: '18rem', marginRight: '1rem', marginLeft: '1rem', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: "#1b604a", color: "#fff" }}>
              <Card.Body>
                <Card.Title style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{this.state.advisorName}</Card.Title>
                <Card.Text>
                  <Button variant="light" size="sm" href="#">Contact advisor</Button>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div className="courses-container" style={{ display: 'flex', marginTop: '1rem', marginBottom: '1rem', textAlign: 'left' }}>
            <Card style={{ width: '100%', marginRight: '0.5rem', marginLeft: '1rem', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: "#1b604a", color: "#fff" }}>
              <Card.Body>
                <Card.Title style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Selected Courses</Card.Title>
                <Card.Text>
                  <Button variant="light" size="sm" href="#">Add courses</Button>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: '100%', marginRight: '1rem', marginLeft: '0.5rem', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: "#1b604a", color: "#fff" }}>
              <Card.Body>
                <Card.Title style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Recommended Courses</Card.Title>
                <Card.Text>
                  <Button variant="light" size="sm" href="#">View recommendations</Button>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div className="schedules-container" style={{ display: 'flex', marginTop: '1rem', marginBottom: '1rem', textAlign: 'left' }}>
            <Card style={{ width: '100%', marginRight: '0.5rem', marginLeft: '1rem', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: "#1b604a", color: "#fff" }}>
              <Card.Body>
                <Card.Title style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Chosen Schedule</Card.Title>
                <Card.Text>
                  No schedule chosen!
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: '100%', marginRight: '1rem', marginLeft: '0.5rem', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: "#1b604a", color: "#fff" }}>
              <Card.Body>
                <Card.Title style={{ fontSize: '1.8rem', fontWeight: 'bold', display: 'flex' }}>
                  <p>Possible Schedules</p>
                  <Button variant="light" size="sm" style={{ marginLeft: 'auto', alignSelf: 'flex-start' }} href="#">
                    <RefreshIcon /> Refresh
                  </Button>
                </Card.Title>
                <Card.Text>
                  <Column schedules={this.state.possibleSchedules} />
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
          style={{ height: "100vh", backgroundColor: "#f9f9f9" }}
        />
      </div >
    );
  }
}

export default App;
