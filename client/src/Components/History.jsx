import { Fragment, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import {SiWipro,SiInfosys,SiIbm,SiCognizant} from "react-icons/si"
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {MdIndeterminateCheckBox} from "react-icons/md"
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {HiDesktopComputer} from "react-icons/hi"
import {GiElectricalResistance} from "react-icons/gi"
import {BiChip} from "react-icons/bi"
import {BsFillBuildingFill} from "react-icons/bs"
import {BiSolidCarMechanic} from "react-icons/bi"
import { ParamContext } from "../context/Context";
import Home from "./PlaceTable";
// import PlaceTable from "./PlaceTable";

const departments = [
  {
    name: "CSE",
    icon: HiDesktopComputer,
  },
  {
    name: "EEE",
    icon: GiElectricalResistance,
  },
  {
    name: "ECE",
    icon: BiChip,
  },
  {
    name: "Mechanical",
    icon: BiSolidCarMechanic,
  },
  {
    name: "Civil",
    icon: BsFillBuildingFill,
  },
];
const companies=[
    {
        name:"Wipro",
        icon:SiWipro,
    },
    {
        name:"Infosys",
        icon:SiInfosys,
    },
    {
        name:"IBM",
        icon:SiIbm,
    },
    {
        name:"Tech Mahindra",
        icon:MdIndeterminateCheckBox,
    },
    {
        name:"Cognizant",
        icon:SiCognizant,
    }
]

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Example() {
    const [searchVal, setSearch] = useState("");
    const [param, setParam] = useState({
        department: "",
        company: "",
        keyword: "",
        year:"",
      });
    const handleClick = (reqParam) => {
        if (param.name) param.keyword = "";
        const newParam = { ...param, ...reqParam };
        setParam(newParam);
        setSearch("")
        if(document.getElementById('mobile-close'))
          document.getElementById('mobile-close').click();
      };

  return (
    <div>
      <Popover className="relative md:top-0 z-10 p-1 bg-[#f8f8f9] m-4 rounded-lg shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6"> 
          <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1 text-2xl font-bold text-black">
              Placement History
            </div>
            
            <div className="-my-2 -mr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden space-x-10 md:flex">
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-gray-900" : "text-gray-500",
                        "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 p-1"
                      )}
                    >
                      <span>department</span>
                      <span className="p-1">{param.department}</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? "text-gray-600" : "text-gray-400",
                          "ml-2 h-5 w-5 group-hover:text-gray-500"
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-100"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10  -ml-4 mt-3 w-max max-w-md transform px-4 sm:px-4 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                            {departments.map((item) => (
                              <span
                              
                                key={item.name}
                                onClick={() =>
                                  handleClick({department : item.name })
                                }
                                className="active:bg-purple-100 -m-3 flex items-start rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                              >
                                <item.icon size={30}/>
                                <div className="ml-4">
                                  <div className="text-base font-medium text-gray-900">
                                    {item.name}
                                  </div>
                                </div>
                              </span>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-gray-900" : "text-gray-500",
                        "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 p-1"
                      )}
                    >
                      <span>company  </span>
                      <span className="p-1">{param.company}</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? "text-gray-600" : "text-gray-400",
                          "ml-2 h-5 w-5 group-hover:text-gray-500"
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10  -ml-4 mt-3 w-max max-w-md transform px-4 sm:px-4 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                            {companies.map((item) => (
                              <span
                              
                                key={item.name}
                                onClick={() =>
                                  handleClick({ company : item.name })
                                }
                                className="active:bg-purple-100 -m-3 flex items-start rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                              >
                                <item.icon size={30}/>
                                <div className="ml-4">
                                  <div className="text-base font-medium text-gray-900">
                                    {item.name}
                                  </div>
                                </div>
                              </span>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
              
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-gray-900" : "text-gray-500",
                        "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 p-1"
                      )}
                    >
                      <span>year</span>
                      <span className="p-1">{param.year}</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? "text-gray-600" : "text-gray-400",
                          "ml-2 h-5 w-5 group-hover:text-gray-500"
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 -ml-2 mt-3 p-2 max-w-xs transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative grid gap-6 bg-white px-2 py-6 sm:gap-4 sm:p-4">
                            <span
                              onClick={() => handleClick({ year: 2019 })}
                              className="cursor-pointer hover:text-purple-600 p-3 rounded-md w-fit active:bg-purple-100"
                            >
                                2019
                            </span>
                            <span
                              onClick={() => handleClick({ year:2020 })}
                              className="cursor-pointer  hover:text-purple-600 p-3 rounded-md w-fit active:bg-purple-100"
                            >
                              2020
                            </span>
                            <span
                              onClick={() => handleClick({ year:2021 })}
                              className="cursor-pointer  hover:text-purple-600 p-3 rounded-md w-fit active:bg-purple-100"
                            >
                              2021
                            </span>
                            <span
                              onClick={() => handleClick({ year:2022 })}
                              className="cursor-pointer  hover:text-purple-600 p-3 rounded-md w-fit active:bg-purple-100"
                            >
                              2022
                            </span>
                            <span
                              onClick={() => handleClick({ year:2023 })}
                              className="cursor-pointer  hover:text-purple-600 p-3 rounded-md w-fit active:bg-purple-100"
                            >
                              2023
                            </span>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>

                  </>
                )}
              </Popover>
            </Popover.Group>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-black">History</div>
                  <div className="-mr-2" >
                    <Popover.Button id="mobile-close" className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    {departments.map((item) => (
                      <span
                        key={item.name}
                        onClick={() => handleClick({ department : item.name })}
                        className="flex cursor-pointer"
                      >
                        <item.icon
                          className="h-6 w-6 flex-shrink-0 text-indigo-600"
                          aria-hidden="true"
                        />
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </span>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="space-y-6 py-6 px-5 flex flex-col">
                <div className="grid grid-cols-1 gap-y-4 gap-x-8 ">
                  <span className="font-bold">Company</span>
                  <nav className="grid gap-y-8">
                    {companies.map((item) => (
                      <span
                        key={item.name}
                        onClick={() => handleClick({ company: item.name })}
                        className="flex cursor-pointer"
                      >
                        <item.icon
                          className="h-6 w-6 flex-shrink-0 text-indigo-600"
                          aria-hidden="true"
                        />
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </span>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="space-y-6 py-6 px-5 flex flex-col">
                <div className="grid grid-cols-1 gap-y-4 gap-x-8 ">
                  <span className="font-bold">Year</span>
                  <span
                    onClick={() => handleClick({ year:2019 })}
                    className="cursor-pointer  hover:text-purple-600"
                  >
                   2019
                  </span>
                  <span
                    onClick={() => handleClick({ year:2020 })}
                    className="cursor-pointer  hover:text-purple-600"
                  >
                    2020
                  </span>
                  <span
                    onClick={() => handleClick({ year:2021 })}
                    className="cursor-pointer  hover:text-purple-600"
                  >
                    2021
                  </span>
                  <span
                    onClick={() => handleClick({ year:2022 })}
                    className="cursor-pointer  hover:text-purple-600"
                  >
                    2022
                  </span>
                  <span
                    onClick={() => handleClick({ year:2023 })}
                    className="cursor-pointer  hover:text-purple-600"
                  >
                    2023
                  </span>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      <ParamContext.Provider value={param}>
        <Home value={searchVal} selectedDepartment={param.department} selectedCompany={param.company} selectedYear={param.year}/>
      </ParamContext.Provider>

      <div
        className="move-to-top cursor-pointer ml-5 my-2"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        ^
      </div>
     
    </div>
  );
}