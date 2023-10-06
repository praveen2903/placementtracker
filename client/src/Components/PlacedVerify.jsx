import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
  } from "@material-tailwind/react";
import { useState } from "react";
import upload from '../Images/upload.png'
import thumps from '../Images/thumbs-up.png';
import { useDispatch, useSelector } from 'react-redux';
import { checkVerify } from "../redux/registerSlice";

const PlacedVerify=()=> {
    const userInfo = useSelector((state) => state.auth.userInfo);
    const dispatch=useDispatch();
    const [data, setData] = useState({rollno:userInfo.rollno,image: null });
   
    const handleFile=(e)=>{
        setData({...data,image:e.target.files[0]});
    }
    const handleVerify=async(e)=>{
        e.preventDefault();
        await dispatch(checkVerify(data));
    }
  return (
    <div className="mt-48">
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="brown"
            className="mb-4 grid h-20 place-items-center"
          >
            <Typography variant="h3" color="white">
              Verify OfferLetter
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-8">
                <div className="mx-auto">
                    <label htmlFor="fileInput"  className="p-2  rounded-md cursor-pointer">
                            <img src={data.image?thumps:upload} alt='clubimage' className='w-40 h-40 object-cover'/>                        </label>
                    <input
                        id="fileInput"
                        type="file"
                        className="hidden"
                        onChange={handleFile}
                    />
                </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button color='brown'variant="gradient" onClick={handleVerify} fullWidth>
              verify
            </Button>
          </CardFooter>
        </Card>
    </div>
  )
}

export default PlacedVerify;