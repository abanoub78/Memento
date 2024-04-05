import React, { useState, useEffect, useRef } from 'react';
import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from '../event-utils';
import '../App.css';

export default function DemoApp() {
  const [currentEvents, setCurrentEvents] = useState([]);
  const calendarRef = useRef(null);

  useEffect(() => {
    // Load events from local storage on component mount
    const storedEvents = JSON.parse(localStorage.getItem('events'));
    if (storedEvents) {
      setCurrentEvents(storedEvents);
    }
  }, []);

  function handleDateSelect(selectInfo) {
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      const newEvent = {
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      };
      calendarApi.addEvent(newEvent); // Add the new event to the calendar

      // Save event to local storage
      const updatedEvents = [...currentEvents, newEvent];
      localStorage.setItem('events', JSON.stringify(updatedEvents));

      // Update current events state
      setCurrentEvents(updatedEvents);
    }
  }
  function handleEventClick(clickInfo) {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
       // Remove event from local storage
       const updatedEvents = currentEvents.filter(event => event.id !== clickInfo.event.id);
       localStorage.setItem('events', JSON.stringify(updatedEvents));
   
       // Update current events state
       setCurrentEvents(updatedEvents);
   
       // Remove event from calendar
       clickInfo.event.remove();
       window.location.reload();
       // This should only remove the clicked event
    }
   }
   

  function handleEvents(events) {
    setCurrentEvents(events);
  }

  return (
    <div className='demo-app'>
      <Sidebar

        currentEvents={currentEvents}
      />
      <div className='demo-app-main'>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          initialEvents={INITIAL_EVENTS}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
        />
      </div>
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function Sidebar({ weekendsVisible, setWeekendsVisible, currentEvents }) {
  return (
    <div className='demo-app-sidebar'>
      {/* <div className='demo-app-sidebar-section'>
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div> */}

      <div className='demo-app-sidebar-section'>
        <h2>All Events ({currentEvents.length})</h2>
        <ul>
          {currentEvents.map((event) => (
            <SidebarEvent key={event.id} event={event} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function SidebarEvent({ event, handleEventClick }) {
  const onDeleteClick = () => {
     // Retrieve the current events from local storage
     const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
 
     // Filter out the event to be deleted
     const updatedEvents = storedEvents.filter(e => e.id !== event.id);
 
     // Save the updated events back to local storage
     localStorage.setItem('events', JSON.stringify(updatedEvents));
 

 
     console.log("Event removed from local storage:", event.id);
            window.location.reload();

  };
 
  return (
     <li key={event.id} className='res'>
       <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
       <p>{event.title}</p>
       <i className="fas fa-trash del" onClick={onDeleteClick}></i>
     </li>
  );
 }
 