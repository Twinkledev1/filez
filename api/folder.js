import { createFiles } from "./queries/file";
import { getFolders, getFolderByIdIncludingFiles } from "./db/queries/folder";
import express from "express";

const folderRouter = express.Router();
export default folderRouter;

folderRouter.get("/", async (req, res) => {
  try {
    res.send(await getFolders());
  } catch (err) {
    console.error("Error fetching folders:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

folderRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const folder = await getFolderById(id);

    if (!folder) {
      return res.status(404).send("folder does not exist");
    }
    return res.send(folder);
  } catch (err) {
    console.error("Error fetching folders:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

folderRouter.post("/:id/files", async(req, res)=>{
try{
    const { id } = req.params;

    const folder = await getFolderByIdIncludingFiles(id);

    if(!folder){
        return res.status(404).send("Folder id required");
    }
    if(!req.body || Object.keys(req,res).length === 0){
        return res.status(400).send("Request body is required");
    }


    // Check Request body is missing required fields

    const name = req.body.name;
    const size = Number(req.body.size);

    if (!name || name.trim() === ""){
        return res.status(400).send("Name is required");
    }
    if (!size){
        return res.status(400).send("Size is required");
    }
    const files = await createFiles({name,size});
    res.status(201).json(files);
}
catch(err){
    console.error("Error crating files",err)
}

});
