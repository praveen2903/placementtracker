import {useState } from "react";
import Sidebar from "../../Components/Sidebar"
import { Button, Input, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Typography } from '@material-tailwind/react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAdmin } from "../../redux/adminSlice";

function AddAdmin() {
    const[data,setData]=useState({
        firstname:"",
        lastname:"",
        rollno:"",
        email:"",
        password:"",
        image:null,
        birth:new Date(),
        branch:"",
        category:"Student",
        mobileno:0,
        admin:true,
    });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleFile=(e)=>{
      setData({...data,image:e.target.files[0]});
  }
  const handleAdmin=async(e)=>{
      e.preventDefault();
      await dispatch(addAdmin(data));
      navigate('/dashboard');
  }
 
  return (
    <div>
      <Sidebar/>
      <div className='flex-col flex justify-center items-center h-full w-full lg:pt-5 lg:pl-20  mt-10 lg:mt-0 ' >
          <div className='border-2 shadow-lg mx-auto text-center bg-white rounded-lg  pt-10 '>
                  <Typography variant="h4" color="blue-gray" className="mb-5">
                      Add Admin
                  </Typography>    
                    <Tabs value="new">
                        <TabsHeader >
                            <Tab value="new">New Admin</Tab>
                            <Tab value="exist">Existing Admin</Tab>
                        </TabsHeader>  
                        <TabsBody>
                            <TabPanel value="new">
                            <form onSubmit={handleAdmin} className='flex flex-col md:py-0 my-3 gap-6 sm:px-10 sm:mx-5 mx-10 px-0'>
                                <Input size="lg" label="First Name" name="firstname" value={data.firstname}onChange={handleChange}/>
                                <Input size="lg" label="Last Name" name="lastname" value={data.lastname}onChange={handleChange}/>
                                <Input size="lg" label="Roll No" name="rollno" value={data.rollno}onChange={handleChange}/>
                                <Input size="lg" label="Email" name="email" value={data.email} onChange={handleChange}/>
                                <Input type="password" size="lg" label="Password" value={data.password} name="password" onChange={handleChange}/>
                                <Input className='outline-none'type='file'onChange={handleFile} />
                                <div className='flex gap-14'>
                                    <Typography htmlFor="branchselect">Branch</Typography>
                                    <select id="branchselect"  name="branch" onChange={handleChange} value={data.branch}className="border-2 px-5 py-1">
                                        <option value="" disabled>
                                        select Branch
                                        </option>
                                        <option value="CSE">CSE</option>
                                        <option value="ECE">ECE</option>
                                        <option value="IT">IT</option>
                                        <option value="EEE">EEE</option>
                                        <option value="CIVIL">CIVIL</option>
                                        <option value="MECH">MECH</option>
                                        <option value="SPECIALIZATIONS">SPECIALIZATIONS</option>
                                    </select>
                                </div>
                                <Input type="date" size="lg" label="Date Of Birth" value={data.birth} name="birth" onChange={handleChange}/>

                                <div>
                                    <Input type="tel" label="MobileNo"name="mobileno" onChange={handleChange} value={data.mobileno}/>
                                </div>
                                <Button onClick={handleAdmin} color='brown'>Add Admin</Button>
                            </form>
                            </TabPanel>
                            <TabPanel value="exist">
                                <form onSubmit={handleAdmin} className='flex flex-col md:py-0 my-3 gap-6 sm:px-10 sm:mx-5 mx-10 px-0 w-96'>
                                    <Input size="lg" label="Email" name="email" onChange={handleChange} value={data.email}/>
                                    <Button color='brown' onClick={handleAdmin}>Add Admin</Button>
                                </form>
                            </TabPanel>
                        </TabsBody>     
                    </Tabs> 
          </div>
      </div>
  </div>

  )
}

export default AddAdmin