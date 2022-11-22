const express = require("express");
const mongo = require("mongoose");
const Registration = require("./registrationSchema");
const bcrypt = require("bcryptjs");
const appLogin = express.Router();
const jwtToken = require("jsonwebtoken");

const login = new mongo.Schema({
    email:{
        type:String,
        required:[true , "This Field is required"]
    } ,
    password: {
        type:String,
        required:[true , "This Field is required"]
    },
    date: {
        type: Date,
		default: Date.now,
    },
    Token: {
        type:String
    }

})

login.methods.generateToken = async function(next) {
    try {
        const token = await jwtToken.sign({email:this.email} , "iosrewqdhiplrtiehisowqasnvgxzlir");
        return token;
        next();
    } catch(e) {
        res.status(404).json({
            status:true ,
            message:"SomeThing Went Wrong"
        })
    }
    
}
  

const Login = mongo.model("login" , login);

appLogin.post("/" , async (req , res) => {
    const findingDataFromRegistration = await Registration.findOne({email: req.body.email })
    if(findingDataFromRegistration) {
        const passwordTrueOrFalse = await bcrypt.compare(req.body.password , findingDataFromRegistration.Password);
        if(passwordTrueOrFalse){
            try {
                 const storeLoginInfo = new Login(req.body) 
                 
                //  console.log(storeLoginInfo)

                //generating Token
                 const tokenGenerate = await storeLoginInfo.generateToken();

                 storeLoginInfo.Token = tokenGenerate;
                 
                //  try {
                //     res.cookie("jwt" , tokenGenerate , {
                //         expires: new Date(Date.now() + 60000),
                //         httpOnly:true,
                //       //   secure:true
                //    })

                //    console.log(cookie)

                //  } catch (e) {
                //     console.log("Error In Cookies ")
                //  }
                 
                 const result = await storeLoginInfo.save(); 
                 res.status(200).json({
                    status:true ,
                    message:findingDataFromRegistration,
                    token:tokenGenerate,
                    result:result
                })
            } 
            catch (e) {
                res.status(400).send(e.message);
            }
        } else {
            return res.status(404).json({
                status:false,
                message: "Incorrect Password"
            })
        }        
    } else {
    res.status(404).json({
        status:false,
        message:"Email id does'nt exist"    
    })
    }
   
})

module.exports = {appLogin , Login};
// module.exports = Login;