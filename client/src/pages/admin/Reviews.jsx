import { useEffect } from 'react';
import Sidebar from '../../Components/Sidebar';
import { useDispatch, useSelector } from "react-redux";
import { deleteReviews, getReviews } from '../../redux/adminSlice';
import {MdDelete} from 'react-icons/md'
function Reviews() {
  const dispatch=useDispatch();
  const messages=useSelector((state)=>state.admin.reviews);
  useEffect(()=>{
    const fetchData=async()=>{
        await dispatch(getReviews());
    }
    fetchData();
  },[dispatch]);
  const handleDeletereview=async(id)=>{
    await dispatch(deleteReviews(id));
    dispatch(getReviews());
  }
  return (
    <div>
      <Sidebar/>
      <div className='pt-10 lg:pl-80 mx-auto flex flex-wrap'>
        {messages.map((item,index)=>(
          <div key={index} className='box shadow-2xl mx-3 px-10 py-10 flex flex-col gap-3 w-fit'>
            <div className='font-bold flex items-center gap-5 '><p>{item.email}</p><span className='cursor-pointer'><MdDelete onClick={()=>handleDeletereview(item._id)} size={20}/></span></div>
            <div className='flex flex-col'>
                <h1>{item.name}</h1>
                <h1>{item.senderroll}</h1>
                <h1>{item.text}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Reviews