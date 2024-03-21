import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DashNavbar from "./components/Navbar";

const localizer = momentLocalizer(moment);


class App extends Component {
  setIsLoggedIn = (state) => {
     this.setState({ isLoggedIn: state });
   }

  state = {
    isLoggedIn: true,
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
        <DashNavbar isLoggedIn={this.state.isLoggedIn} setIsLoggedIn = {this.setIsLoggedIn}/>
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: "100vh" }}
        />
      </div>
    );
  }
}

export default App;
