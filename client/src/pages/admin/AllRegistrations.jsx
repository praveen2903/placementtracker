import Sidebar from "../../Components/Sidebar"
import { Button,Card,CardHeader,Input, Typography} from "@material-tailwind/react"
import ReactPaginate from "react-paginate"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteRegister} from "../../redux/registerSlice";
import { MdDelete } from "react-icons/md";  
import { AiOutlineDelete } from "react-icons/ai";  
import { toast } from "react-toastify";
import {  BsFillPersonDashFill, BsFillPersonPlusFill } from "react-icons/bs";
import {  makeCoordinator } from "../../redux/adminSlice";
import { Link } from "react-router-dom";
import { getClubRegisters } from "../../redux/clubSlice";
// import { getClubRegisters } from "../../redux/registerSlice";
// import { toast } from "react-hot-toast";

function AllRegistrations() {
  const [yearFilter, setYearFilter] = useState("All");
  const [clubFilter, setClubFilter] = useState("All");
    const [branchFilter, setBranchFilter] = useState("All");
    const [studentFilter, setStudentFilter] = useState(false);
    const [coordinatorFilter, setCategoryFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10; // Number of products per page
    const dispatch=useDispatch();
    const[searchroll,setSearchroll]=useState("");
    // const dispatch = useDispatch();
    const registers= useSelector((state) => state.clubs.clubregisters);
    const handleCategoryChange = (e) => {
      setYearFilter(e.target.value);
    };
    const handleClubChange = (e) => {
      setClubFilter(e.target.value);
    };
  
    const handleBranchChange = (e) => {
      setBranchFilter(e.target.value);
    };
  
    const handleStudentChange = (e) => {
      setStudentFilter(e.target.checked);
    };
  
    const handleCoordinatorChange = (e) => {
      setCategoryFilter(e.target.checked);
    };
    const filteredProducts = registers?.filter((product) => {
      if(clubFilter!=="All" && product.club!==clubFilter)
       return false;
      if (yearFilter !== "All" && String(product.year) !== yearFilter)
        return false;
      if (branchFilter !== "All" && product.branch!==branchFilter)
        return false;
      if (studentFilter && product.category!=="Student") return false;
      if (coordinatorFilter && product.category!=="Coordinator") return false;
      return true;
    });
     // Calculate the number of pages
      const totalPages = Math.ceil(filteredProducts?.length / perPage);

      // Function to handle page change
      const handlePageChange = (selectedPage) => {
          setCurrentPage(selectedPage.selected + 1);
      };

      // Get the products for the current page
      const currentProducts = filteredProducts?.slice(
          (currentPage - 1) * perPage,
          currentPage * perPage
      );
      const handleSearch=(roll)=>{
        setSearchroll(roll);
    }
    useEffect(()=>{
      const fetchData=async()=>{
          await dispatch(getClubRegisters());
      }
      fetchData();
    },[dispatch]);
    // const handleDeleteregister=async(rollno)=>{
    //     try{
    //        await dispatch(deleteRegister(rollno));
    //        await dispatch(getClubRegisters());
    //        toast.success("Unrgister succesfully");
    //     }catch(err){
    //         toast.error("Registration not deleted succesfully");
    //     }
    // }
    const handleDelete=async(rollno)=>{
      try{
         await dispatch(deleteRegister(rollno));
         await dispatch(getClubRegisters());
         toast.success("Unregister succesfully");
      }catch(err){
          toast.error("Registration not deleted succesfully");
      }
  }
  const handleUpdate=async(category,rollno)=>{
    let newCategory="";
    const roll=rollno;
    if(category==="Student"){
      newCategory="Coordinator";
    }else{
      newCategory="Student";
    }
    await dispatch(makeCoordinator({newCategory,roll}));
    await dispatch(getClubRegisters());
  }
  return (
    <div>
      <Sidebar/>
      <div className="lg:pt-5 lg:pl-72 pt-5">
            <div>
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8 sm:flex-row flex-col">
                      <div className="text-center sm:text-left">
                        <Typography variant="h5" color="brown-gray">
                          Registrations List
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal" >
                          See Information about all Registartions.
                        </Typography>
                      </div>
                      <div className="flex flex-row gap-2 ">
                        <Button variant="outlined" color="brown" size="sm" >
                          view all
                        </Button>
                        <Button className="flex gap-2" color="brown" size="sm" >
                          <MdDelete size="15"/>
                          Delete All
                        </Button>
                      </div>
                    </div>
              </CardHeader>
            </div>
        <div className='flex flex-col lg:flex-row justify-between mb-5 items-center '>
            <div className=" flex items-center mb-3 md:mb-0 flex-col gap-3 ">
                    <div className="">
                      <label htmlFor="yearFilter" className="mr-2">
                      Year:
                      </label>
                      <select
                      id="yearFilter"
                      className="px-2 py-2 border rounded-md"
                      value={yearFilter}
                      onChange={handleCategoryChange}
                      >
                      <option value="All">All</option>
                      <option value="1">FirstYear</option>
                      <option value="2">SecondYear</option>
                      <option value="3">ThirdYear</option>
                      <option value="4">FourthYear</option>
                      {/* Add more categories here */}
                      </select>
                    </div>
                   <div>
                    <label htmlFor="yearFilter" className="mr-2">
                      Club:
                      </label>
                      <select
                      id="yearFilter"
                      className="px-2 py-2 border rounded-md"
                      value={clubFilter}
                      onChange={handleClubChange}
                      >
                      <option value="All">All</option>
                      <option value="DANCE">Dance</option>
                      <option value="MUSIC">Music</option>
                      <option value="COOKING">Theater</option>
                      <option value="TECH">Technical</option>
                      {/* Add more categories here */}
                      </select>
                   </div>

                    <div>
                      <label htmlFor="branchFilter" className=" mr-1">
                      Branch
                      </label>
                      <select
                      id="branchFilter"
                      className="px-2 py-2 border rounded-md"
                      value={branchFilter}
                      onChange={handleBranchChange}
                      >
                      <option value="All">All</option>
                      <option value="CSE">CSE</option>
                      <option value="IT">IT</option>
                      <option value="ECE">ECE</option>
                      <option value="EEE">EEE</option>
                      <option value="MECH">MECH</option>
                      {/* Add more price options here */}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="studentFilter" className="ml-4 mr-2">
                      Students
                      </label>
                      <input
                      type="checkbox"
                      id="studentFilter"
                      checked={studentFilter}
                      onChange={handleStudentChange}
                      />&nbsp;&nbsp;
                      <label htmlFor="coordinatorFilter" className="lg:ml-4 mr-2 mt-5 lg:mt-0">
                      Coordinators
                      </label>
                      <input
                      className="mt-5 lg:mt-0"
                      type="checkbox"
                      id="coordinatorFilter"
                      checked={coordinatorFilter}
                      onChange={handleCoordinatorChange}
                      />
                    </div>
            </div>
             <div className="relative flex w-fit md:w-max sm:mr-5 ">
                <Input
                    type="search"
                    label="Type Rollno..."
                    className="pr-24 "
                    onChange={(e)=>handleSearch(e.target.value)}
                    containerProps={{
                    className: "min-w-[288px]",
                    }}
                />
                <Button size="sm" className="!absolute right-1 top-1 rounded bg-brown-600">
                    Search
                </Button>
            </div>
        </div>
       <Card className="overflow-x-auto mx-3">
        <table className="w-full border-collapse">
                <thead>
                <tr className="bg-primary text-secondary">
                    <th className="px-4 py-2">Profile</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">Year</th>
                    <th className="px-4 py-2">Branch</th>
                    <th className="px-4 py-2">RollNo</th>
                    <th className="px-4 py-2">Section</th>
                    <th className="px-4 py-2">Add Coordinator</th>
                    <th className="px-4 py-2">Delete</th>
                </tr>
                </thead>
                <tbody>
                {currentProducts?.filter((item)=>item.roll===searchroll).map((product) => (
                    
                    <tr key={product._id} className='bg-brown-200 font-bold'>
                    <td className="border-none text-center px-4 py-2"><Link to={`${product.roll}/profile`}><img className="rounded-full w-10 h-10 mx-auto"src={product.userimage}/></Link></td>
                    <td className="border-none text-center px-4 py-2">
                        {product.name}
                    </td>
                    <td className="border-none text-center px-4 py-2">{product.category}</td>
                    <td className="border-none text-center px-4 py-2">{product.year}</td>
                    <td className="border-none text-center px-4 py-2">{product.branch}</td>
                    <td className="border-none text-center px-4 py-2">{product.roll}</td>
                    <td className="border-none text-center px-4 py-2">{product.section}</td>
                    <td className="border text-center px-4 py-2"><div className="w-fit mx-auto cursor-pointer">{product.category==="Student"?<BsFillPersonPlusFill size={20} onClick={()=>handleUpdate(product.category,product.roll)}/>:<BsFillPersonDashFill size={20} onClick={()=>handleUpdate(product.category,product.roll)}/>}</div></td>
                    <td className="border text-center px-4 py-2 "><AiOutlineDelete color="red" size={20} onClick={()=>handleDelete(product.roll)} className="cursor-pointer"/></td>
                    </tr>
                ))}
                {currentProducts?.map((product) => (
                    
                    <tr key={product.id}>
                    <td className="border text-center px-4 py-2"><Link to={`${product.roll}/profile`}><img className="rounded-full w-10 h-10 mx-auto"src={product.userimage}/></Link></td>
                    <td className="border text-center px-4 py-2">
                        {product.name}
                    </td>
                    <td className="border text-center px-4 py-2">{product.category}</td>
                    <td className="border text-center px-4 py-2">{product.year}</td>
                    <td className="border text-center px-4 py-2">{product.branch}</td>
                    <td className="border text-center px-4 py-2">{product.roll}</td>
                    <td className="border text-center px-4 py-2">{product.section}</td>
                    <td className="border text-center px-4 py-2"><div className="w-fit mx-auto cursor-pointer">{product.category==="Student"?<BsFillPersonPlusFill size={20} onClick={()=>handleUpdate(product.category,product.roll)}/>:<BsFillPersonDashFill size={20} onClick={()=>handleUpdate(product.category,product.roll)}/>}</div></td>
                    <td className="border text-center px-4 py-2 "><AiOutlineDelete color="red" size={20} onClick={()=>handleDelete(product.roll)} className="cursor-pointer"/></td>
                    </tr>
                ))}
                </tbody>
            </table>
       </Card>

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
    </div>  )
}

export default AllRegistrations