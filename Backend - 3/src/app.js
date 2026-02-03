import express from "express"
import cors from "cors"
import supabase from "./client/client.js";

const app = express();

app.use(express.json());
app.use(cors())


app.get("/users", async (req, res) => {
    const { data, error } = await supabase
    .from("users")
    .select();

    console.log(data)
});

app.post("/signup/", async (req, res) => {
    const user = req.body;

    // validate if user already exists, then return early

    const { data, error } = await supabase
    .from("users")
    .insert(user)
    .select();

    console.log(data)
});

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