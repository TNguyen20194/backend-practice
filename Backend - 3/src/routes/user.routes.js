import { Router } from "express";
import supabase from "../client/client.js";

const router = Router();

router.get("/", async (req, res) => {
    const { data, error } = await supabase
    .from("users")
    .select();

    console.log(data)
});



export default router;