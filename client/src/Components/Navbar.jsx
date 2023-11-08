import { useState } from 'react'
import small from '../Images/logo1.png';
import {TiThMenu} from 'react-icons/ti'
import {FcSearch} from 'react-icons/fc'
// import {BsSearchHeart} from 'react-icons/bs'
import {Link as Route, useNavigate } from 'react-router-dom';
import {Link} from 'react-scroll';
// import { HashLink } from 'react-router-hash-link';
import {motion} from 'framer-motion';
import {useDispatch, useSelector } from 'react-redux';
import {logoutUser} from '../redux/authSlice';
import { Badge, Avatar, Dialog, Button} from "@material-tailwind/react";
import { FiLogOut } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
// import { BsChatTextFill } from "react-icons/bs";
import Login from '../pages/Login';
function Navbar() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const[search,setSearch]=useState("");
    const userInfo = useSelector((state) => state.auth.userInfo);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleSignout=async()=>{
        await dispatch(logoutUser());
        navigate('/');
    }
    // bg-[#fff3e0]
    const handleSearch=()=>{
      navigate(`/${search}`);
      setSearch("");
    }
  return (
      <div className='shadow-md z-50 fixed top-0 left-0 flex justify-between py-2 sm:px-10 w-full px-2 backdrop-blur-md'>
        <div className='flex gap-3 items-center'>
            <div className='lg:hidden position:relative ml-2 md:ml-0'>
                {!isMenuOpen ? <TiThMenu color='brown'
                    className={`group ${isMenuOpen ? 'text-cyan-500' : 'text-gray-500'}`}
                    onClick={toggleMenu}
                />:<RxCross2 onClick={toggleMenu}/>}
                <ul
                    className={`${
                    isMenuOpen ? 'visible' : 'hidden'
                    } lg:hidden group-hover:visible absolute left-0 p-2 top-14 font-semibold z-50 flex flex-col gap-3 w-full bg-white `}
                >
                    <li className='cursor-pointer'>{userInfo && userInfo.isAdmin && <li><Route to='/dashboard'>Dashboard</Route></li>}</li>
                    <li className='cursor-pointer'>{userInfo && userInfo.category==="Coordinator" && <li><Route to='/placementresults'>Results</Route></li>}</li>
                    <li className='cursor-pointer '><Link smooth={true} duration={1000} to='#home'>Home</Link></li>
                    <li className='cursor-pointer'><Link smooth={true} duration={1000}  to='#about'>About</Link></li>
                    <li className='cursor-pointer'><Link smooth={true} duration={1000} to='#category'>Departments</Link></li>
                    <li className='cursor-pointer'><Link smooth={true} duration={1000} to='#contact'>Contact</Link></li>
                </ul>
                
            </div>
            <motion.div 
            initial={{scale:0}}
            whileInView={{scale:1}}
            transition={{duration:0.7}}>
              <Route to="/"><img className='sm:w-15 sm:h-12 w-16 h-10 xl:h-14 xl:w-20  cursor-pointer'src={small} alt='logo'/></Route>
            </motion.div>
            
        </div>
        <div className='hidden lg:flex w-fit gap-24 items-center'>
            <motion.ul
                initial={{scale:0}}
                whileInView={{scale:1}}
                transition={{duration:0.7}}>
            <ul className='flex gap-5  px-5 py-2 rounded-full items-center  w-fit text-green-300  shadow-green-300  shadow-inner'>
                <li className='cursor-pointer '><Link smooth={true} duration={1000} to='#home'>Home</Link></li>
                <li className='cursor-pointer'><Link smooth={true} duration={1000}  to='#about'>About</Link></li>
                <li className='cursor-pointer'><Link smooth={true} duration={1000} to='#category'>Departments</Link></li>
                <li className='cursor-pointer'><Link smooth={true} duration={1000} to='#contact'>Contact</Link></li>
                <li className='cursor-pointer'>{userInfo && userInfo.category==="Coordinator" && <li><Route to='/placementresults'>Results</Route></li>}</li>
                <li className='cursor-pointer'>{userInfo && userInfo.isAdmin && <li><Route to='/dashboard'>Dashboard</Route></li>}</li>
            </ul>
            </motion.ul>
            <div className='flex items-center gap-2 border-b-2 border-blue-600'>
            <input className='bg-transparent font-bold outline-none  px-2' placeholder='search...'   value={search} onChange={(e)=>setSearch(e.target.value.toUpperCase())}/>
            <FcSearch className='cursor-pointer' color='white' size={25} onClick={handleSearch}/>
            </div>
        </div>
        <div className='flex gap-3 items-center justify-end'>
          {/* <button><BsChatTextFill size={20}/></button> */}
          {userInfo && userInfo.image!="" && <Route to='/profile'><Badge overlap="circular" placement="bottom-end" className='bg-green-600'>
            <Avatar
              size="sm"
              src={userInfo.image}
              alt="profile picture"
            />
          </Badge></Route>}
          {!userInfo ? (<Button className='bg-brown-400' onClick={handleOpen}>Sign In</Button>):
          (<button className=' inline-flex items-center rounded-full space-x-2 p-2 bg-primary text-secondary ' onClick={handleSignout}><FiLogOut/></button>)}
        </div>
        <Dialog
          size="xs"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none"
        >
          <Login value={handleOpen}/>
        </Dialog>

    </div>
  )
}

export default Navbar

