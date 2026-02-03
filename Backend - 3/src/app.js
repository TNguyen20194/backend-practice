import express from "express"
import cors from "cors"
import UserRouter from "./routes/user.routes.js"

const app = express();

app.use(express.json());
app.use(cors())

app.use("/users", UserRouter)


// app.post("/login", async (req, res) => {
//     const user = req.body;

//     // validate if user already exists, then return early

//     const { data, error } = await supabase
//     .from("users")
//     .insert(user)
//     .select();

//     console.log(data)
// });

export default app;