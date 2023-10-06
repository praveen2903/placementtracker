import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config/url";
import { toast } from "react-toastify";

export const getChats=createAsyncThunk("api/chats",async()=>{
    const result=await axios.get(`${BASE_URL}/api/chat/`,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
    });
    return result.data;
});
// export const sendChats=createAsyncThunk("api/sendChats",async(newMessage)=>{
//     console.log("client",newMessage);
//     await axios.post(`${BASE_URL}/api/chat/send`,newMessage,{
//         headers:{
//             Authorization:`Bearer ${localStorage.getItem("token")}`,
//         },
//     });
// })
const chatSlice=createSlice({
    name:"chats",
    initialState:{
        chatsdata:[],
        load:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getChats.pending, (state) => {
            state.load = true;
          })
        .addCase(getChats.fulfilled, (state, { payload }) => {
            state.load = false;
            state.chatsdata = payload;
        })
        .addCase(getChats.rejected, (state) => {
            state.load = false;
            toast.error("Network error!");
        });
    }

})
export default chatSlice.reducer;
