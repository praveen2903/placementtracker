import { useState } from "react"
import {BsPersonFillAdd} from 'react-icons/bs'
import {ImEnter, ImHome} from 'react-icons/im'
import {GiHomeGarage} from 'react-icons/gi'
import {MdEmojiEvents,MdOutlineEmojiEvents,MdEvent} from 'react-icons/md'
import {VscThreeBars} from 'react-icons/vsc';
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Drawer,
} from "@material-tailwind/react";
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
function Sidebar() {   
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const clubs=useSelector((state)=>state.clubs.clubregisters);
  return (
      <div className='mt-24 '>
         <div className="hidden lg:block">
         <Card className="fixed top-4 w-fit h-full  max-w-[20rem] p-4 shadow-2xl shadow-deep-orange-200 mt-12 bg-[#ffccbc]">
              <List className="font-bold text-black pt-10 ">
                <Link to="/dashboard">
                  <ListItem>
                    <ListItemPrefix>
                        <ImHome className="h-5 w-5" />
                    </ListItemPrefix>
                    Home
                  </ListItem>
                </Link>
                <Link to='/admin/clubs'>
                  <ListItem>
                    <ListItemPrefix>
                        <MdEmojiEvents className="h-5 w-5" />
                    </ListItemPrefix>
                    Departments
                  </ListItem>
                </Link>
                <Link to='/admin/events'>
                  <ListItem>
                    <ListItemPrefix>
                        <MdOutlineEmojiEvents className="h-5 w-5" />
                    </ListItemPrefix>
                    Companies
                  </ListItem>
                </Link>
                <Link to='/admin/registers'>
                  <ListItem>
                    <ListItemPrefix>
                        <ImEnter className="h-5 w-5" />
                    </ListItemPrefix>
                    Department Registrations
                    <ListItemSuffix>
                      <Chip value={clubs.length} size="sm" variant="ghost" color="white" className="rounded-full" />
                    </ListItemSuffix>
                  </ListItem>
                </Link>
                <Link to='/admin/addAdmin'>
                  <ListItem>
                    <ListItemPrefix>
                      <BsPersonFillAdd className="h-5 w-5" />
                    </ListItemPrefix> 
                    Add Admin
                  </ListItem>
                </Link>
                <Link to='/admin/reviews'>
                  <ListItem>
                    <ListItemPrefix>
                      <BsPersonFillAdd className="h-5 w-5" />
                    </ListItemPrefix>
                    Reviews
                  </ListItem>
                </Link>
                <Link to='/admin/addClub'>
                  <ListItem>
                  <ListItemPrefix>
                      <GiHomeGarage className="h-5 w-5" />
                  </ListItemPrefix>
                  Add Department
                </ListItem>
                </Link>
                <Link to='/admin/addEvent'>
                  <ListItem >
                    <ListItemPrefix>
                        <MdEvent className="h-5 w-5" />
                    </ListItemPrefix>
                    Add Company
                  </ListItem>
                </Link>
              </List>
              </Card>
         </div>
          <div className="lg:hidden block ">
            <div className="flex gap-3 items-center text-brown-900">
              <VscThreeBars onClick={openDrawer} className="ml-5"/>
              <h1 className="font-bold text-2xl ">Demo Board</h1>
            </div>
            <Drawer open={open} onClose={closeDrawer}>
              <Card>
              <List className="font-bold text-black flex flex-col gap-5 ">
                <Link to="/dashboard">
                  <ListItem>
                    <ListItemPrefix>
                        <ImHome className="h-5 w-5" />
                    </ListItemPrefix>
                    Home
                  </ListItem>
                </Link>
                <Link to='/admin/clubs'>
                  <ListItem>
                    <ListItemPrefix>
                        <MdEmojiEvents className="h-5 w-5" />
                    </ListItemPrefix>
                    Departments
                  </ListItem>
                </Link>
                <Link to='/admin/events'>
                  <ListItem>
                    <ListItemPrefix>
                        <MdOutlineEmojiEvents className="h-5 w-5" />
                    </ListItemPrefix>
                    Companies
                  </ListItem>
                </Link>
                <Link to='/admin/registers'>
                  <ListItem>
                    <ListItemPrefix>
                        <ImEnter className="h-5 w-5" />
                    </ListItemPrefix>
                    Registrations
                    <ListItemSuffix>
                      <Chip value={clubs.length} size="sm" variant="ghost" color="white" className="rounded-full" />
                    </ListItemSuffix>
                  </ListItem>
                </Link>
                <Link to='/admin/addAdmin'>
                  <ListItem>
                    <ListItemPrefix>
                      <BsPersonFillAdd className="h-5 w-5" />
                    </ListItemPrefix> 
                    Add Admin
                  </ListItem>
                </Link>
                <Link to='/admin/reviews'>
                  <ListItem>
                    <ListItemPrefix>
                      <BsPersonFillAdd className="h-5 w-5" />
                    </ListItemPrefix>
                    Reviews
                  </ListItem>
                </Link>
                <Link to='/admin/addClub'>
                  <ListItem>
                  <ListItemPrefix>
                      <GiHomeGarage className="h-5 w-5" />
                  </ListItemPrefix>
                  Add Department
                </ListItem>
                </Link>
                <Link to='/admin/addEvent'>
                  <ListItem >
                    <ListItemPrefix>
                        <MdEvent className="h-5 w-5" />
                    </ListItemPrefix>
                    Add Company
                  </ListItem>
                </Link>

              </List>
              </Card>
            </Drawer>
          </div>
      </div>
  )
}

export default Sidebar;