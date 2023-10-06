import {useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from "react-redux";
import { signupUser } from "../redux/authSlice";
import { Link } from 'react-router-dom';
import { Button, Input, Typography } from '@material-tailwind/react';
function Signup() {
    const[data,setData]=useState({
        firstname:"",
        lastname:"",
        rollno:"",
        email:"",
        password:"",
        image:null,
        birth:new Date(),
        branch:"",
        year:0,
        category:"Student",
        mobileno:0,
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
                    <Input type="number" size="lg" label="Passout Year" value={data.year} name="year" onChange={handleChange}/>
                    <Input type="date" size="lg" label="Date Of Birth" value={data.birth} name="birth" onChange={handleChange}/>

                    <div>
                        <Input type="tel" label="MobileNo"name="mobileno" onChange={handleChange} value={data.mobileno}/>
                    </div>
                    <Button onClick={handleSignup} color='brown'>SignUp</Button>
                    <Typography className='mb-5'>Already have an account <Link className='font-semibold' to='/login'>Login</Link></Typography>
                </form>
        </div>
    </div>
    
  )
}

export default Signup