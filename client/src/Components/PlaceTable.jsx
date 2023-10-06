/* eslint-disable react/prop-types */
import { useState } from 'react';
import data from '../PreviousStudentData';  // Updated import
import ReactPaginate from "react-paginate";
import {HiBuildingOffice} from "react-icons/hi2"
import {GiMoneyStack} from "react-icons/gi"
import {FcDepartment} from "react-icons/fc"
import person from "../assets/image.png"


function Home({name,selectedDepartment,selectedCompany, selectedYear}) {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6; // Number of products per page
  const totalPages = Math.ceil(data.students?.length / perPage);
  const [hasMorePages, setHasMorePages] = useState(true);

const handlePageChange = (selectedPage) => {
  const nextPage = selectedPage.selected + 1;
  const totalCards = data.students?.filter(item => {
    let departmentMatch = true;
    let companyMatch = true;
    let yearMatch = true;

    if (selectedDepartment) {
      departmentMatch = item.department === selectedDepartment;
    }

    if (selectedCompany) {
      companyMatch = item.company.toLowerCase() === selectedCompany.toLowerCase();
    }

    if (selectedYear) {
      yearMatch = item.year === selectedYear;
    }

    return departmentMatch && companyMatch && yearMatch;
  }).length;

  if (nextPage * perPage <= totalCards) {
    setCurrentPage(nextPage);
    setHasMorePages(nextPage * perPage < totalCards);
  }
};

  const currentProducts = data.students?.filter(item => {
    let departmentMatch = true;
    let companyMatch = true;
    let yearMatch = true;

    if (selectedDepartment) {
      departmentMatch = item.department === selectedDepartment;
    }

    if (selectedCompany) {
      companyMatch = item.company.toLowerCase() === selectedCompany.toLowerCase();
    }

    if (selectedYear) {
      yearMatch = item.year === selectedYear;
    }

    return departmentMatch && companyMatch && yearMatch;
  }).slice((currentPage - 1) * perPage, currentPage * perPage);


  return (
    <div className='bg-slate-200 shadow-2xl md:m-20 p-5 mx-auto'>
        <div className='grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-8 pb-10'>
            {!name ? currentProducts && currentProducts.map((item)=>(
                <div key={item.id} className='w-fit flex flex-col gap-3 bg-slate-100'>
                    <img src={person} className='h-60 w-72 object-cover' alt='car'/>
                    <div className='flex justify-between p-2 '>
                        <h1 className='font-bold text-[#1d4ed8]'>{item.name}</h1>
                        <h1 className='border-dotted border-2 border-blue-400 px-2 rounded-lg'>{item.year}</h1>
                    </div>
                    <div className='flex justify-start gap-10 px-8 items-center '>
                        <p className='flex items-center gap-1 text-[#38bdf8]'><HiBuildingOffice color='blue'/>{item.company}</p>
                        <p className='flex items-center gap-1 text-[#38bdf8]'><GiMoneyStack color='blue'/>{item.package}</p>
                    </div>
                    <div className='flex justify-evenly items-center'>
                        <p className='flex items-center gap-1'><FcDepartment color='blue'/>{item.department}</p>
                    </div>
                    <hr />
                    <div className='flex justify-between items-center shadow-lg p-4'>
                        <button className='bg-blue-500 text-white rounded-lg px-2 py-1'>View</button>
                    </div>
                </div>
            )):currentProducts && currentProducts.filter((item)=>item.name===name).map((item)=>(
                <div key={item.id} className='w-fit flex flex-col gap-3'>
                    <img src={person} className='h-60 w-72 object-cover' alt='car'/>
                    <div className='flex justify-between p-2 '>
                        <h1 className='font-bold'>{item.name}</h1>
                        <h1 className='border-dotted border-2 border-blue-400 px-2 rounded-lg'>{item.year}</h1>
                    </div>
                    <div className='flex justify-start gap-10 px-8 items-center '>
                        <p className='flex items-center gap-1'><HiBuildingOffice color='blue'/>{item.company}</p>
                        <p className='flex items-center gap-1'><GiMoneyStack color='blue'/>{item.package}</p>
                    </div>
                    <div className='flex justify-evenly items-center'>
                        <p className='flex items-center gap-1'><FcDepartment color='blue'/>{item.department}</p>
                    </div>
                    <hr />
                </div>
            ))}
        </div>
        {hasMorePages && (
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
      )} 
    </div>
  );
}

export default Home;
