const mongo = require("mongoose");
const bcrypt = require("bcryptjs");

const registrationSchema = new mongo.Schema({
    name: {
        type:String,
        required:[true , "name Filed is required"]
    },
    url:String,
    email: {
        type:String,
        required:[true , "This Field is required"],
        unique: true
    },
    Password :{
       type:String,
       required:[true , "Password can'nt be empty"]
    },
    ConformPassword: {
        type:String,
    }
})

registrationSchema.pre("save" , async function(next){
    
    if(this.isModified("Password")) {
        try {
            const bcryData = await bcrypt.hash(this.Password , 10);
            // console.log("hasing ===>>> " , bcryData);
            this.Password = bcryData;
            // console.log("dcrypt Password =====>>>>> ",this.Password)
        } catch(e) {
            console.log("Something Went wrong can not bcrypt the password")
        }
    }
    next();
})

const Registration = mongo.model("registration" , registrationSchema)

module.exports = Registration;