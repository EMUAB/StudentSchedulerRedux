import React from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const events = [
    {
      start: moment().toDate(),
      end: moment().add(1, "days").toDate(),
      title: "Some title",
    },
  ];

  return (
    <div>
      <h1>Calendar</h1>
      <BigCalendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        style={{ height: "100vh" }}
      />
    </div>
  );
};

export default Calendar;