const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const multer=require('multer')
const path=require("path")
const cookieParser=require('cookie-parser')
const authRoute=require('./routes/auth')
const userRoute=require('./routes/users')
const postRoute=require('./routes/posts')
const commentRoute=require('./routes/comments')
const bodyParser=require('body-parser')
const Razorpay = require('razorpay');
const crypto = require('crypto');

//database
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database is connected successfully!")

    }
    catch(err){
        console.log(err)
    }
}



//middlewares
dotenv.config()
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)

//image upload
const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
        // fn(null,"image1.jpg")
    }
})

const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    // console.log(req.body)
    res.status(200).json("Image has been uploaded successfully!")
})

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID ,// Replace with your Razorpay key
    key_secret: process.env.RAZORPAY_KEY_SECRET, // Replace with your Razorpay secret
  });
  
  // Endpoint to create an order
  app.post('/create-order', async (req, res) => {
    const { amount, currency, receipt } = req.body;
  
    try {
      const options = {
        amount: amount, // amount in smallest currency unit (paise for INR)
        currency: currency || 'INR',
        receipt: receipt,
        payment_capture: 1, // auto capture payment
      };
  
      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  });
  
  // Endpoint to verify payment
  app.post('/verify-payment', (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    // Create the expected signature
    const generatedSignature = crypto
      .createHmac('sha256', 'YOUR_RAZORPAY_KEY_SECRET') // Replace with your Razorpay secret
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');
  
    // Compare the signatures
    if (generatedSignature === razorpay_signature) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });



app.listen(process.env.PORT,()=>{
    connectDB()
    console.log("app is running on port "+process.env.PORT)
})