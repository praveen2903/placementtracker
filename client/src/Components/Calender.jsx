import React, { useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import { getEvents } from '../redux/eventSlice';
import 'moment-timezone'; // Import moment-timezone

function formatEvents(events) {
    return events.map(event =>{
      console.log("eventdate",event.eventdate);
    //   const eventDate = new Date(event.eventdate);
    // const formattedDate = eventDate.toISOString();
      return{
      title: event.eventname,          // Event title
      start:moment(event.eventdate).toDate(),  // Event start date (as a Date object)
      end: moment(event.eventdate).toDate(),  // Event end date (as a Date object)
      allDay: false                    // Set to false if the event has a specific time
    }});
  }
function Calender() {
    const events= useSelector((state) => state.events.events);
    console.log("events",events);
    const localizer = momentLocalizer(moment);
    const dispatch=useDispatch();
    const formattedEvents = formatEvents(events);
    useEffect(()=>{
        const fetchData=async()=>{
            await dispatch(getEvents());
        }
        fetchData();
   },[dispatch]);
  return (
    <div className='mt-28 h-[30rem] m-10'>
        <Calendar localizer={localizer} events={formattedEvents} />
    </div>
  )
}

export default Calender 