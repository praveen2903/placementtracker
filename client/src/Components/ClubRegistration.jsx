/* eslint-disable react/prop-types */
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from '@material-tailwind/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clubRegister } from '../redux/clubSlice';

function ClubRegistration({value,club}) {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch=useDispatch();
  const[data,setData]=useState({clubname:club,category:userInfo.category,username:userInfo.firstName,year:userInfo.year,branch:userInfo.branch,rollno:userInfo.rollno,image:userInfo.image})
  const handleRegister=()=>{
    dispatch(clubRegister({data}));
    value();
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
            <Input label='club' size='md' value={club} readOnly/>
            <Input label='full name' size='md' value={userInfo.firstName+" "+userInfo.lastName} readOnly/>
            <Input label='passed out year' size='md' value={userInfo.year} readOnly/>
            <Input label='Department' size='md' value={userInfo.branch} readOnly/>
            <Input label='Mobile No' size='md' value={userInfo.mobile} readOnly/>
            
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

export default ClubRegistration