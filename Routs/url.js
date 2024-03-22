const express=require('express')
const {handelGenerateNewShortUrl,handelgetanalytic, handelvisthistoryAndUpdate}=require('../CONTROLLER/Url')
const router=express.Router()

router.post('/',handelGenerateNewShortUrl)
router.get('/analytic/:shortId',handelgetanalytic)
router.get('/:shortId',handelvisthistoryAndUpdate)
//  router.get('/:shortId')


module.exports=router