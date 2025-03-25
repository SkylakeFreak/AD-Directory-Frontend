import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function MyCalendar() {
  const [events, setEvents] = useState([
    {
      start: moment().toDate(),
      end: moment().add(1, "hours").toDate(),
      title: "Meeting with Team"
    },
    {
      start: moment().add(1, "days").toDate(),
      end: moment().add(1, "days").add(2, "hours").toDate(),
      title: "Project Deadline"
    },
    {
      start: moment().add(2, "days").toDate(),
      end: moment().add(2, "days").add(3, "hours").toDate(),
      title: "Doctor's Appointment"
    },
    {
      start: moment().subtract(1, "days").toDate(),
      end: moment().subtract(1, "days").add(1, "hours").toDate(),
      title: "Workshop on React"
    },
    {
      start: moment().add(5, "days").toDate(),
      end: moment().add(5, "days").add(4, "hours").toDate(),
      title: "Client Presentation"
    }
  ]);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}

export default MyCalendar;
