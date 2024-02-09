const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const {connectDB} =require('./config/db')
const router = require("./router/index")

const PORT = 4000;
const app = express()
app.use(cors())
app.use(express.json())


app.get("/",(req,res)=>{
    res.json({
        mesaage : " server is running"
    })
})

app.use("/api",router)

connectDB().then(()=>{
    app.listen(PORT, ()=> console.log("Server is running"))
}
)
