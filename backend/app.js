import express from "express";
import mongoose from 'mongoose'
import blogrouter from "./routes/blog-routes";
 import router from "./routes/user-routes";

 const app = express();
 app.use(express.json())

 app.use("/api/user",router)
 app.use("/api/blog",blogrouter)


mongoose.connect("mongodb://localhost:27017/replicaSet=rs/ Blog")
.then(() => app.listen(5000)).then(()=>console.log("listen")).catch((err)=> console.log(err));
// app.listen(5000);