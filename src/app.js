import express from "express";
import cors from "cors";
import UserRouter from "./routes/user.routes.js";

const app = express();
app.use(express.json());
app.use(cors());


app.use("/users", UserRouter);

app.get("/", (req, res) => {
    res.send({msg: "Health Check"});
});


export default app;