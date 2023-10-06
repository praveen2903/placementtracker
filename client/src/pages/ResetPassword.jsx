import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {useNavigate, useParams } from 'react-router-dom'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { Rings } from "react-loader-spinner";
import { toast } from 'react-toastify';
import { resetPassword } from '../redux/authSlice';
function ResetPassword() {
    const params=useParams();
    const{id,token}=params;
    const[password,setPassword]=useState("");
    const[confirmPassword,setConfirmPassword]=useState("");
    const navigate=useNavigate();
    const userInfo = useSelector((state) => state.auth.userInfo);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);


    const resetpassword=async(e)=>{
        e.preventDefault();
        if(password!=confirmPassword){
            toast.error("Password must match")
        }else{
            dispatch(resetPassword({password,id,token}));
            navigate('/login');
        }
    };
    useEffect(()=>{
        if(userInfo){
            navigate('/');
        }
    },[navigate,userInfo]);
    if (loading) {
        return (
          <div className="flex justify-center items-center h-screen">
            <Rings
              height="80"
              width="80"
              color="#21BF73"
              radius="6"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="rings-loading"
            />
          </div>
        );
    }
  return (
    <div id="login" className='sm:mt-52 mt-40'>
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="brown"
            className="mb-10 grid h-20 place-items-center"
          >
            <Typography variant="h5" color="white">
            Update Password
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="password" type='password' size="lg" onChange={(e)=>setPassword(e.target.value)} value={password} name='password' />
            <Input label="confirmPassword" type='password' size="lg" onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} name='password' />
          </CardBody>
          <CardFooter className="pt-0">
            <Button color='brown'variant="gradient" onClick={resetpassword} fullWidth>
              Update
            </Button>
          </CardFooter>
        </Card>
    </div>
    
  )
}

export default ResetPassword;