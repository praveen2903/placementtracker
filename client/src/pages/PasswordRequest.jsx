import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword} from "../redux/authSlice";
import {useNavigate } from 'react-router-dom'
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
function PasswordRequest(props) {
    const {value}=props;
    const[email,setEmail]=useState("");
    const navigate=useNavigate();
    const userInfo = useSelector((state) => state.auth.userInfo);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);

    const handleChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePassword=async(e)=>{
        e.preventDefault();
         dispatch(forgotPassword({email}));
         value();
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
            Reset Password Request
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Email" size="lg" onChange={handleChange} value={email} name='email' />
          </CardBody>
          <CardFooter className="pt-0">
            <Button color='brown'variant="gradient" onClick={handlePassword} fullWidth>
              Send Email
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Remember Password
              <Typography
                as="a"
                href="/login"
                variant="small"
                color="brown"
                className="ml-1 font-bold"
              >
                Log In
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
    </div>
    
  )
}

export default PasswordRequest