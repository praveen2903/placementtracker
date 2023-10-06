import Sidebar from '../../Components/Sidebar'
import { BsRocket, BsWindowSidebar } from 'react-icons/bs'
import PieCharts from './PieCharts';
import BarCharts from './BarCharts';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getClubs } from '../../redux/clubSlice';
import { getEvents } from '../../redux/eventSlice';
import { getRegisters } from '../../redux/registerSlice';
import { useLocation } from 'react-router-dom';

function Welcome() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  //pie chart
  const clubscount=useSelector((state)=>state.clubs.clubs).length;
  const eventscount=useSelector((state)=>state.events.events).length;
  const registerscount=useSelector((state)=>state.register.registers).length;
  const dispatch=useDispatch();
  //bar chart
  useEffect(()=>{
    const fetchdata=async()=>{
      await dispatch(getClubs());
      await dispatch(getEvents());
      await dispatch(getRegisters());
      console.log(clubscount);
    }
    fetchdata();
  },[dispatch])

  return (
    <div>
        <Sidebar/>
        <div className='pt-10 lg:pl-80'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto gap-3 lg:gap-5 px-10'>
            <div className="box cursor-pointer transition ease-in-out delay-150 md:hover:-translate-y-1 md:hover:scale-105 flex justify-center items-center flex-col bg-brown-200 h-48 rounded-lg lg:h-40 ">
              <BsRocket className='scale-150'/>
              <span className='pt-6 flex flex-col gap-3'>
                <h1>Departments</h1>
                <p className='mx-auto font-bold'>{clubscount}</p>
              </span>
            </div>
            <div className="box cursor-pointer transition ease-in-out delay-150 md:hover:-translate-y-1 md:hover:scale-105 flex justify-center items-center flex-col bg-brown-200 h-48 rounded-lg lg:h-40 ">
              <BsRocket className='scale-150'/>
              <span className='pt-6 flex flex-col gap-3'>
                <h1>Companies</h1>
                <p className='mx-auto font-bold'>{eventscount}</p>
              </span>
            </div>
            <div className="box cursor-pointer transition ease-in-out delay-150 md:hover:-translate-y-1 md:hover:scale-105 flex justify-center items-center flex-col bg-brown-200 h-48 rounded-lg lg:h-40 ">
              <BsRocket className='scale-150'/>
              <span className='pt-6 flex flex-col gap-3'>
                <h1>Department Drive Registers</h1>
                <p className='mx-auto font-bold'>{registerscount}</p>
              </span>
            </div>
          </div>
          <div className='mt-16 flex flex-col '>
            <div>
                <PieCharts/>
            </div>
            <div>
              <BarCharts/>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Welcome