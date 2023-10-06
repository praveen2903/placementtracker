import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../config/url";
const token = localStorage.getItem("token");
const userInfo=localStorage.getItem("userInfo");
const initialState = {
  userInfo: userInfo ? JSON.parse(userInfo) : null,  
  token: token,
  loading: false,
  error: null,
};

// Async thunk action to handle user login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`,{
        data,
    });
      return response.data;
    } catch (error) {
      throw new Error(error.message);

    }
  }
);
export const resetPassword=createAsyncThunk(
  "api/resetpassword",
  async({password,id,token})=>{
    try{
      const res=await axios.patch(`${BASE_URL}/api/auth/resetpassword/${id}/${token}`,{password});
      return res.data;
    }catch(err){
      console.log(err.message);
    }
  }
)
export const forgotPassword=createAsyncThunk(
  "api/forgotpassword",
  async({email})=>{
    console.log("email",email);
    try{
      const res=await axios.post(`${BASE_URL}/api/auth/forgotpassword`,{email});
      return res.data;
    }catch(err){
      console.log(err.message);
    }
  }
)
export const updateRegister=createAsyncThunk(
  "api/updateRegister",
  async(payload)=>{
    console.log("payload",payload);
    try{
      const response=await axios.patch(`${BASE_URL}/api/auth/profile`,payload,{
        headers:{
          "Content-Type":"multipart/form-data",
          Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
      });
      const{user,message}=response.data;
      toast.success(message);
      localStorage.setItem("userInfo",JSON.stringify(user));
    }catch(err){
      throw new Error(err.message);
    }
  }
)
// Async thunk action to handle user signup
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (payload, { rejectWithValue }) => {
    try {
      console.log("Payload in frontend : ", payload);
      const response = await axios.post(`${BASE_URL}/api/auth/signup`, payload,{
        headers:{
          "Content-Type":"multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log("error",error);
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Async thunk action to handle user logout
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  // Clearing local storage and reset the state
  localStorage.removeItem("userInfo");
  localStorage.removeItem("token");
  return null;
});

// Redux slice for auth state
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const { user,token } = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(user));
        localStorage.setItem("token", token);
        state.userInfo = user;
        state.token =token;
        toast.success("Login successful!");
      
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error("Login failed!");
      });

    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state,action) => {
        state.loading = false;
        const { user, token } = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(user));
        localStorage.setItem("token", token);
        state.userInfo = user;
        state.token = token;
        toast.success("Signup successful!");
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error("Signup failed!");
      });
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state,action) => {
        state.loading = false;
        const {message} = action.payload;
        toast.success(message);
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        const {message} = action.payload;
        toast.error(message);
      });
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state,action) => {
        state.loading = false;
        const {message} = action.payload;
        toast.success(message);
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        const {message} = action.payload;
        toast.error(message);
      });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.userInfo = null;
      state.token = null;
      toast.success("Logout successful!");
    });
  },
});

export default authSlice.reducer;