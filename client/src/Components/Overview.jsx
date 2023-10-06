// import { motion } from "framer-motion";
import img from "../assets/jobfinding.jpeg"
const About = () => {
  return (
    // <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}>
    <section className="relative w-full bg-[#ffcc80] text-black " id="about">
      <div id="#about" className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8 py-5 md:py-5">
        <div className="relative  lg:col-span-5 lg:-ml-8 xl:col-span-6 flex items-center justify-center">
          <img className="h-2/3 w-4/5 object-fill rounded-full" src={img} alt="about us image" />
          {/* <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3828.520042451368!2d80.52633517489959!3d16.34745013193009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35f5c3ed3eb309%3A0x683acf350cc3161f!2sVVIT%20College%20Rd%2C%20Namburu%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1692440514886!5m2!1sen!2sin"
          width="400"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>         */}
        </div>

        <div className="flex flex-col justify-center px-4 py-12 md:py-10 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-10 xl:col-span-6">
          <h1 className="mt-4 text-2xl font-bold tracking-tight  lg:text-4xl">
            Welcome to JOB portal
          </h1>
          <p className="mt-8 text-lg ">
          This platform designed to manage and showcase various companies and their available entries within a college, so that the student could apply to it . This website allows students to explore different companies, register for companies, and provides features for managing to the Department co-ordinator.

          </p>
          <ul className="mt-8 text-lg  list-disc list-inside">
            <li>An attractive and informative homepage.</li>
            <li>Features for managing Department coordinator.</li>
            <li>Students can register on the website, create profiles</li>
            <li>Register for the companies based on their interests.</li>
            <li>Each company has a dedicated page with a detailed description</li>
            <li>A calendar showcasing upcoming drives</li>
            <li>Belief in the power of collaboration</li>
            <li>Commitment to making a difference</li>
          </ul>
          <p className="mt-8 text-lg ">
            Join us on this journey of growth and success. Together, we can make
            a difference.
          </p>
        </div>
      </div>
    </section>
    // </motion.div>
  );
};

export default About;