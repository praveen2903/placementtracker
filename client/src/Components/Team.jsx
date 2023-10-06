import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
const Team = (props) => {
    const value=props;
    const {data}=value;
  return (
    // <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}>
      <div id="team" className="bg-transparent pb-10 shadow-inner">
        <section className="">
          <div className=" px-4 mx-auto max-w-screen-xl text-center pt-10 ">
            <div className="mx-auto mb-8 max-w-screen-sm ">
              <h2 className="mb-4 text-5xl tracking-tight font-extrabold text-brown-700">
                Our Team
              </h2>
              <p className="font-light sm:text-xl text-brown-400">
                Coordinators
              </p>
            </div>
            <div className="md:block  cursor-pointer sm:mx-20 pt-5  ">
              <Splide
                options={{
                  
                  rewind: true,
                  perPage:3,
                  breakpoints: {
                    640: {
                      perPage:1,
                    },
                    768:{
                      perPage:2,
                    },
                    1024:{
                      perPage:2,
                    }
                  },
                  arrows: true,
                }}
                aria-label="React Splide Example"
                data-splide-interval="1000"
              >
              {data.filter((item)=>item.category==="Coordinator").map((member, index) => {
                return (
                  <SplideSlide key={index} className="mx-auto md:mx-2">
                    <div className="text-center text-gray-700 w-fit md:mr-5 mx-auto lg:mx-10  ">
                      <img
                        className="h-60 md:h-56 w-60 md:w-60 object-fill  rounded-full"
                        src={member.userimage}
                        alt="Bonnie Avatar"
                      />
                      <div className="pb-5 shadow-inner shadow-brown-300 bg-white py-3">
                        <h3 className="mb-1 text-2xl font-bold tracking-tight">
                          <p className="font-serif">{member.name}</p>
                        </h3>
                        <p>{member.branch}</p>
                        <p>{member.roll}</p>                    
                        <Link to={`${member.roll}/profile`}><Button color="brown" className="mt-3">Profile</Button></Link>               
                      </div>
                    </div>
                  </SplideSlide>
                );
              })}
            </Splide>
            </div>
          </div>
        </section>
      </div>
    // </motion.div>
  );
};

export default Team;