import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import sequelize from './config/database.js'; 
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App Config
const app = express()
const port = process.env.PORT || 4000

connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
  res.send("API Working")
})

// Sync DB and start server
sequelize.sync({ alter : true })
  .then(() => {
    console.log("MySQL DB connected & synced");
    app.listen(port, () => console.log(`Server is now running on port ${port} `));
  })
  .catch((err) => {
    console.error("DB sync error ❌: ", err);
  });
