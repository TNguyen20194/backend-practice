import { Router } from "express";
import supabase from "../client/client.js";

const router = Router();

router.get("/", async (req, res) => {
    const { data, error } = await supabase
    .from("users")
    .select();

    console.log(data)
});


router.post("/signup", async(req, res) => {
    const user = req.body;

    console.log(user)

      // validate if user already exists, then return early

    const {data, error } = await supabase
    .from("users")
    .insert(user)
    .select();

    console.log(data)
})

export default router;