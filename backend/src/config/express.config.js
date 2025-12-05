const express = require('express')
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get("/api/test" , (req,res)=>{
    res.json("suraj ghawk ghawk")
} )

module.exports = app;