import { getFolders } from "#db/queries/folder";
import express from "express";

const folderRouter = express.Router();
export default folderRouter; 

folderRouter.get("/", async(req,res)=>{
try{
    res.send(await getFolders())
}
catch (err) {
        console.error("Error fetching folders:", err);
        res.status(500).json({ error: "Internal server error" });
}
});

folderRouter.get("/:id", async(req,res)=>{
    try{
        if (!folder){
            return res.status(400).send("folder does not exist")
        }
    }
    catch (err) {
            console.error("Error fetching folders:", err);
            res.status(500).json({ error: "Internal server error" });
    }
    });