import { Button,Card,CardHeader,CardBody,Typography} from '@material-tailwind/react';
import vvit from '../assets/bgmain.jpeg'
import { useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter'
import {
    IconButton,
    SpeedDial,
    SpeedDialHandler,
    SpeedDialContent,
    SpeedDialAction,
  } from "@material-tailwind/react";
import { BsChatTextFill } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai';
import AudioComponent from './AudioComponent';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {motion} from 'framer-motion';
import { FcSearch } from 'react-icons/fc';

function Brand() {
    const audio = document.getElementById("audiotag");
    const [isMuted, setIsMuted] = useState(true);
    const[search,setSearch]=useState("");
    const navigate=useNavigate();
    const handleButtonClick = () => {
        audio.play();
        setIsMuted(!isMuted);
      };
      const userInfo = useSelector((state) => state.auth.userInfo);
      console.log(userInfo);
      useEffect(() => {
        // Trigger audio playback when component mounts
      }, [isMuted]);
    // const [openPopover, setOpenPopover] = useState(true);
    // const triggers = {
    //     // onabort: () => setOpenPopover(false),
    //     onClick: () => setOpenPopover(true),
    // };
    const handleSearch=()=>{
      navigate(`/${search}`);
      setSearch("");
    }
  return (
    <div id="#home" className=''>
        <Card
            shadow={false}
            className="relative rounded-none grid h-[25rem] lg:h-[40rem] w-full  sm:max-w-full items-end justify-center overflow-hidden text-center mt-5 md:mt-0"
            >
            <CardHeader
                floated={false}
                shadow={true}
                color="transparent"
                className={`absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center zoom-in-out`}
                style={{ backgroundImage:`url(${vvit})`}}                    >
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/40 " />
            </CardHeader>
            <CardBody className="relative px-6 md:px-12 top-24 md:right-96 xl:mr-24 hidden lg:block">
                <motion.div
                initial={{scale:0}}
                whileInView={{scale:1}}
                transition={{duration:0.7}}>
                <div className='bg-white rounded-lg'>
                    {/* <PopoverHandler >
                        <Button className=''color='white'>Basic Info</Button>
                    </PopoverHandler> */}
                    <div className="w-[24rem] px-5 py-5 overflow-y-auto lg:flex z-10 hidden">
                        <div className="p-4">
                        <Typography color="blue-gray" className="font-semibold mb-2 text-xl">Job Portal</Typography>
                        <Typography variant="small" color="gray" className="font-normal mb-4 justify-content">
                            Wide range of opportunities, job alerts and user friendly interface benifits students to look up the jobs they are needed.
                        </Typography>
                        <Link to="/calender" className="inline-block">
                            <Button size="sm" variant="text" className="flex items-center gap-1 capitalize">
                            View Calender
                            </Button>
                        </Link>
                        </div>
                        <img 
                        src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhbSUyMGJ1aWxkaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                        alt="image"
                        className="w-1/2 rounded-lg h-full object-cover"
                        />
                    </div>
                </div>
                </motion.div>
            </CardBody>
            <div className='flex items-center gap-2 relative bottom-20  h-fit  lg:hidden  w-fit border-b-2 border-white'>
              <input className='bg-transparent w-full outline-none text-white  ' placeholder='Company...' value={search} onChange={(e)=>setSearch(e.target.value.toUpperCase())}/>
              <FcSearch className='cursor-pointer' color='white' size={35} onClick={handleSearch}/>
            </div>
            <span className='font-bold sm:text-2xl lg:text-3xl font-sans text-black relative bottom-44 lg:bottom-80 lg:left-96 xl:ml-24 h-fit px-10 bg-white rounded-lg p-2'>
                  {/* Style will be inherited from the parent element */}
                  
                  <Typewriter
                    words={['REGISTER', 'TO','COMPANY', 'REGISTER TO COMPANY']}
                    loop={3}
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                />
                <br />
                <h1 className='p-2 text-xl'>WELCOME TO JOB PORTAL</h1>
                </span>
        </Card>
        <div className='fixed lg:top-3/4 sm:top-80 right-8 z-50'>
        <SpeedDial>
          <SpeedDialHandler>
            <IconButton color='brown' size="lg" className="rounded-full">
              <AiOutlinePlus  className="h-5 w-5 transition-transform group-hover:rotate-45 " />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent >
            {userInfo && (userInfo.isAdmin || userInfo.category==="Coordinator") && <SpeedDialAction >
              <Link to='/chat' ><BsChatTextFill className="h-5 w-5"  /></Link>
            </SpeedDialAction>}
            <SpeedDialAction>
            <AudioComponent isMuted={isMuted} />
            <div onClick={handleButtonClick} className="cursor-pointer bg-green-400 rounded-full">
              {isMuted ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12Z"
                    fill="black"
                    fillOpacity="0.2"
                  />
                  <path
                    d="M7.29533 14.9631H8.06037C9.06478 16.4268 10.7067 17.2994 12.4597 17.3013C12.8656 17.3013 13.2548 17.1371 13.5418 16.8448C13.8288 16.5524 13.99 16.1559 13.99 15.7426V7.55873C13.99 7.14539 13.8288 6.74893 13.5418 6.45655C13.2548 6.16416 12.8656 6 12.4597 6C10.7067 6.0019 9.06474 6.87451 8.06037 8.33821H7.29533C6.68652 8.33821 6.10278 8.5845 5.67234 9.02312C5.24179 9.46161 5 10.0562 5 10.6765V12.625C5 13.2452 5.24176 13.8398 5.67234 14.2783C6.10278 14.7169 6.68648 14.9631 7.29533 14.9631Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.1568 9.35348C18.9616 9.15822 18.645 9.15822 18.4497 9.35348L17.5205 10.2827L16.6702 9.43242C16.4749 9.23715 16.1583 9.23715 15.9631 9.43242L15.5577 9.83778C15.3624 10.033 15.3624 10.3496 15.5577 10.5449L16.408 11.3952L15.3535 12.4497C15.1582 12.645 15.1582 12.9616 15.3535 13.1568L15.7588 13.5622C15.9541 13.7574 16.2707 13.7574 16.4659 13.5622L17.5205 12.5077L18.5339 13.521C18.7291 13.7163 19.0457 13.7163 19.241 13.521L19.6463 13.1157C19.8416 12.9204 19.8416 12.6038 19.6463 12.4086L18.6329 11.3952L19.5622 10.4659C19.7574 10.2707 19.7574 9.9541 19.5622 9.75884L19.1568 9.35348Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.1568 9.35348C18.9616 9.15822 18.645 9.15822 18.4497 9.35348L17.5205 10.2827L16.6702 9.43242C16.4749 9.23715 16.1583 9.23715 15.9631 9.43242L15.5577 9.83778C15.3624 10.033 15.3624 10.3496 15.5577 10.5449L16.408 11.3952L15.3535 12.4497C15.1582 12.645 15.1582 12.9616 15.3535 13.1568L15.7588 13.5622C15.9541 13.7574 16.2707 13.7574 16.4659 13.5622L17.5205 12.5077L18.5339 13.521C18.7291 13.7163 19.0457 13.7163 19.241 13.521L19.6463 13.1157C19.8416 12.9204 19.8416 12.6038 19.6463 12.4086L18.6329 11.3952L19.5622 10.4659C19.7574 10.2707 19.7574 9.9541 19.5622 9.75884L19.1568 9.35348Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.1568 9.35348C18.9616 9.15822 18.645 9.15822 18.4497 9.35348L17.5205 10.2827L16.6702 9.43242C16.4749 9.23715 16.1583 9.23715 15.9631 9.43242L15.5577 9.83778C15.3624 10.033 15.3624 10.3496 15.5577 10.5449L16.408 11.3952L15.3535 12.4497C15.1582 12.645 15.1582 12.9616 15.3535 13.1568L15.7588 13.5622C15.9541 13.7574 16.2707 13.7574 16.4659 13.5622L17.5205 12.5077L18.5339 13.521C18.7291 13.7163 19.0457 13.7163 19.241 13.521L19.6463 13.1157C19.8416 12.9204 19.8416 12.6038 19.6463 12.4086L18.6329 11.3952L19.5622 10.4659C19.7574 10.2707 19.7574 9.9541 19.5622 9.75884L19.1568 9.35348Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.1568 9.35348C18.9616 9.15822 18.645 9.15822 18.4497 9.35348L17.5205 10.2827L16.6702 9.43242C16.4749 9.23715 16.1583 9.23715 15.9631 9.43242L15.5577 9.83778C15.3624 10.033 15.3624 10.3496 15.5577 10.5449L16.408 11.3952L15.3535 12.4497C15.1582 12.645 15.1582 12.9616 15.3535 13.1568L15.7588 13.5622C15.9541 13.7574 16.2707 13.7574 16.4659 13.5622L17.5205 12.5077L18.5339 13.521C18.7291 13.7163 19.0457 13.7163 19.241 13.521L19.6463 13.1157C19.8416 12.9204 19.8416 12.6038 19.6463 12.4086L18.6329 11.3952L19.5622 10.4659C19.7574 10.2707 19.7574 9.9541 19.5622 9.75884L19.1568 9.35348Z"
                    fill="white"
                  />
                </svg>
                ) : (
                    <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12Z"
                        fill="black"
                        fillOpacity="0.2"
                    />
                    <path
                        d="M7.29533 14.9631H8.06037C9.06478 16.4268 10.7067 17.2994 12.4597 17.3013C12.8656 17.3013 13.2548 17.1371 13.5418 16.8448C13.8288 16.5524 13.99 16.1559 13.99 15.7426V7.55873C13.99 7.14539 13.8288 6.74893 13.5418 6.45655C13.2548 6.16416 12.8656 6 12.4597 6C10.7067 6.0019 9.06474 6.87451 8.06037 8.33821H7.29533C6.68652 8.33821 6.10278 8.5845 5.67234 9.02312C5.24179 9.46161 5 10.0562 5 10.6765V12.625C5 13.2452 5.24176 13.8398 5.67234 14.2783C6.10278 14.7169 6.68648 14.9631 7.29533 14.9631Z"
                        fill="white"
                    />
                    <path
                        d="M16.6355 13.3712C17.0454 12.8973 17.2623 12.2818 17.2418 11.6506C17.2623 11.0194 17.0454 10.404 16.6355 9.93005C16.442 9.7331 16.1602 9.65617 15.8961 9.72821C15.6319 9.80038 15.4255 10.0105 15.3548 10.2796C15.2839 10.5488 15.3594 10.836 15.5529 11.0329C15.7637 11.4167 15.7637 11.8846 15.5529 12.2684C15.3594 12.4654 15.2839 12.7526 15.3548 13.0217C15.4255 13.2908 15.6319 13.5009 15.8961 13.5731C16.1602 13.6451 16.442 13.5682 16.6355 13.3713V13.3712Z"
                        fill="white"
                    />
                    </svg>
              )}
            </div>
            </SpeedDialAction>
           </SpeedDialContent>
        </SpeedDial>
        </div>

    </div>
  )
}

export default Brand