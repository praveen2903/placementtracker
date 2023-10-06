import { useEffect, useState } from 'react'
import {toast} from 'react-toastify';
import Sidebar from '../../Components/Sidebar';
import { Button, Card, Input, Textarea, Typography } from '@material-tailwind/react';
import thumps from '../../Images/thumbs-up.png';
import upload from '../../Images/upload.png'
import { useDispatch, useSelector } from 'react-redux';
import { addEvent, getEvents, updateEvent } from '../../redux/eventSlice';
import { useParams } from 'react-router-dom';

function Event() {
    const params=useParams();
    const {eventname}=params;
    const[eventdata,setEventdata]=useState({id:"",club:"",image:null,name:"",eventdate:"",desc:""});
    const events=useSelector((state)=>state.events.events);
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchClubs=async()=>{
            await dispatch(getEvents());
        }
        fetchClubs();
    },[dispatch])
    useEffect(()=>{
        const updateEvent=events.filter((item)=>item.eventname===eventname)[0];
        if(updateEvent){
            setEventdata({"id":updateEvent._id,"club":updateEvent.clubname,"image":updateEvent.eventimage,"date":updateEvent.eventdate,"name":updateEvent.eventname,"desc":updateEvent.description});
        }
    },[events])
    const handleFileChange=(e)=>{
        setEventdata({ ...eventdata,["image"]:e.target.files[0]});
        toast.success("Image uploaded successfully");
    }
    const handleEventSubmit=async(e)=>{
        console.log("eventdata",eventdata);
        e.preventDefault();
        if(eventname){
            await dispatch(updateEvent(eventdata));
        }else{
            await dispatch(addEvent(eventdata));
        }
    }
  return (
    <div >
        <Sidebar/>
        <div className=' lg:pl-96 lg:flex items-center '>
            <Card shadow={true} className='lg:ml-10 lg:px-16 pb-10'>
                <form className='text-center md:mt-10  flex sm:flex-row flex-col items-center gap-10 px-10 mx-auto' onSubmit={handleEventSubmit}>
                    <div>
                        <label htmlFor="fileInput"  className="p-2  rounded-md cursor-pointer">
                                <img src={eventdata.image?thumps:upload}  alt='update image' className='w-40 h-40 object-cover' />
                        </label>
                        <input
                            id="fileInput"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className='flex flex-col gap-6'>
                        {eventname ?  <Typography variant="h4" color="blue-gray">
                            Update Event
                        </Typography>: <Typography variant="h4" color="blue-gray">
                            Add Event
                        </Typography>}
                            <select id="mySelect" name="mySelect"  onChange={(e)=>setEventdata({...eventdata,"club":e.target.value})} value={eventdata?.club} className='border-4 px-12 py-3'>
                                <option value="" disabled>
                                Select Club
                                </option>
                                <option value="MUSIC">Music</option>
                                <option value="DANCE">Dance</option>
                                <option value="THEATER">Theater</option>
                                <option value="TECHNICAL">Technical</option>
                                <option value="CULINARY">Culinary</option>
                            </select>
                        <Input label='Event Name' color='brown' type='text' value={eventdata?.name} onChange={(e)=>setEventdata({...eventdata,"name":e.target.value})}/>
                        <Input type="datetime-local" label='Date' color='brown' value={eventdata?.eventdate} onChange={(e)=>setEventdata({...eventdata,"eventdate":e.target.value})} />
                        <Textarea label="Event Description" color='brown' type='text' maxLength={200} value={eventdata?.desc} onChange={(e)=>setEventdata({...eventdata,"desc":e.target.value})} />
                        <Button  type='submit' color='brown'>Submit</Button>
                    </div>
                </form>
            </Card>
        </div>
    </div>
  )
}

export default Event