import express from "express"
import cors from "cors"
import UserRouter from "./routes/user.routes.js"

const app = express();

app.use(express.json());
app.use(cors())

app.use("/users", UserRouter)


export default app;