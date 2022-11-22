const jwtToken = require("jsonwebtoken");
const {Login} = require("../Login") ;

// console.log(Login);

const auth = (req , res , next) => {
    try {
    const verify = jwtToken.verify(req.body.token , "iosrewqdhiplrtiehisowqasnvgxzlir")
        console.log(verify);
    } catch {
        res.status(400).json({
            status:false ,
            message:"Token Invalid"
        })
    }
    
// next()
}

module.exports = auth ; 