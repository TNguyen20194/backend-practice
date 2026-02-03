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


router.delete("/:id", async(req, res) => {
    const id = Number(req.params.id);

    if(isNaN(id)) {
        return res.status(400).send({
            msg: "Invalid user id"
        })
    };

     //supabase returns {data, error}

    const {data, error} = await supabase
    .from("users")
    .delete()
    .eq("id", id)
    .select();

    console.log(data)

    if(error) {
        console.error(error);
        return res.status(500).send({
            msg: "Failed to delete user"
        })
    };


    if(data.length === 0){
        return res.status(404).send({
            msg: "User not found or already removed"
        })
    };

    return res.status(200).send({
        msg: "User deleted successfully",
        deletedUser: data[0]
    });

    console.log(response)
})

export default router;