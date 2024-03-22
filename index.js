const express=require('express')
const {connectMongoDb}=require('./connection')
const urlRouter=require('./Routs/url')
const staticrouter = require("./Routs/staticrouter")
const path=require('path')
const URL=require('./MODEL/user')
const app=express();
const PORT=8001;

connectMongoDb('mongodb://127.0.0.1:27017/URL-Shortner').then(()=>{
    console.log("mongo db connected")
})


app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set("view engine",'ejs')
app.set("views",path.resolve('./views'))

app.use('/url',urlRouter) 
app.use('/',staticrouter)

app.get('/red/:shortId',async(req,res)=>{
    const shortId=req.params.shortId
    const entry=await URL.findOneAndUpdate({shortId},{
        $push:{
            visitHistory:{timestamp:Date.now()}
        }
    })
    res.redirect(entry.redirectURL)
})

app.listen(PORT, ()=>console.log(`Server started at Port:${PORT}`))