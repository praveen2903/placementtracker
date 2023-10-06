/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getRegisters } from '../redux/registerSlice';
import { Rings } from 'react-loader-spinner';
import { getClubRegisters, getClubs } from '../redux/clubSlice';
import ReactPaginate from 'react-paginate';
import { Button, Input,Card,CardHeader,CardBody,Typography, Rating, Switch, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import { getEvents } from '../redux/eventSlice';
import { makeRunner, makeWinner } from '../redux/adminSlice';
import gold from '../Images/gold-medal.png';
import silver from '../Images/silver-medal.png';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from '../Components/Footer';
import Team from '../Components/Team';
import Tutorials from '../Components/Tutorials';
import ClubRegistration from '../Components/ClubRegistration';
import moment from 'moment'
import CompanyRegister from '../Components/CompanyRegister';

function ClubScreen() {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    
    const [yearFilter, setYearFilter] = useState("All");
    const [branchFilter, setBranchFilter] = useState("All");
    const [studentFilter, setStudentFilter] = useState(false);
    const [coordinatorFilter, setCoordinatorFilter] = useState(false);

    const [registeropen, setRegisteropen] = useState(false);
    const [companyopen, setCompanyopen] = useState(false);
    const[company,setCompany]=useState("");

    const handleRegisterOpen=()=>{
      setRegisteropen(!registeropen);
    }
    const handleCompanyOpen=(company)=>{
      setCompany(company);
      setCompanyopen(!companyopen)
    }
   
 
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10; // Number of products per page
  
    const[searchroll,setSearchroll]=useState("");
    const navigate=useNavigate();
    const params=useParams();
    const{name}=params;
    const dispatch = useDispatch();
    const clubs=useSelector((state)=>state.clubs.clubs);
    const load=useSelector((state)=>state.clubs.loading);
    const loading = useSelector((state) => state.auth.loading);
    const userInfo = useSelector((state) => state.auth.userInfo);
    // const registerInfo = useSelector((state) => state.register.registerInfo);
    const registers= useSelector((state) => state.register.registers);
    const clubregisters= useSelector((state) => state.clubs.clubregisters);
    const events= useSelector((state) => state.events.events);
    
    useEffect(()=>{
        const fetchData=async()=>{
            console.log("user",userInfo);
            await dispatch(getClubs());
            await dispatch(getRegisters());
            await dispatch(getClubRegisters());
            await dispatch(getEvents());
        }
        fetchData();
   },[dispatch]);
  //  useEffect(()=>{
  //   findRegister();
  //  },[events])
   //Find the specific register of club .
  //  const findRegister =async() => {
  //   await dispatch(getRegisters());
  //   if (userInfo && registers.length>0) {
  //       const res =registers.find(register => register.roll === userInfo.rollno && register.club === name);
        
  //       // Check if a matching register object was found
  //       if (res) {
  //           setRegisterInfo(res);
  //       } else {
  //           // Handle the case where no matching register was found
  //           console.log("No matching register found.");
  //           setRegisterInfo(null);
  //       }
  //     }
  //   }

    const handleCategoryChange = (e) => {
        setYearFilter(e.target.value);
      };
    
      const handleBranchChange = (e) => {
        setBranchFilter(e.target.value);
      };
    
      const handleStudentChange = (e) => {
        setStudentFilter(e.target.checked);
      };
    
      const handleCoordinatorChange = (e) => {
        setCoordinatorFilter(e.target.checked);
      };
      const filteredProducts = registers?.filter((product) => {
        if(product.club!==name)return false;
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

    //fetch clubs and registers
  
  
    // const handleSelected=(rollno)=>{
    //      setSelectedRegisteredroll((prevRegistration) => (prevRegistration === rollno ? null : rollno));
    // }
    const handleSearch=(roll)=>{
        setSearchroll(roll);
    }
   
    const handleWinner=async(rollno,winner)=>{
        await dispatch(makeWinner({rollno,winner}));
        await dispatch(getRegisters());
    }
    const handleRunner=async(rollno,runner)=>{
        await dispatch(makeRunner({rollno,runner}));
        await dispatch(getRegisters());
    }
    
    if (loading || load) {
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
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // responsive: [
        //   {
        //     breakpoint:1024,
        //     settings: {
        //       slidesToShow: 3,
        //     },
        //   },
        //   {
        //     breakpoint: 768,
        //     settings: {
        //       slidesToShow: 2,
        //     },
        //   },
        //   {
        //     breakpoint: 480,
        //     settings: {
        //       slidesToShow: 1,
        //     },
        //   },
        // ],
      };
  return (
    <div className='lg:pt-24 pt-8 bg-[#fff3e0]'>
        {clubs && clubs.filter((item)=>item.name===name).map((item,index)=>(
            <div key={index} className='mb-3'>
                <Card className="flex sm:flex-row w-full mt-12  " >
                <CardHeader shadow={false} floated={false} className="sm:w-1/4 shrink-0  rounded-r-none">
                <img 
                    src={item.image} 
                    alt="image" 
                    className="w-full h-full object-fill"
                />
                </CardHeader>
                <CardBody>
                <div className='flex justify-between'>
                    <Typography variant="h6" color="blue" className="uppercase mb-4">{item.name}</Typography>
                    <Rating unratedColor="blue" ratedColor="blue" />

                </div>
                <Typography variant="h4" color="blue-gray" className="mb-2">
                    Welcome to {name} Department
                </Typography>
                <Typography color="gray" className="font-normal mb-8">
                    {item.desc}
                </Typography>
                  <Button onClick={handleRegisterOpen} variant="text" className="flex items-center gap-2 bg-light-blue-100">
                    Register
                  </Button>
                </CardBody>
                </Card>
            </div>
        ))} 
        <Dialog
          size="xs"
          open={registeropen}
          handler={handleRegisterOpen}
          className="bg-white shadow-none"
        >
          <ClubRegistration value={handleRegisterOpen} club={name}/>
        </Dialog>
        {events.filter((item)=>item.clubname===name).length>0 && 
        <Slider {...settings} className='mx-8 '>
        {events.filter((item)=>item.clubname===name).map((event,index)=>(
            <div key={index} className=' mt-16 h-fit'>
                <Card className='shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-0 lg:py-20 py-5'>
                    <div className=' flex items-center justify-center flex-col  '>
                      <img src={event.eventimage} alt='company' className=' rounded-lg h-52 lg:h-fit '/>
                      <button className='bg-green-500 md:px-8 px-4 py-1 lg:py-2 text-white h-fit lg:mt-10 lg:font-bold 'onClick={()=>handleCompanyOpen(event.eventname)}>Register</button>
                    </div>
                    <div className='flex flex-col gap-3 px-10'>
                      <h1 className='font-bold text-lg'>Hey {userInfo.firstName}</h1>
                      <h1 className='font-bold'>Company: {event.eventname}</h1>
                      <div >
                        <h1 className='font-bold mb-2'>Job Description:</h1>
                        <h1 className='leading-loose hidden md:block mb-2'>{event.description}</h1>
                        <h1 className='font-bold mb-2'>DeadLine: {moment(event.eventdate).format("YYYY-MM-DD")}</h1>
                        <h1 className='font-bold'>CGPA {event.cgpa}</h1>
                      </div>
                    </div>
                </Card>
            </div>)
        )}
         <Dialog
          size="xs"
          open={companyopen}
          handler={handleCompanyOpen}
          className="bg-white shadow-none"
        >
          <CompanyRegister value={handleCompanyOpen} club={name} event={company}/>
        </Dialog>
        </Slider>}
       {userInfo &&  (userInfo.isAdmin || userInfo.category==="Coordinator") && <div>
       <h1 className='font-bold  text-2xl sm:text-3xl pt-10 text-center text-brown-700'>Event Registrations</h1>
        <div className='flex flex-col md:flex-row justify-between sm:mt-16 mt-10 mb-5 items-center gap-2 '>
            <div className=" flex items-center gap-3 md:mb-0 flex-wrap lg:mx-10 flex-col sm:flex-row ">
                  <div>
                    <label htmlFor="yearFilter" className="sm:mr-2">
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

                    <label htmlFor="branchFilter" className="ml-4 mr-2">
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
                    />

                    <label htmlFor="coordinatorFilter" className="ml-4 mr-2">
                    Coordinators
                    </label>
                    <input
                    type="checkbox"
                    id="coordinatorFilter"
                    checked={coordinatorFilter}
                    onChange={handleCoordinatorChange}
                    />
                  </div>
            </div>
             <div className="relative flex  md:w-max  justify-between ">
                <Input
                    color='brown'
                    type="search"
                    label="Type Rollno..."
                    className="pr-24 "
                    onChange={(e)=>handleSearch(e.target.value)}
                    containerProps={{
                    className: "md:min-w-[288px] ",
                    }}
                />
                <Button size="sm" className="!absolute right-1 top-1 rounded bg-brown-600">
                    Search
                </Button>
            </div>
        </div>
       <div className="overflow-x-auto lg:mx-10 bg-white mx-2">
        <table className="w-full border-collapse">
                <thead className='top-0 sticky'>
                <tr className="bg-primary text-secondary  ">
                    <th className="px-4 py-2">Image</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">EventName</th>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">Year</th>
                    <th className="px-4 py-2">Branch</th>
                    <th className="px-4 py-2">RollNo</th>
                    <th className="px-4 py-2">Placed</th>
                    <th className="px-4 py-2">NotPlaced</th>
                </tr>
                </thead>
                <tbody>
                {currentProducts?.filter((item)=>item.roll===searchroll).map((product) => (
                    
                    <tr key={product.id} className='bg-blue-gray-800 text-white'>
                    <td className="border text-center px-4 py-2"><Link to={`${product.roll}/profile`}><img className="rounded-full w-10 h-10 mx-auto"src={product.userimage}/></Link></td>
                    <td className="border text-center px-4 py-2">
                        {product.name}
                    </td>
                    <td className="border text-center px-4 py-2">
                        {product.event}
                    </td>
                    <td className="border text-center px-4 py-2">{product.category}</td>
                    <td className="border text-center px-4 py-2">{product.year}</td>
                    <td className="border text-center px-4 py-2">{product.branch}</td>
                    <td className="border text-center px-4 py-2">{product.roll}</td>
                    <td>{userInfo && (userInfo.isAdmin || userInfo.category==="Coordinator") && <div className="w-fit mx-auto cursor-pointer">{product.isWinner ? <img src={gold} className='w-10 h-10 object-cover'  onClick={()=>handleWinner(product.roll,product.isWinner)}/>:<Switch color='red' onClick={()=>handleWinner(product.roll,product.isWinner)}/>}</div>}</td>
                    <td>{userInfo && (userInfo.isAdmin || userInfo.category==="Coordinator")&& <div className="w-fit mx-auto cursor-pointer">{product.isRunner ? <img src={silver} className='w-10 h-10 object-cover'  onClick={()=>handleRunner(product.roll,product.isRunner)}/>:<Switch color='red' onClick={()=>handleRunner(product.roll,product.isRunner)}/>}</div>}</td>
                    </tr>
                ))}
                {currentProducts?.map((product) => (
                    
                    <tr key={product.id}>
                    <td className="border text-center px-4 py-2"><Link to={`${product.roll}/profile`}><img className="rounded-full w-10 h-10 mx-auto"src={product.userimage}/></Link></td>
                    <td className="border text-center px-4 py-2">
                        {product.name}
                    </td>
                    <td className="border text-center px-4 py-2">
                        {product.event}
                    </td>
                    <td className="border text-center px-4 py-2">{product.category}</td>
                    <td className="border text-center px-4 py-2">{product.year}</td>
                    <td className="border text-center px-4 py-2">{product.branch}</td>
                    <td className="border text-center px-4 py-2">{product.roll}</td>
                    <td>{userInfo && (userInfo.isAdmin || userInfo.category==="Coordinator") && <div className="w-fit mx-auto cursor-pointer">{product.isWinner ? <img src={gold} className='w-10 h-10 object-cover'  onClick={()=>handleWinner(product.roll,product.isWinner)}/>:<Switch color='red' onClick={()=>handleWinner(product.roll,product.isWinner)}/>}</div>}</td>
                    <td>{userInfo && (userInfo.isAdmin || userInfo.category==="Coordinator")&& <div className="w-fit mx-auto cursor-pointer">{product.isRunner ? <img src={silver} className='w-10 h-10 object-cover'  onClick={()=>handleRunner(product.roll,product.isRunner)}/>:<Switch color='red' onClick={()=>handleRunner(product.roll,product.isRunner)}/>}</div>}</td>
                    </tr>
                ))}
                </tbody>
            </table>
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
         </div>}
         {currentProducts.filter((item) => item.isWinner || item.isRunner).length > 0 && (
            <div className='my-16 mx-10 relative '>
                <h1 className='text-center text-3xl font-bold mb-16 text-brown-700'>Placement Results</h1>
                <Slider {...settings}>
                {currentProducts.filter((item) => item.isWinner || item.isRunner).map((item) => (
                  <div key={item.id} className='relative bg-white '>
                    <div className='bg-brown-900 h-full md:w-10 w-4 absolute top-0 left-0 transform -translate-x-1/2 '></div>
                    <div className='bg-brown-900 h-10 w-full absolute bottom-0 left-0 transform translate-y-1/2'></div>
                    <div className='w-3/4 lg:w-1/2 mx-auto mb-10 relative overflow-hidden'>
                      <div className=' bg-white rounded-lg lg:p-10 shadow-lg flex justify-between flex-col md:flex-row-reverse items-center'>
                        <div className='pt-5'>
                            <img src={item.userimage} alt='winorrun' className='w-60 h-60 object-cover rounded-full' />
                        </div>
                        <div className='mt-6'>                
                          <h1 className='text-2xl font-semibold pb-5'>{item.isWinner ? <span className='flex gap-2'>Placed <img src={gold} alt='gold' className='w-10 h-10 object-cover'/></span>:<span className='flex gap-2'>Not Placed <img src={silver} alt='silver' className='w-10 h-10 object-cover'/></span>}</h1>
                          <h1 className='text-xl font-semibold'>{item.name}</h1>
                          <p className='text-gray-600'>{item.roll}</p>
                          <p className='text-gray-600'>Year {item.year}</p>
                          <p className='text-gray-600'>Branch {item.branch}</p>
                          
                          <div className='mt-4'>
                            <Link to={`${item.roll}/profile`}>
                              <button className='px-4 py-2 bg-brown-900 text-white rounded-lg'>
                                View Profile
                              </button>
                            </Link>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
              <style>{`
                /* Left Arrow */
                .slick-prev:before {
                  color: #9C1137;
                }

                /* Right Arrow */
                .slick-next:before {
                  color: #9C1137;
                }
              `}</style>
            </div>
          )}
          {clubregisters.filter((item) => item.category === "Coordinator" && item.club === name).length > 0 && (
            <Team data={clubregisters.filter((item) => item.category === "Coordinator" && item.club === name)} />
          )}
          <Tutorials value={name}/>
         <Footer/>
        
    </div>
  )
}

export default ClubScreen