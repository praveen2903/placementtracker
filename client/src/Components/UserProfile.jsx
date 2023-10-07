import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../config/url';
import { useDispatch, useSelector } from 'react-redux';
import { getRegisters } from '../redux/registerSlice';
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
function UserProfile() {
    const params=useParams();
    const {rollno}=params;
    const dispatch=useDispatch();
    const[profileuser,setProfileuser]=useState(null);
    const registers= useSelector((state) => state.register.registers);
    const[feedback,setFeedback]=useState(null);
    useEffect(()=>{
        const fetchData=async()=>{
            const res1=await axios.get(`${BASE_URL}/api/users/${rollno}`);
            const res3=await axios.get(`${BASE_URL}/api/msgs/${rollno}`);
            dispatch(getRegisters());
            setProfileuser(res1);   
            setFeedback(res3);
            console.log(feedback)
        };
        fetchData();
    },[]);
    const data = [
        {
          label: "Profile",
          value: "profile"
        },
        {
          label: "Registrations",
          value: "registers",
        },
        {
          label: "Feedback",
          value: "msgs",
          
        },
      ];
    
    
  return (
    <div className='mx-auto sm:px-20 mt-28 px-4'>
        <Tabs value="profile">
            <TabsHeader>
                {data.map(({ label, value }) => (
                <Tab key={value} value={value}>
                    <div className="flex items-center gap-2">
                    {label}
                    </div>
                </Tab>
                ))}
            </TabsHeader>
            <TabsBody  animate={{
                initial: { y: 250 },
                mount: { y: 0 },
                unmount: { y: 250 },
                }}>
                {data.map(({ value}) => (
                <TabPanel key={value} value={value} className='flex items-center justify-center mt-12'>
                    {value==="profile" && profileuser && profileuser.data.map((item,index)=>(
                        <div key={index} className='flex sm:gap-20 gap-10  flex-col sm:flex-row items-center'>
                            <div>
                              <img className='w-44 h-44 object-cover rounded-lg' src={item.image} alt='profile'/>
                            </div>
                            <div className='flex flex-col gap-2 items-center sm:items-start'>
                                <h1><span className='font-bold'>UserName </span> {item.firstName}</h1>
                                <h1><span className='font-bold'>Category</span> {item.category}</h1>
                                <h1><span className='font-bold'>Email</span> {item.email}</h1>
                                <h1><span className='font-bold'>Branch</span> {item.branch}</h1>
                                <h1><span className='font-bold'>RollNo</span> {item.rollno}</h1>
                                <h1><span className='font-bold'>Year</span> {item.year}</h1>
                                <h1><span className='font-bold'>mobile</span> {item.mobile}</h1>
                            </div>
                        </div>
                    ))}
                    {value==="registers" && registers && registers.filter((item)=>item.roll===rollno).map((item,index)=>(
                        <div key={index} className=' shadow-2xl p-14 flex flex-col gap-2'>
                            <h1><span className='font-bold'>Company Name</span> {item.club}</h1>
                            <h1><span className='font-bold'>Department</span> {item.event}</h1>
                            <h1><span className='font-bold'>Year</span> {item.year}</h1>
                            <h1><span className='font-bold'>Roll No</span> {item.roll}</h1>
                        </div>
                    ))}
                    {value==="msgs" && feedback && <div className='flex flex-wrap gap-10'>
                        {feedback.data.map((item,index)=>(
                            <div key={index} className='flex flex-col gap-2 shadow-xl p-6'>
                                <h1 className='font-bold'>{item.name}</h1>
                                <h1>{item.email}</h1>
                                <h1>{item.text}</h1>
                            </div>
                        ))}    
                    </div>}
                </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    </div>
  )
}

export default UserProfile