import express from "express";
import { getFiles } from "../db/queries/file.js";

const fileRouter = express.Router();
export default fileRouter;

// /files
fileRouter.get("/", async (req, res) => {
  try {
    res.send( await getFiles());
  } catch (err) {
    console.error("Error fetching files:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
