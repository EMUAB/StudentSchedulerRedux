import React from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const events = [
    {
      start: moment().toDate(),
      end: moment().add(1, "hours").toDate(),
      title: "Some title",
    },
    {
      start: moment().add(1, "days").toDate(),
      end: moment().add(1, "days").add(1, "hours").toDate(),
      title: "Some title",
    },
    {
      start: moment().add(2, "days").toDate(),
      end: moment().add(2, "days").add(4, "hours").toDate(),
      title: "Some title",
    },
    {
      start: moment().add(3, "days").toDate(),
      end: moment().add(3, "days").add(2, "hours").toDate(),
      title: "Some title",
    },
    {
      start: moment().add(4, "days").toDate(),
      end: moment().add(4, "days").add(1, "hours").toDate(),
      title: "Some title",
    },
  ];

  const earliestEvent = events.reduce((prev, current) => {
    return prev.start < current.start ? prev : current;
  });
  const latestEvent = events.reduce((prev, current) => {
    return prev.end > current.end ? prev : current;
  });

  const earliestHour = Math.min(...events.map(event => event.start.getHours()));
  const latestHour = Math.max(...events.map(event => event.end.getHours()));

  const earliestTime = moment(earliestEvent.start).hours(earliestHour).toDate();
  const latestTime = moment(latestEvent.end).hours(latestHour).toDate();
  console.log(earliestTime, latestTime);
  return (
    <div style={{ height: "100vh" }}>
      <BigCalendar
        localizer={localizer}
        defaultDate={moment().toDate()}
        defaultView={"work_week"}
        views={["work_week", "agenda"]}
        events={events}
        min={earliestTime}
        max={latestTime}
        toolbar={false}
        showCurrentTimeIndicator={false}
      />
    </div>
  );
};

export default Calendar;