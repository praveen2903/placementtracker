import {useState } from "react";
import Sidebar from "../../Components/Sidebar"
import { Button, Input, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Typography } from '@material-tailwind/react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAdmin } from "../../redux/adminSlice";

function AddAdmin() {
  const[data,setData]=useState({
    name:"",
    email:"",
    password:"",
    image:null,
    branch:"",
    year:0,
    section:"",
    rollno:"",
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
                                <form onSubmit={handleAdmin} className='flex flex-col md:py-0 my-3 gap-6 sm:px-10 sm:mx-5 mx-10 px-0 w-96'>
                                    <Input size="lg" label="Name" name="name" onChange={handleChange} value={data.name}/>
                                    <Input size="lg" label="Email" name="email" onChange={handleChange} value={data.email}/>
                                    <Input type="password" size="lg" label="Password" name="password" onChange={handleChange} value={data.password}/>
                                    <Input className='outline-none'type='file'onChange={handleFile}/>
                                    <div className='flex gap-14'>
                                        <Typography htmlFor="branchselect">Branch</Typography>
                                        <select id="branchselect"  name="branch" onChange={handleChange} value={data.branch} className="border-2 px-5 py-1">
                                            <option value="" disabled>
                                            select Branch
                                            </option>
                                            <option value="CSE">CSE</option>
                                            <option value="ECE">ECE</option>
                                            <option value="IT">IT</option>
                                            <option value="EEE">EEE</option>
                                            <option value="CIVIL">CIVIL</option>
                                            <option value="MECH">MECH</option>
                                        </select>
                                    </div>
                                    <div className='flex gap-14'>
                                        <Typography htmlFor="yearselect">Year</Typography>
                                        <select id="yearselect"  name="year" onChange={handleChange} value={data.year} className="border-2 px-5 py-1">
                                            <option value="0" disabled>
                                                select Year
                                            </option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                    </div>
                                    <div className='flex gap-14 '>
                                        <Typography htmlFor="sectionselect">Section</Typography>
                                        <select id="sectionselect" name="section"  onChange={handleChange} value={data.section} className="border-2 px-5 py-1">
                                            <option value="" disabled>
                                            select Section
                                            </option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                            <option value="D">D</option>
                                            <option value="E">E</option>
                                        </select><br/>
                                    </div>

                                    <div>
                                        <Input type="text" label="RollNo"name="rollno" onChange={handleChange} value={data.rollno}/>
                                    </div>
                                    <Button color='brown' onClick={handleAdmin}>Add Admin</Button>
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