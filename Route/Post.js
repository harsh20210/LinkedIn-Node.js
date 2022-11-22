const express = require("express");
const postApi = express.Router();
const postApiSchema = require("./PostSchema")

postApi.post("/" , async(req , res) => {
    // console.log(req.body);
   
    try {
       const data = new postApiSchema(req.body);
       const result = await data.save();
       console.log(result);
       
       if(result._id) {
        res.status(200).json({
            status:true,
            message:"data Insert successfully"
           })
       } else {
        res.status(400).json({
            status:false,
            message:"Data Not Insert successfully"
        })
       }
    } 
    catch (e) {
        // console.log(e.message)
        res.status(500).json({
            status:false,
            message:e.message
        })
    }
})

module.exports = postApi;