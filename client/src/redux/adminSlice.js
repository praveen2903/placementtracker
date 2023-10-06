import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'
import { BASE_URL } from "../config/url";
import { toast } from "react-toastify";
export const addAdmin=createAsyncThunk(
    "api/addAdmin",
    async(data)=>{
        try{
            console.log(data);
            const res=await axios.post(`${BASE_URL}/api/admin/addAdmin`,data,{
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })
            return res.data;
        }catch(error){
            throw new Error(error.message);
        }
    }
);

export const getReviews=createAsyncThunk(
    "api/getReviews",
    async()=>{
        try{
            const res=await axios.get(`${BASE_URL}/api/msgs/messages`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
            })
            console.log(res.data);
            return res.data;
        }catch(error){
            throw new Error(error.message);
        }
    }
)
export const makeRunner=createAsyncThunk(
    "api/makeRunner",
    async({rollno,runner})=>{
        try{
            const res=await axios.patch(`${BASE_URL}/api/events/register/update/runner/${rollno}`,{
                isRunner:!runner,
            },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`,
                },
            });
            return res.data;
        }catch(err){
            throw new Error(err);
        }
    }
)
//createAsyncThunk(name,async function);
export const makeWinner=createAsyncThunk(
    "api/makewinner",
    async({rollno,winner})=>{
        console.log("roll and winner",rollno,winner);
        try{
            const res=await axios.patch(`${BASE_URL}/api/events/register/update/winner/${rollno}`,{
                isWinner:!winner,
            },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`,
                },
            });
            return res.data;
        }catch(err){
            throw new Error(err);
        }
    }
)
export const makeCoordinator=createAsyncThunk(
    "api/makeCoordinator",
    async({newCategory,roll})=>{
        try{
            const res=await axios.patch(`${BASE_URL}/api/clubs/registers/update/${roll}`,{
                category:newCategory,
            },{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
            });
            return res.data;
        }catch(err){
            throw new Error(err);
        }
    }
)
export const deleteReviews=createAsyncThunk(
    "api/deleteReviews",
    async(id)=>{
        try{
            const res=await axios.delete(`${BASE_URL}/api/msgs/remove/${id}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
            })
            return res.data;
        }catch(error){
            throw new Error(error.message);
        }
    }
)
//createSlice(name,state,reducers,extrareducers)
const adminSlice=createSlice({
    name:"admin",
    initialState:{
        admins:[],
        reviews:[],
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(addAdmin.pending,(state)=>{
            state.loading=true;
        }).addCase(addAdmin.fulfilled,()=>{
            toast.success("admin added succesfully");
        }).addCase(addAdmin.rejected,()=>{
            toast.error("Add admin failed");
        });
        builder
        .addCase(getReviews.pending,(state)=>{
            state.loading=true;
        }).addCase(getReviews.fulfilled,(state,action)=>{
            const {messages}=action.payload;
            state.reviews=messages;
        }).addCase(getReviews.rejected,()=>{
            toast.error("Getting Reviews failed");
        });
        builder
        .addCase(deleteReviews.pending,(state)=>{
            state.loading=true;
        }).addCase(deleteReviews.fulfilled,(state,action)=>{
            const {message}=action.payload;
            toast.success(message);
        }).addCase(deleteReviews.rejected,()=>{
            toast.error("delete review failed");
        });
        builder
        .addCase(makeCoordinator.pending,(state)=>{
            state.loading=true;
        }).addCase(makeCoordinator.fulfilled,(state,action)=>{
            const {message}=action.payload;
            toast.success(message);
        }).addCase(makeCoordinator.rejected,()=>{
            toast.error("make coordinator failed");
        });
        builder
        .addCase(makeWinner.pending,(state)=>{
            state.loading=true;
        }).addCase(makeWinner.fulfilled,(state,action)=>{
            const {message}=action.payload;
            toast.success(message);
        }).addCase(makeWinner.rejected,()=>{
            toast.error("He is already Runner");
        });
        builder
        .addCase(makeRunner.pending,(state)=>{
            state.loading=true;
        }).addCase(makeRunner.fulfilled,(state,action)=>{
            const {message}=action.payload;
            toast.success(message);
        }).addCase(makeRunner.rejected,()=>{
            toast.error("He is already winner");
        });
    }
})
export default adminSlice.reducer;