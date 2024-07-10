const mongoose=require('mongoose');

const Schema=mongoose.Schema


const Books=new Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
   
    publishYear:{
        type:Number,
      
    }
},{timestamps:true})

const Book=mongoose.model("Books",Books);

module.exports=Book;