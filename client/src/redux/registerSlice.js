import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config/url";
import { toast } from "react-toastify";
export const checkVerify=createAsyncThunk(
  "api/addDoc",
  async (payload)=>{
    const res=await axios.post(`${BASE_URL}/api/verify/${payload.rollno}`,payload,{
      headers: {
        "Content-Type":"multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.data.error) {
      throw new Error(res.data.message);
    }
    
    return res.data;


  }
)

export const getDocs=createAsyncThunk(
  "api/getDocs",
  async()=>{
    const res=await axios.get(`${BASE_URL}/api/verify/`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
)
export const addRegister = createAsyncThunk(
    "api/addRegister",
    async (payload) => {
      console.log("payload",payload);
        const response = await axios.post(`${BASE_URL}/api/events/register`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.error) {
          throw new Error(response.data.message);
        }
        return response.data;
    }
      // } catch (error) {
      //   // if (!error?.response) {
      //   //   throw error;
      //   // }
      //   // return rejectWithValue(error?.response?.data);
      // }
  );
export const deleteRegister=createAsyncThunk("api/deleteRegister",async(rollno)=>{
  try{
      await axios.delete(`${BASE_URL}/api/events/registration/delete/${rollno}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }catch(error){
    console.log(error);
  }
  
});

export const getRegisters=createAsyncThunk("api/getRegisters",async()=>{
  try{
    const response=await axios.get(`${BASE_URL}/api/events/register/all`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  }catch(err){
    console.log(err);
  }
})

  const registerSlice=createSlice({
    name:"registration",
    initialState:{
        registers:[],
        docs:[],
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(addRegister.pending, (state) => {
            state.loading = true;
          })
          .addCase(addRegister.fulfilled, (state) => {
            state.loading = false;
            toast.success("Register successfully");
          })
          .addCase(addRegister.rejected, (state,{error}) => {
            state.loading = false;
            toast.error(error.message);
          });
        builder
        .addCase(getRegisters.pending, (state) => {
            state.loading = true;
          })
          .addCase(getRegisters.fulfilled, (state, { payload }) => {
            state.loading = false;
            const {registers}=payload;
            state.registers = registers;
          })
          .addCase(getRegisters.rejected, (state, { payload }) => {
            state.loading = false;
            toast.error(payload.message);
          });
        builder
        .addCase(getDocs.pending, (state) => {
            state.loading = true;
          })
          .addCase(getDocs.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.docs = payload;
          })
          .addCase(getDocs.rejected, (state, { payload }) => {
            state.loading = false;
            toast.error(payload.message);
          });
          builder.addCase(deleteRegister.fulfilled, (state) => {
            state.registerInfo = null;
            toast.success("register delete successful!");
          });
        builder
        .addCase(checkVerify.pending, (state) => {
            state.loading = true;
          })
          .addCase(checkVerify.fulfilled, (state, { payload }) => {
            state.loading = false;
            toast.success(payload.message);
          })
          .addCase(checkVerify.rejected, (state, { error }) => {
            state.loading = false;
            toast.error(error.message);
          });
         
    }
    });
    export default registerSlice.reducer;