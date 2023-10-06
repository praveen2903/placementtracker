import { useState } from "react";
import Sidebar from "../../Components/Sidebar";
import axios from 'axios';
import { BASE_URL } from "../../config/url";
import { Button, Card, Input, Textarea, Typography } from '@material-tailwind/react';
import thumps from '../../Images/thumbs-up.png';
import upload from '../../Images/upload.png'
import { toast } from "react-toastify";
function AddTestimony(){
    const [profileData,setProfileData]=useState({name:"",position:"",desc:"",image:null});
    const handleFileChange=(e)=>{
        setProfileData({...profileData,["image"] : e.target.files[0]});
        toast.success("Image uploaded succesfully");
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(profileData);
        try{
            await axios.post(`${BASE_URL}/api/admin/addTestimony`,profileData,{
                headers:{
                  "Content-Type":"multipart/form-data",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
        }catch(err){
            console.log(err.message);
        }
    }
    return (
        <div >
        <Sidebar/>
        <div className='pt-10 lg:pl-96 lg:flex items-center '>
            <Card shadow={true} className='lg:ml-20 lg:px-10 pb-10'>
                <form className='text-center md:mt-10 flex sm:flex-row flex-col items-center gap-10 px-10 mx-auto' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="fileInput"  className="p-2  rounded-md cursor-pointer">
                                <img src={profileData.image?thumps:upload} alt='clubimage' className='w-40 h-40 object-cover'/>                        </label>
                        <input
                            id="fileInput"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                   <div className='flex flex-col gap-6'>
                        <Typography variant="h4" color="blue-gray">
                            Add Testimonial
                        </Typography>
                        <Input color="brown" className='' label='Name' type='text' value={profileData.name} onChange={(e)=>setProfileData({...profileData,["name"] : e.target.value})}/>
                        <Input color="brown" className='' label='Position' type='text' value={profileData.position} onChange={(e)=>setProfileData({...profileData,["position"] : e.target.value})}/>
                        <Textarea color="brown"label="Description" type='text' value={profileData.desc} onChange={(e)=>setProfileData({...profileData,["desc"] : e.target.value})} />
                        <Button color="brown" type='submit'>Submit</Button>
                   </div>
                </form>
            </Card>
        </div>
    </div>
    )
};
export default AddTestimony;