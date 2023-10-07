import { useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getClubs } from '../redux/clubSlice';
import { Rings } from 'react-loader-spinner';
import { Button} from "@material-tailwind/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Categories() {
   const dispatch = useDispatch();
   const navigate=useNavigate();
   const userInfo = useSelector((state) => state.auth.userInfo);
   const clubs=useSelector((state)=>state.clubs.clubs);
   const load=useSelector((state)=>state.clubs.load);
   const checkLogin=(name)=>{
    if(!userInfo){
      navigate("/login");
    }else{
      navigate(`/${name}`)
    }
   }
    useEffect(()=>{
        const fetchData=async()=>{
            await dispatch(getClubs());
        }
        fetchData();
    },[dispatch]);
    if (load) {
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
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 580,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
  
  return (
    // <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay:0.1  }}>
      <div id='#category' className='bg-[#fff3e0] pb-20 pt-5 '>
          <div className='mb-10 mt-8 flex flex-col gap-2 items-center'>
              <h1 className='font-bold text-4xl'>Departments</h1>
              <h3>Choose Department</h3>
          </div>
         <div className='mx-8'>
          <Slider {...settings}>
              {clubs && clubs.map((product, index) => {
                return (
                  <div key={index} >
                          <div key={index} onClick={()=>checkLogin(product.name)} className='m-0 sm:m-5 shadow-xl pb-4  bg-white hover:scale-105 transition-all duration-500'>
                            <img src={product.image} className=' cursor-pointer w-full h-60 object-cover  rounded-t-lg mb-10' alt='event'/>
                              <div className='flex justify-between items-center'>
                                <h1 className='font-bold ml-4'>{product.name}</h1>
                                <Button onClick={()=>checkLogin(product.name)} className='bg-[#8d6e63] text-white py-2 px-2 mr-4 rounded-md'>Know More&gt;&gt;</Button>
                              </div>
                          </div>
                  </div>
                );
              })}
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
      </div>
    // </motion.div>
  )
}

export default Categories