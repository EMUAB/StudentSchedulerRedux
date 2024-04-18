// Referenced https://stackoverflow.com/questions/34587067/change-color-of-react-big-calendar-events

import React from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

const convertTimeToHoursMinutesRange = (timeString) => {
  // Split the time string into start and end times
  const [startStr, endStr] = timeString.split('-');

  // Helper function to convert time string to hours and minutes
  function getTimeParts(timeStr) {
    const [time, period] = timeStr.trim().split(' ');
    const [hoursStr, minutesStr] = time.split(':');
    let hours = parseInt(hoursStr);
    const minutes = parseInt(minutesStr);
    if (period === 'pm' && hours !== 12) {
      hours += 12;
    } else if (period === 'am' && hours === 12) {
      hours = 0;
    }
    return { hours, minutes };
  }

  // Get start and end time parts
  const startTime = getTimeParts(startStr);
  const endTime = getTimeParts(endStr);

  return [startTime.hours, startTime.minutes, endTime.hours, endTime.minutes];
}

const getFirstDate = (dateString) => {
  // Split the date string into start and end dates
  const [startDateStr, _] = dateString.split('-');

  // Parse the start date using Moment.js
  const startDate = moment(startDateStr, 'MM/DD');

  return startDate;
};


const createEvents = (courses) => {
  const events = [];
  courses.map(course => {
    const colors = ["#145230", "#4d194d", "#272640", "#0b525b", "#357965", "#712531", "#161449", "#4c0099", "#343837", "#60515c", "#4c9900", "#44092e", "#660000", "#006600", "#000066", "#666666"];
    const usedColors = [];

    const getRandomColor = () => {
      const availableColors = colors.filter(color => !usedColors.includes(color));
      const randomIndex = Math.floor(Math.random() * availableColors.length);
      const randomColor = availableColors[randomIndex];
      usedColors.push(randomColor);
      return randomColor;
    };

    const color = getRandomColor();
    const days = course.days.split('');

    function convertDayToWeekday(day) {
      switch (day) {
        case 'M':
          return 1;
        case 'T':
          return 2;
        case 'W':
          return 3;
        case 'R':
          return 4;
        case 'F':
          return 5;
        default:
          return 0;
      }
    }

    const exactTimes = convertTimeToHoursMinutesRange(course.time);

    const courseEvents = [];
    days.forEach(day => {
      const event = {
        start: moment().weekday(convertDayToWeekday(day)).hours(exactTimes[0]).minutes(exactTimes[1]).toDate(),
        end: moment().weekday(convertDayToWeekday(day)).hours(exactTimes[2]).minutes(exactTimes[3]).toDate(),
        title: `${course.subject} ${course.courseNumber} (${course.section})`,
        hexColor: color,
      };
      courseEvents.push(event);
    });
    events.push(...courseEvents);
  })
  return events;
}

const Calendar = ({ courses }) => {
  const events = createEvents(courses);

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
  return (
    <div id="calendarDiv" style={{ height: "100vh", backgroundColor: '#fff', color:'#000'}}>
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
        eventPropGetter={
          (event, start, end, isSelected) => {
            let newStyle = {
              backgroundColor: event.hexColor,
              color: '#fff',
              borderRadius: "6px",
              border: "none"
            };

            return {
              className: "",
              style: newStyle
            };
          }
        }
      />
    </div>
  );
};

export default Calendar;