import React, { useState, useEffect, useRef } from 'react';
import { AiFillLike } from 'react-icons/ai';
import { FaPaperPlane } from 'react-icons/fa';
import {useDispatch, useSelector} from 'react-redux';
import EmojiPicker from 'emoji-picker-react';
import { Card, CardHeader, CardBody, Badge } from '@material-tailwind/react';
import io from 'socket.io-client';
import { getChats} from '../redux/chatSlice';
import axios from 'axios';
import { BASE_URL, SOCKET_URL} from '../config/url';
import { Link, useNavigate } from 'react-router-dom';

const socket = io(`${SOCKET_URL}`, {
  transport: ["websocket"],
});

const Chat = () => {
  // const [currentTime, setCurrentTime] = useState(new Date());
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const msgs=useSelector((state)=>state.chats.chatsdata);
  const userInfo=useSelector((state)=>state.auth.userInfo);
  const[messages,setMessages]=useState([]);
  const chatContainerRef = useRef(null);
  const navigate=useNavigate();
  // const emojiPickerRef = useRef(null);
  const dispatch=useDispatch();
  useEffect(() => {
    const fetchChats = async () => {
      await dispatch(getChats());
      setMessages(msgs);
    };
    fetchChats();
  },[dispatch,msgs]);
  useEffect(() => {
    // Socket.IO event listeners
    if(!userInfo){
      navigate("/login");
    }
    // Listen for incoming messages
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    return () => {
      // Cleanup on component unmount
      socket.off("message");
    };
  }, [messages,navigate,userInfo]);
  // useEffect(()=>{
  //   setMessages(msgs);
  // },[msgs])

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };
  const handleSendMessage =async () => {
    if (message.trim() !== '') {
      const newMessage = {
        user: userInfo.username,
        text: message,
        likes: 0,
        image:userInfo.image,
        date:new Date(),
      };
      // Add the new message to the chatMessages array
      socket.emit("message", newMessage);
  
      setMessage('');
    }
  };
  
  


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };
  const handleLike=async(id)=>{
    await axios.patch(`${BASE_URL}/api/chat/${id}`);
    await dispatch(getChats());
  }
  const handleSelectEmoji = (emoji) => {
    const emojee = emoji.emoji;
    setMessage((prevMessage) => prevMessage + emojee);
  };

  const handleToggleEmojiPicker = () => {
    setShowEmojiPicker((prevState) => !prevState);
  };

 

  return (
    <div className="bg-white sm:mt-40 mt-32  ">
         <Card className='w-fit mx-auto shadow-2xl shadow-blue-gray-700 flex items-center flex-shrink'>
            <CardHeader
            variant='gradient'
            color='green'
            className='mx-auto p-2 font-bold px-10 '>
            Chat
            </CardHeader>
            <CardBody className='md:w-[40rem]  flex flex-col justify-between'>
                <div className="mb-10" ref={chatContainerRef}>
                    {messages.length>0 && messages.map((chat) => (
                    <div className="flex  justify-between gap-5 my-5" key={chat._id}>
                        <div className='flex flex-wrap gap-4'>
                            <Link to={`${userInfo.rollno}/profile`}><img className='w-7 h-7 rounded-full' src={chat.image} alt='userimage'/></Link>
                            <span className="font-bold hidden sm:block ">{chat.user}:</span>
                            <span className="flex flex-shrink" dangerouslySetInnerHTML={{ __html: chat.text}}></span>
                                <button className="hidden sm:block"onClick={()=>handleLike(chat._id)} >
                                <Badge content={chat.likes} color='white' className='font-bold'>
                                    <AiFillLike color='gold' size={25} className='border-none'  />
                                </Badge>
                                </button>
                        </div>
                        <span className="text-xs sm:text-sm">{new Date(chat.date).toLocaleTimeString()}</span>
                    </div>
                    ))}
                </div>
                <div className="flex justify-between gap-5">
                    <input
                    className="w-full text-black p-2 border-2"
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    />
                    <div className='flex  gap-2'>
                      <button onClick={handleToggleEmojiPicker} className="hidden sm:block">
                      😀
                      </button>
                      <button onClick={handleSendMessage}>
                      <FaPaperPlane className="bg-white" color='green' size={20}/>
                      </button>
                    </div>
                    <div  className="absolute bottom-20">
                      {showEmojiPicker && (
                            <EmojiPicker  onEmojiClick={handleSelectEmoji} onClick={handleSelectEmoji}/>
                        )}

                    </div>
                </div>
            </CardBody>
      </Card>
    </div>
  );
};

export default Chat;