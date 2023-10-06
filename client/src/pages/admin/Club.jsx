import  { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Sidebar from '../../Components/Sidebar';
import { Button, Card, Input, Textarea, Typography } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import thumps from '../../Images/thumbs-up.png';
import upload from '../../Images/upload.png'
import { addClub, getClubs, updateClub } from '../../redux/clubSlice';
import { useParams } from 'react-router-dom';
function Club() {
    const params=useParams();
    const {clubname}=params;
    const[clubdata,setClubdata]=useState({id:"",image:null,name:"",desc:""});
    const clubs=useSelector((state)=>state.clubs.clubs);
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchClubs=async()=>{
            await dispatch(getClubs());
        }
        fetchClubs();
    },[dispatch])
    useEffect(()=>{
        const updateClub=clubs.filter((item)=>item.name===clubname)[0];
        if(updateClub){
            setClubdata({"id":updateClub._id,"image":updateClub.image,"name":updateClub.name,"desc":updateClub.desc});
        }
    },[clubs])
    const handleFileChange=(e)=>{
        setClubdata({...clubdata,["image"] : e.target.files[0]});
        toast.success("Image uploaded succesfully");
    }
    const handleClubSubmit=async(e)=>{
        e.preventDefault();
        if(clubname){
            await dispatch(updateClub(clubdata));
            await dispatch(getClubs());
            
        }else{
            await dispatch(addClub(clubdata));
            await dispatch(getClubs());
        }
    }
  return (
    <div >
        <Sidebar/>
        <div className='pt-10 lg:pl-96 lg:flex items-center '>
            <Card shadow={true} className='lg:ml-20 lg:px-10 pb-10'>
                <form className='text-center md:mt-10 flex sm:flex-row flex-col items-center gap-10 px-10 mx-auto' onSubmit={handleClubSubmit}>
                    <div>
                        <label htmlFor="fileInput"  className="p-2  rounded-md cursor-pointer">
                                <img src={clubdata.image?thumps:upload} alt='clubimage' className='w-40 h-40 object-cover'/>                        </label>
                        <input
                            id="fileInput"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                   <div className='flex flex-col gap-6'>
                        {clubname ?  <Typography variant="h4" color="blue-gray">
                            Update Club
                        </Typography>: <Typography variant="h4" color="blue-gray">
                            Add Club
                        </Typography>}
                        <Input color="brown" className='' label='Club Name' type='text' value={clubdata?.name} onChange={(e)=>setClubdata({...clubdata,["name"] : e.target.value.toUpperCase()})}/>
                        <Textarea color="brown"label="Club Description" type='text' value={clubdata?.desc} onChange={(e)=>setClubdata({...clubdata,["desc"] : e.target.value})} />
                        <Button color="brown" type='submit'>Submit</Button>
                   </div>
                </form>
            </Card>
        </div>
    </div>
  )
}

export default Club