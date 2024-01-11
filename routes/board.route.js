const {Router}=require("express");
const boardRoute=Router()
const {boardModel}=require("../models/board.model")

boardRoute.post("/board", async(req,res)=>{
    try {
        const {AuthorName,NoticeTitle,NoticeDestination,date}=req.body;
        let newboard=new boardModel({AuthorName,NoticeTitle,NoticeDestination,date})
        await newboard.save()
        res.status(200).send({ "success": true, "message": "Trello board registered successfully"})
    } catch (error) {
        res.status(400).send({"error":error.message})
    }
})



boardRoute.get("/board",async(req,res)=>{
    try {
        const board = await boardModel.find();
        res.status(200).send({ success: true, message: "you successfully get Trello board details", data:board});
      } catch (error) {
        res.status(400).send({ error: error.message });
      }
})

boardRoute.delete("/board/:id",async(req,res)=>{
    try {
        const boardId = req.params.id;
        let board=await boardModel.findByIdAndDelete(boardId);
        res.status(200).send({success:true,message:"board is delete"});
      } catch (error) {
        res.status(400).send({ success: false, error: error.message });
      }
})

boardRoute.patch("/board/:id", async (req, res) => {
    try {
        const boardId = req.params.id;
        const updatedData = req.body; 

        
        let board = await boardModel.findByIdAndUpdate(boardId, updatedData, { new: true });

        if (!board) {
            return res.status(404).send({ success: false, message: "Board not found" });
        }

        res.status(200).send({ success: true, message: "Board is updated", board });
    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }
});

module.exports={boardRoute}

