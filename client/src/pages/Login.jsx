/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import {Link, useNavigate } from 'react-router-dom'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { Rings } from "react-loader-spinner";
function Login(props) {
    const {value}=props;
    const [data, setData] = useState({ email: "", password: "" });
    const navigate=useNavigate();
    const userInfo = useSelector((state) => state.auth.userInfo);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleLogin=async(e)=>{
        e.preventDefault();
         dispatch(loginUser(data));
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
    <div id="login" className='sm:mt-32 mt-40'>
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="brown"
            className="mb-4 grid h-20 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Email" size="lg" onChange={handleChange} value={data.email} name='email' />
            <Input label="Password" size="lg" onChange={handleChange} value={data.password} name='password'/>
            <div className="-ml-2.5 ">
              <Link to="/passwordrequest"><Checkbox label="Forget Password ?" onClick={value} /></Link>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button color='brown'variant="gradient" onClick={handleLogin} fullWidth>
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Link to="/signup">              
              <Typography
                variant="small"
                color="brown"
                className="ml-1 font-bold"
              >
                Sign up
              </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
    </div>
    
  )
}

export default Login