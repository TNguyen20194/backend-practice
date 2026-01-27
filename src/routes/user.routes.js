import { Router } from "express";

const router = Router();

let users = [
    {
        username: "Truong",
        email: "tn@email.com",
        age: "30"
    },
    {
        username: "Chris",
        email: "test@email.com",
        age: "30"
    }
]


router.get("/", (req, res) => {
    res.send(users)
})

router.post("/", (req, res) => {
    const userObj = req.body;

    users.push(userObj)

   return res.status(201).send({ success: true, data: users, error: null})

})

router.patch("/", (req, res) => {
    const userObj = req.body;

    const updatedUser = users.map((user) => {
        if(user.username === userObj.username) {
            const newUser = {...user, email: userObj.email}
            return newUser;
        } else {
            return user;
        }
    }
    )

    users = updatedUser;
    
    return res.send(users);
})

router.delete("/", (req, res) => {
    const userObj = req.body;

     if(!userObj.username) {
        return res
        .status(200)
        .send({msg: "Error no username was sent with this request"});
    }

    const filteredUser = users.filter((user) => user.username !== userObj.username)

    users = filteredUser;

    return res.send(users);
})

export default router;