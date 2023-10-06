const mongoose=require('mongoose');
const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const multer=require('multer');
const AdminRouter=require('./routes/adminRoutes');
const authRouter=require('./routes/authRoutes');
const userRouter=require('./routes/userRoutes');
const msgRouter=require('./routes/msgRoutes');
const eventRouter=require('./routes/eventRoutes');
const clubRouter=require('./routes/clubRoutes');
const chatRouter=require('./routes/chatRoutes');
const docRouter=require('./routes/docRouter')
const connectDB=require('./db/connectDB');
const { Server } = require("socket.io");
const http = require("http");
const Chat = require('./models/chatModel');
const app = express();
dotenv.config();
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB in bytes
  },
});
app.use(cors());
app.use(express.json());
//socket server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log("A new user has connected", socket.id);

  // Listen for incoming messages from clients
  socket.on("message", async(newMessage) => {
    // Broadcast the message to all connected clients
    const chats=await Chat.find({});
    if(chats.length>100){
      await Chat.deleteMany({});
    }
    const result=new Chat({
      user:newMessage.user,
      text:newMessage.text,
      likes:newMessage.likes,
      image:newMessage.image,
      date:newMessage.date,
    });
    await result.save();
    io.emit("message", newMessage);
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log(socket.id, " disconnected");
  });
});




app.use("/api/auth",upload.single("image"), authRouter);
app.use("/api/admin",upload.single("image"), AdminRouter);
app.use("/api/users",userRouter);
app.use("/api/chat",chatRouter);
app.use("/api/msgs",msgRouter);
app.use("/api/verify",upload.single("image"),docRouter)
app.use("/api/clubs",clubRouter);
app.use("/api/events",eventRouter);




const port = process.env.PORT || 5000;

// Start the server
const start = async () => {
  try {
    await connectDB();
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();