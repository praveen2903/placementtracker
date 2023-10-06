import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {  UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {BsFiletypePdf} from 'react-icons/bs'
import { getDocs } from "../redux/registerSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/url";
import { toast } from "react-toastify";
const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

const TABLE_HEAD = ["Profile","Name", "Department","Company", "Passed Out", "Roll", "OfferLetter","Verify","Approve","Reject"];
 
 
function PlacementResults() {
  const dispatch = useDispatch();
  const [searchroll,setSearchroll]=useState("");
const docs=useSelector((state)=>state.register.docs);
useEffect(()=>{
  const fetchData=async()=>{
      await dispatch(getDocs());
      console.log("docs",docs);
  }
  fetchData();
},[dispatch]);
const handleApprove=async(id)=>{
  const res=await axios.patch(`${BASE_URL}/api/verify/update/${id}`,{},{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  toast.success(res.data.message);
  await dispatch(getDocs());
}
const handleDelete=async(id)=>{
  const res=await axios.delete(`${BASE_URL}/api/verify/delete/${id}`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  toast.success(res.data.message);
  await dispatch(getDocs());
}
  return (
    <Card className="h-full w-full mt-24">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Students list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all students
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Button className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search Rollno"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onChange={(e)=>setSearchroll(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
          {docs.filter((item)=>item.roll===searchroll).map(
              ({_id,userimage,name,department,event,year,roll,image,isVerify}, index) => {
                const isLast = index === docs.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={name} className="bg-blue-gray-200">
                    <td className={classes}>
                        <Avatar src={userimage} alt={name} size="sm" />
                    </td>
                    <td>
                        <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {name}
                          </Typography>
                    </td>
                    <td>
                          <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal opacity-70"
                                >
                            {department}
                          </Typography>
                    </td>
                    <td>
                          <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal opacity-70"
                                >
                            {event}
                          </Typography>
                    </td>
                    <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {year}
                        </Typography>
                       
                    </td>
                    <td>
                        <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                        >
                          {roll}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <Link to={`${image}`} target="_black"><BsFiletypePdf color="red" size={25} className="cursor-pointer"/></Link>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={isVerify ? "Verified" : "Pending"}
                          color={isVerify ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton variant="text">
                          <FcApproval className="h-6 w-6" onClick={()=>handleApprove(_id)} />
                        </IconButton>
                      </Tooltip>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton variant="text">
                          <MdDelete className="h-6 w-6" onClick={()=>handleDelete(_id)} />
                        </IconButton>
                      </Tooltip>
                    </td>
                   
                  </tr>
                );
              },
            )}
            {docs.map(
              ({_id,userimage,name,department,event,year,roll,image,isVerify}, index) => {
                const isLast = index === docs.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={name}>
                    <td className={classes}>
                        <Avatar src={userimage} alt={name} size="sm" />
                    </td>
                    <td>
                        <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {name}
                          </Typography>
                    </td>
                    <td>
                          <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal opacity-70"
                                >
                            {department}
                          </Typography>
                    </td>
                    <td>
                          <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal opacity-70"
                                >
                            {event}
                          </Typography>
                    </td>
                    <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {year}
                        </Typography>
                       
                    </td>
                    <td>
                        <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                        >
                          {roll}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <Link to={`${image}`} target="_black"><BsFiletypePdf color="red" size={25} className="cursor-pointer"/></Link>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={isVerify ? "Verified" : "Pending"}
                          color={isVerify ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton variant="text">
                          <FcApproval className="h-6 w-6" onClick={()=>handleApprove(_id)} />
                        </IconButton>
                      </Tooltip>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton variant="text">
                          <MdDelete className="h-6 w-6" onClick={()=>handleDelete(_id)} />
                        </IconButton>
                      </Tooltip>
                    </td>
                   
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
export default PlacementResults;