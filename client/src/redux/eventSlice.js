import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config/url";
import { toast } from "react-toastify";

export const getEvents=createAsyncThunk("api/getEvents",async()=>{
    try{
        const result=await axios.get(`${BASE_URL}/api/events/all`);
        return result.data;
    }catch(err){
        console.log(err);
    }    
})
export const deleteEvent=createAsyncThunk("api/deleteEvent",async(id)=>{
    try{
        const result=await axios.delete(`${BASE_URL}/api/admin/deleteEvent/${id}`,
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        toast.success(result.message);

    }catch(err){
        toast.error("Event not deleted");
    }
})

export const updateEvent=createAsyncThunk("api/updateEvent",async({id,club,name,eventdate,image,desc})=>{
    try{
        console.log(image);
        const res=await axios.patch(`${BASE_URL}/api/admin/updateEvent`,{
            id,
            club,
            name,
            eventdate,
            image,
            desc,
        },{
            headers:{
                "Content-Type":"multipart/form-data",
                Authorization:`Bearer ${localStorage.getItem("token")}`,
            }
        });
        toast.success(res.data.message);
    }catch(err){
        console.log(err);
    }
})
export const addEvent=createAsyncThunk("api/addEvent",async({club,name,eventdate,image,desc,cgpa,companyurl})=>{
    try{
        const result=await axios.post(`${BASE_URL}/api/admin/addEvent`,{
            club,
            name,
            eventdate,
            image,
            cgpa,
            desc,
            companyurl,
        },{
            headers:{
              "Content-Type":"multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return result.data;
    }catch(err){
        toast.error(err.message);
    }
})
const eventSlice=createSlice({
    name:"events",
    initialState:{
        events:[],
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getEvents.pending,(state)=>{
            state.loading=true;
        }).addCase(getEvents.fulfilled,(state,{payload})=>{
            state.loading=false;
            state.events=payload.events;
        }).addCase(getEvents.rejected,(state)=>{
            state.loading=false;
            toast.error("Unable to get Companies");
        })
        builder
        .addCase(addEvent.pending,(state)=>{
            state.loading=true;
        }).addCase(addEvent.fulfilled,(state,{payload})=>{
            state.loading=false;
            toast.success(payload.message);
        }).addCase(addEvent.rejected,(state)=>{
            state.loading=false;
            toast.error("Company not uploaded");
        })
    }
})
export default eventSlice.reducer;