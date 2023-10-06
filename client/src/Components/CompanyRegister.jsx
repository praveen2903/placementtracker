/* eslint-disable react/prop-types */
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from '@material-tailwind/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addRegister, getRegisters } from '../redux/registerSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function CompanyRegister({value,club,event}) {
    const userInfo = useSelector((state) => state.auth.userInfo);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const[data,setData]=useState({user:userInfo.email,club:club,event:event,category:userInfo.category,username:userInfo.firstName,year:userInfo.year,branch:userInfo.branch,rollno:userInfo.rollno,image:userInfo.image,cgpa:0});
    const handleGpa=(e)=>{
        setData({...data,cgpa:e.target.value})
    }
    const handleRegister=async()=>{
        if(userInfo){
            try{
                const res1=await dispatch(addRegister({data}));
                await dispatch(getRegisters());
                console.log(res1.payload);

            }catch(err){
                toast.error("You need to register for Department");
            }
        }else{
            navigate('/login');
        }
    }
  return (
    <div>
       <Card className='w-full mx-auto'>
        <CardHeader
        variant='gradient'
        color='orange'
        className='mx-auto p-2 font-bold px-10 py-5'>
          Apply to Company
        </CardHeader>
        <CardBody>
          <div className='grid sm:grid-cols-2 xl:grid-cols-1 sm:pt-10 pt-3 sm:gap-5 gap-3 grid-cols-1'>
            <Input label='CGPA' size='md' value={data.cgpa} type="number" onChange={handleGpa} />
          </div>
        </CardBody>
        <CardFooter>
          <div className='flex justify-end gap-2 sm:gap-4'>
            <Button color='red' onClick={value}>Cancel</Button>
            <Button color='green' onClick={handleRegister}>Register</Button>
          </div>
        </CardFooter>
       </Card>

    </div>
  )
}

export default CompanyRegister