import {useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from "react-redux";
import { signupUser } from "../redux/authSlice";
import { Link } from 'react-router-dom';
import { Button, Input, Typography } from '@material-tailwind/react';
function Signup() {
    const[data,setData]=useState({
        name:"",
        email:"",
        password:"",
        image:null,
        branch:"",
        year:0,
        section:"",
        rollno:"",
        admin:false,
    });
    const dispatch = useDispatch();
	const navigate = useNavigate();
    const userInfo = useSelector((state) => state.auth.userInfo);
    
	const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleFile=(e)=>{
        setData({...data,image:e.target.files[0]});
    }
    const handleSignup=async(e)=>{
        e.preventDefault();
        await dispatch(signupUser(data));
        navigate('/');
    }
    useEffect(()=>{
        if(userInfo){
            navigate("/login");
        }
    },[navigate,userInfo]);
  return (
    <div className='flex-col flex justify-center items-center h-full w-full' >
        <div className='border-2 shadow-lg flex flex-col items-center justify-center bg-white rounded-lg mt-32 pl-2 py-10'>
                <Typography variant="h4" color="blue-gray">
                    Sign Up
                </Typography>            
                <form onSubmit={handleSignup} className='flex flex-col md:py-0 my-3 gap-6 sm:px-10 sm:mx-5 mx-10 px-0'>
                    <Input size="lg" label="Name" name="name" value={data.name}onChange={handleChange}/>
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
                        </select>
                    </div>
                    <div className='flex gap-14'>
                        <Typography htmlFor="yearselect">Year</Typography>
                        <select id="yearselect"  name="year" onChange={handleChange} value={data.year}className="border-2 px-5 py-1">
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
                    <Button onClick={handleSignup} color='brown'>SignUp</Button>
                    <Typography className='mb-5'>Already have an account <Link className='font-semibold' to='/login'>Login</Link></Typography>
                </form>
        </div>
    </div>
    
  )
}

export default Signup