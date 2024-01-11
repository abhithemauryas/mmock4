const mongoose=require("mongoose");

const boardSchema=mongoose.Schema({
    AuthorName:{type:String},
    NoticeTitle:{type:String},
    NoticeDestination:{type:String},
    date: {type: Date,},
},{
    versionKey:false,
    timestamps:true
})

const boardModel=mongoose.model("board",boardSchema)

module.exports={boardModel}