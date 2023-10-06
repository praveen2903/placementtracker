import { useState } from 'react'; // Import useState for managing the showMore state
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import vvit from '../assets/pega.jpg';
import Nani from '../assets/ibm.jpg';
import theater from '../assets/infosys.jpg';
import dance from '../assets/tech-mahindra.webp';
import {motion} from 'framer-motion'
function Spliders() {
  const images = [vvit, Nani, theater, dance];
  const [showMore, setShowMore] = useState(false); // Initialize the showMore state

  const toggleShowMore = () => {
    setShowMore(!showMore); // Toggle the showMore state when the button is clicked
  };

  return (
    <div id="home" className='bg-[#fff3e0] grid md:grid-cols-2 py-12 '>
      <motion.div
              initial={{y:100}}
              whileInView={{y:0}}
              transition={{duration:0.7}}>
      <div className='flex flex-col items-center gap-5 lg:px-5  w-full lg:my-10 xl:my-10'>
        <h1 className='font-bold text-4xl  '>Welcome</h1>
        <div className='flex flex-col'>
          <p className="w-full px-11 lg:leading-loose">
            To achieve a zoom-in and zoom-out effect on the background image like a movie shot, you can use CSS animations and keyframes. Here&apos;s how you can modify the Brand component to achieve this effect:Here&apos;s how you can modify the Brand component to achieve this effect:<p className={`${showMore ? 'block' : 'hidden'}`}>Here&apos;s how you can modify the Brand component to achieve this effect:Here&apos;s how you can modify the Brand component to achieve this effect:Here&apos;s how you can modify the Brand component to achieve this effect:</p>
          </p>
          <button onClick={toggleShowMore} className='text-blue-300 font-bold text-sm hover:bg-blue-gray-300 w-fit mx-auto p-1 rounded-lg mt-2'>
            {showMore ? 'Read Less' : 'Read More'}
          </button>
        </div>
      </div>
      </motion.div>

      <div className="md:block cursor-pointer lg:mx-24 mx-12  flex items-center justify-center ">
        <Splide
          options={{
            rewind: true,
            perPage: 1,
            speed: 500,
            arrows: true,
            interval: 1000,
            autoplay: true,
          }}
          aria-label="React Splide Example"
          data-splide-interval="1000"
        >
          {images.map((image, index) => {
            return (
              <SplideSlide key={index} className=''>
                <img className='object-cover rounded h-96 w-full ' src={image} alt="Banner" />
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </div>
  );
}

export default Spliders;
