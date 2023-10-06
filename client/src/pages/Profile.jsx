import {useDispatch, useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import thumps from '../Images/thumbs-up.png';
import { updateRegister } from "../redux/authSlice";

function Profile() {
  const userInfo = useSelector((state) => state.auth.userInfo);
   const[edit,setEdit]=useState(false);
   const dispatch=useDispatch();
   const[profiledata,setProfiledata]=useState({id:"",image:null,name:"",email:"",branch:"",rollno:"",section:"",year:0});
   const handleFileChange=(e)=>{
    setProfiledata({...profiledata,["image"]:e.target.files[0]});
    toast.success("Image uploaded succesfully");
   }
   useEffect(()=>{
    setProfiledata({id:userInfo._id,image:userInfo.image,name:userInfo.username,email:userInfo.email,branch:userInfo.branch,rollno:userInfo.rollno,section:userInfo.section,year:userInfo.year});
   },[userInfo])
   const handleUpdate=()=>{
    dispatch(updateRegister(profiledata));
   }
  return (
    <div >
      <form  className="mt-36 mx-auto flex flex-col gap-16 mb-10">
        <div className="flex justify-center items-center gap-16 sm:flex-row flex-col">
              <div>
                <label htmlFor="fileInput"  className=" cursor-pointer">
                  <img src={profiledata.image?profiledata.image:thumps} alt='updateImage' className={`rounded-full object-cover w-52 h-52 text-center ${edit?'sm:mb-32':'mb-0'}`}/></label>
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={edit?false:true}
                />
              </div>
          <div className="flex flex-col gap-3 items-center sm:items-start ">
            <p ><span className="font-bold pr-2">Category</span>{userInfo.category}</p>
            <span className={`flex ${edit ? 'flex-col gap-2' : 'flex-row'}`}><p className="font-bold pr-2">UserName</p><input className={`${edit?'border-2 border-black':'border-none'}`} type="text" value={profiledata?.name} disabled={edit?false:true} onChange={(e)=>setProfiledata({...profiledata,["name"]:e.target.value})}/></span>
            <span className={`flex ${edit ? 'flex-col gap-2' : 'flex-row'}`}><p className="font-bold pr-2">Email</p><input className={`${edit?'border-2 border-black':'border-none'}`}  type="email" value={profiledata?.email} disabled={edit?false:true} onChange={(e)=>setProfiledata({...profiledata,["email"]:e.target.value})}/></span>
            <span className={`flex ${edit ? 'flex-col gap-2' : 'flex-row'}`}><p className="font-bold pr-2">Roll No</p><input className={`${edit?'border-2 border-black':'border-none'}`}  type="text" value={profiledata?.rollno} disabled={edit?false:true} onChange={(e)=>setProfiledata({...profiledata,["rollno"]:e.target.value})}/></span>
            <span className={`flex ${edit ? 'flex-col gap-2' : 'flex-row'}`}><p className="font-bold pr-2">Branch</p> <select id="branchselect" disabled={edit?false:true} name="branch" onChange={(e)=>setProfiledata({...profiledata,["branch"]:e.target.value})} value={profiledata?.branch}className={`${edit?'border-2 border-black':'border-none'} px-2 py-1`}>
                <option value="" disabled>
                select Branch
                </option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="IT">IT</option>
                <option value="EEE">EEE</option>
                <option value="CIVIL">CIVIL</option>
                <option value="MECH">MECH</option>
            </select></span>
            <span className={`flex ${edit ? 'flex-col gap-2' : 'flex-row'}`}><p className="font-bold pr-2">Year</p>  <select id="yearselect" disabled={edit?false:true}  name="year" onChange={(e)=>setProfiledata({...profiledata,["year"]:e.target.value})} value={profiledata?.year}className={`${edit?'border-2 border-black':'border-none'} px-2 py-1`}>
                              <option value="0" disabled>
                              select Year
                              </option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                          </select></span>
            <span className={`flex ${edit ? 'flex-col gap-2' : 'flex-row'}`}><p className="font-bold pr-2">Section</p><select id="sectionselect" disabled={edit?false:true} name="section"  onChange={(e)=>setProfiledata({...profiledata,["section"]:e.target.value})} value={profiledata?.section}className={`${edit?'border-2 border-black':'border-none'} px-2 py-1`}>
                              <option value="" disabled>
                              select Section
                              </option>
                              <option value="A">A</option>
                              <option value="B">B</option>
                              <option value="C">C</option>
                              <option value="D">D</option>
                              <option value="E">E</option>
                          </select><br/></span>
          </div>
        </div>
        <div className="flex justify-center ">
            {!edit ? <Button onClick={()=>setEdit(!edit)}>Edit Profile</Button>:<div className="flex gap-6">
              <Button color='white' className="border-2 border-black" onClick={()=>setEdit(!edit)}>Cancel</Button>
              <Button color="brown"  onClick={()=>{setEdit(!edit);handleUpdate();}}>Save</Button>
            </div>}
          </div>
      </form>
    </div>
  )
}

export default Profile