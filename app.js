import express from "express";
import fileRouter from "./api/files.js";
import folderRouter from ".api/folder.js";

const app = express();
export default app;

// Body parsing middleware for JSON requests
app.use(express.json());

app.get("/", (req, res) => {
  res.send("File and Folder application");
});

app.use("/files", fileRouter);
app.use("/folders", folderRouter);
