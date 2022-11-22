const express = require("express");
const postApi = express.Router();
const postSchema = require("./PostSchema")


postApi.get("/" , async(req , res) => {
     
    try {
        const dataForPost = await postSchema.find({})
        if(dataForPost){
          let a = []
          for(let i of dataForPost) {
            let json = {
              id:i.id,
              imageUrl:i.imageUrl,
              description:i.description,
              name:i.name,
              url:i.urlAvatar
            };
            a.push(json);
          }

          // console.log(a);

            res.status(200).json({
                status:true,
                data:a.reverse()
            })
        } else {
          res.status(400).json({
            status:false,
            message:"No Data Found"
          })
        }
    } 
    catch(e) {
        res.status(500).json({
            status:false,
            message:"SomeThing Went Wrong"
          })
    }
    
})

module.exports = postApi;