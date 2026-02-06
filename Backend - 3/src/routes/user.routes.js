import { Router } from "express";
import supabase from "../client/client.js";
import userController from "../controllers/user.controller.js";

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

    const { first_name, last_name, email, password } = user;

    if(!first_name || !last_name || !email || !password) {
        return res.status(404).send({
            msg: "Missing required fields."
        })
    };

    const { data, insertError } =  await userController.signUp(first_name, last_name, email, password);


    if(insertError) {
        console.error(insertError)
        return res.status(500).send({
            msg: "Failed to create user"
        })
    };

    return res.status(200).send({
        msg: "User created successfully",
        data: data
    })

});


router.post("/login", async (req, res) => {
    const dataObj = req.body;

    const { email, password } = dataObj;

    if(!email || !password) {
        return res.status(404).send({
            msg: "Missing required fields."
        })
    };

   const { existingUsers, error} =  await userController.signIn(email, password);

    if(error) {
        console.error(error);
        return res.status(500).send({
            msg: "Login failed."
        })
    };

    if(!existingUsers || existingUsers.length === 0) {
        return res.status(401).send({
            msg: "Invalid email or password"
        })
    };

    return res.status(200).send({
        msg: "Login successfully",
        data: existingUsers
    })
});


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