const shortid=require('shortid')
const URL=require("../MODEL/user")

async function handelGenerateNewShortUrl(req,res){
    const body=req.body;
    console.log(body,'errtoooo')
    if(!body.url) return res.status(404).json({error:"url not found"})
    const shortID=shortid();
     await  URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[]

     })
     return res.render('home',{
        id:shortID
     })
}
   async function handelgetanalytic(req,res){
    const  shortId=req.params.shortId
    const result=await URL.findOne({shortId})
    return res.json({
        totalClick:result.visitHistory.length,
        analytics:result.visitHistory
    })
}
async function handelvisthistoryAndUpdate(req,res){
    const shortId=req.params.shortId
    const entry=await URL.findOneAndUpdate({shortId},{
        $push:{
            visitHistory:{timestamp:Date.now()}
        }
    })
    console.log(entry,"hhhhhhhhh")
    res.redirect(entry.redirectURL)
}
module.exports={
    handelGenerateNewShortUrl,
    handelgetanalytic,
    handelvisthistoryAndUpdate
}