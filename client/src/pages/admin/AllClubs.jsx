import { BiSolidAddToQueue, BiSolidEditAlt } from "react-icons/bi";
import Sidebar from "../../Components/Sidebar"
import { Avatar, Button, Card, CardHeader, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { deleteClub, getClubs } from "../../redux/clubSlice";
import { getRegisters } from "../../redux/registerSlice";
import { Link } from "react-router-dom";
import { Rings } from "react-loader-spinner";
import { MdDelete } from "react-icons/md";
function AllClubs() {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5; // Number of products per page
  const dispatch=useDispatch();
  const clubs=useSelector((state)=>state.clubs.clubs);
  const registers= useSelector((state) => state.register.registers);
  const loading= useSelector((state) => state.clubs.load);
  useEffect(()=>{
    const fetchClubs=async()=>{
      await dispatch(getClubs());
      await dispatch(getRegisters());
      console.log("registers",registers);
    };
    fetchClubs();
  },[dispatch])
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Rings
          height="80"
          width="80"
          color="#21BF73"
          radius="6"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="rings-loading"
        />
      </div>
    );
 }
  const handleDelete=async(id)=>{
    console.log("id",id);
    await dispatch(deleteClub(id));
    await dispatch(getClubs());
  }
        // Function to handle page change
  const handlePageChange = (selectedPage) => {
      setCurrentPage(selectedPage.selected + 1);
  };
  const TABLE_HEAD = ["Image", "Name", "Working", "Edit","Delete"];
  
  const totalPages = Math.ceil(clubs?.length / perPage);
  const currentProducts = clubs?.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
);
  return (
    <div>
      <Sidebar/>
      <div className="pt-5 lg:pl-80 lg:mr-32">
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8 flex-col sm:flex-row">
              <div >
                <Typography variant="h5" color="brown-gray">
                  Department List
                </Typography>
                <Typography color="gray" className="mt-1 font-normal" >
                  See Information about all Departments.
                </Typography>
              </div>
              <div className="flex flex-row gap-2 shrink-0">
                <Button variant="outlined" color="brown" size="sm" >
                  view all
                </Button>
                <Button color="brown" size="sm" >
                  <Link to='/admin/addClub'>
                    <div  className="flex gap-2">
                      <BiSolidAddToQueue/>
                      Add Department
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
                {currentProducts.map((item, index) => {
                  const isLast = index === clubs.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
      
                  return (
                    <tr key={name}>
                      <td className={classes}>
                        <Link to={`/${item.name}`}><Avatar src={item.image} alt={name} size="sm" /></Link>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {item.name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {registers.filter((itm)=>itm.club===item.name).length===0?"False":"True"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Link to={`/admin/updateClub/${item.name}`}>
                          <BiSolidEditAlt size={22}/>
                        </Link>
                      </td>
                      <td className={classes}>
                        <MdDelete size={20} color="red" className="cursor-pointer" onClick={()=>handleDelete(item._id)}/>
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
      </div>
  )
}

export default AllClubs