import { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar";
import axios from 'axios';
import { BASE_URL } from "../../config/url";

function Testimonial(){
    const[name,setName]=useState("");
    const[position,setPosition]=useState("");
    const[desc,setDesc]=useState("");
    const[image,setImage]=useState(null);
    const handleFileChange=(e)=>{
        setImage(e.target.files[0])
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        await axios.post(`${BASE_URL}/api/admin/addTestimonial`,{
            name,
            position,
            desc,
            image
        },{
            headers:{
              "Content-Type":"multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
    }
    
    return(
        <div>
            <Sidebar/>
            <div className="pl-96 pt-40">
                <form onSubmit={handleSubmit}>
                    Name:<input type="text" placeholder="Enter name" onChange={(e)=>setName(e.target.value)}/><br/>
                    Postion:<input type="text" placeholder="Enter position" onChange={(e)=>setPosition(e.target.value)}/><br/>
                    Desc:<input type="text" placeholder="Enterdescription" onChange={(e)=>setDesc(e.target.value)}/><br/>
                    Image:<input type="file" placeholder="Enterdescription" onChange={handleFileChange}/><br/>
                    <button className="bg-red-300 px-5">Add</button>
                </form>
            </div>
        </div>
    )
};
export default Testimonial;