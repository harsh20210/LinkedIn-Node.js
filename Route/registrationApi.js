// const Registration = require("./registrationSchema");
const { json } = require("express");
const express = require("express");
const RegistrationSchema = require("./registrationSchema");
const appForReg = express.Router();

// console.log("done,dlfkds")

appForReg.post("/" , async(req , res) => {
     
    if(req.body.dataChangeForReg.Password === req.body.dataChangeForReg.ConformPassword ) {
        try {
            const regis = new RegistrationSchema({
                name: req.body.dataChangeForReg.name,
                url:req.body.dataChangeForReg.url,
                email:req.body.dataChangeForReg.email,
                Password:req.body.dataChangeForReg.Password,
                // ConformPassword:req.body.dataChangeForReg.ConformPassword
            })
        
             const result = await regis.save();
             
             res.status(200).json({
                status:true,
                message:"your account has been successfully created",
                record:result
             });
        }
        catch(e) {
            // console.log(e.message.toString().include('duplicate'))
            res.status(404).send(`${e.message.toString().includes('duplicate') ? "Email already exists" : e.message }` );
        }
    } else {
        res.status(404).send("Password and Conform Password Doe'nt match....")
    }
   
  
  

    //  console.log(regis);

    // console.log("Request body ====>>> ",req.body);
    // return res.status(200).send(req.body.dataChangeForReg.name)
})

module.exports = appForReg;