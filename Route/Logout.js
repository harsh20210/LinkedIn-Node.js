const express = require("express");
const logout = express.Router();
const {Login} = require("../Route/Login"); 

logout.post( "/" , async(req , res) => {
   
   try {
      const token = await Login.find({token:req.body.token})
      
      console.log("Token ......." , token);

      console.log("get NAme ====>   " , token[0].email)

     
      const removeToken = await Login.deleteOne({email:token[0].email})
      
      console.log("RemoveToken  ......." , removeToken);
      

      console.log("Delete count  =======>>>>>    ",removeToken.deletedCount)
      if(removeToken.deletedCount > 0) {
         res.status(200).json({
            status:true,
            message:"Logout Successfully"
         })
      } else {
         res.status(200).json({
            status:false,
            message:"Something went wrong"
         })
      }
   } 
   catch(err) {
      res.status(500).json({
         status:false,
         message:err
      })
   }
} )

module.exports = logout;