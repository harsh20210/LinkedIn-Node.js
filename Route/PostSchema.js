const mongo = require("mongoose");

const postSchema = new mongo.Schema({
    id:{
        type:String,
        required:[true , "Id Filed is required"]
    },
    description: {
        type:String
    },
    imageUrl: {
        type:String
    },
    name: {
        type:String,
        required:[true , "name Filed is required"]
    },
    urlAvatar: {
        type:String
    }
})

const PostCollection = mongo.model("postData" , postSchema);

module.exports = PostCollection;