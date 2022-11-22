const express = require('express');
const del = express.Router();
const postData = require("./PostSchema");

del.get("/:id" , async (req , res) => {
    console.log("Id ==> " , typeof req.params.id  )
    if(req.params.id != "") {
       console.log("In If ====>>>>>> " , req.params.id);
        try {
            const data = await postData.deleteOne({id:req.params.id})
            console.log("Deleted Data ==>>>" , data);
            if(data.deletedCount) {
                res.status(200).json({
                    status:false,
                    message:"Data Deleted successfully!"
                })
            } else {
                res.status(200).json({
                    status:false,
                    message:"Item not deleted!"
                })
            }
    
            console.log("Delete Count ==>> ",data.deletedCount);
        } catch(e) {
            res.status(404).json({
                status:false,
                message:"Operation Can'nt be performed"
            })
        }
    } else {
        res.status(404).json({
            status:false,
            message:"Id Required"
        })
    }
})

module.exports = del;