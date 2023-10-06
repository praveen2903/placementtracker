import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import {deleteEvent, getEvents} from '../../redux/eventSlice'
import Sidebar from "../../Components/Sidebar"
import { Avatar, Button, Card, CardHeader, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { BiSolidAddToQueue, BiSolidEditAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Rings } from "react-loader-spinner";
import { MdDelete } from "react-icons/md";
import { getRegisters } from "../../redux/registerSlice";

function AllEvents() {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5; // Number of products per page]
  const events=useSelector((state)=>state.events.events);
  const loading=useSelector((state)=>state.events.loading);
  const dispatch=useDispatch();
  useEffect(()=>{
    const fetchEvents=async()=>{
      await dispatch(getEvents());
    };
    fetchEvents();
  },[dispatch])
        // Function to handle page change
  const handlePageChange = (selectedPage) => {
      setCurrentPage(selectedPage.selected + 1);
  };
  const handleDelete=async(id)=>{
    await dispatch(deleteEvent(id));
    await dispatch(getEvents());
  }

  const TABLE_HEAD = ["EventImage", "ClubName", "Eventname", "Edit","Delete"];
  
  const totalPages = Math.ceil(events?.length / perPage);
  const currentProducts = events?.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
);
if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <Rings
        height="80"
        width="80"
        color="#21BF73"
        radius="10"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />
    </div>
  );
}
  return (
    <div>
      <Sidebar/>
      <div className="pt-10 lg:pl-80 lg:mr-32">
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8 flex-col sm:flex-row">
              <div>
                <Typography variant="h5" color="brown-gray">
                  Events List
                </Typography>
                <Typography color="gray" className="mt-1 font-normal" >
                  See Information about all events.
                </Typography>
              </div>
              <div className="flex  flex-row gap-2 shrink-0">
                <Button variant="outlined" color="brown" size="sm" >
                  view all
                </Button>
                <Button className="flex gap-2" color="brown" size="sm" >
                    <Link to='/admin/addEvent'>
                      <div  className="flex gap-2">
                        <BiSolidAddToQueue/>
                        Add Event
                      </div>
                    </Link>
                </Button>
              </div>
            </div>
          </CardHeader>
          <div className="overflow-x-auto mx-2 sm:mx-0">
            <table className="w-full min-w-max table-auto text-left ">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentProducts.map(({_id,eventimage,eventname,clubname }, index) => {
                  const isLast = index === events.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
      
                  return (
                    <tr key={eventname}>
                      <td className={classes}>
                        <Link to={`/${clubname}`}><Avatar src={eventimage} alt={eventname} size="sm" /></Link>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {clubname}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {eventname}
                        </Typography>
                      </td>
                      {/* <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {working?"True":"False"}
                        </Typography>
                      </td> */}
                      <td className={classes}>
                        <Link to={`/admin/updateEvent/${eventname}`}>
                          <BiSolidEditAlt size={22}/>
                        </Link>
                      </td>
                      <td className={classes}>
                        <MdDelete size={20} color="red" className="cursor-pointer" onClick={()=>handleDelete(_id)}/>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            onPageChange={handlePageChange}
            containerClassName="flex mt-4 justify-center"
            previousLabel="Previous"
            nextLabel="Next"
            breakLabel="..."
            activeClassName="text-primary"
            disabledClassName="text-gray-500 cursor-not-allowed"
            pageClassName="px-2 cursor-pointer"
            previousClassName="px-2 cursor-pointer"
            nextClassName="px-2 cursor-pointer"
            breakClassName="px-2"
      />
    </div>)
}
export default AllEvents