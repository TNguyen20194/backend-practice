import { Router } from "express"

const router = Router();

let users = [
    {
        id: 1,
        username: "test",
        email: "test@email.com",
        age: 15
    }
]

router.get("/", (req, res) => {
    return res.status(200).send({
        message: "Users successfully retrieved",
        data: users
    })
});

router.post("/", (req,res) => {
    const userObj = req.body;

    if(!userObj || !userObj.username) {
        return res.status(400).send({
            message: "No username was sent with this request"
        })
    };

    const existingUsers = users.find(user => user.username === userObj.username);

    if(existingUsers) {
        return res.status(409).send({
            message: "User already exists",
            data: existingUsers
        })
    };

    users = [...users, userObj];

    return res.status(201).send({
         message: "User created",
         data: userObj
    });
});

router.patch("/", (req, res) => {
    const { username, email, age } = req.body;

    const existingUsers = users.find(user => user.username === username);

    if(!existingUsers) {
        return res.status(404).send({
            message: "User not found",
        })
    };

    const isAlreaduUpdated = (email === undefined || email === existingUsers.email) && (age === undefined || existingUsers.age === age);

    if(isAlreaduUpdated) {
        return res.status(409).send({
            message: "No changes detected. User already up to date."
        })
    }

    const updatedUser = users.map((user) => {
        if(user.username === username) {
            const newUser = {...user, email: email, age: age};

            return newUser
        } else {
            return user;
        };
    })

    users = updatedUser;

    return res.status(200).send({
        message: "User successfully updated",
        data: users
    })
})

router.delete("/", (req, res) => {
    const userObj = req.body;

    if(!userObj || !userObj.username) {
        return res.status(400).send({
            message: "No username was sent with this request"
        })
    };

    const existingUsers = users.find(
        user => user.username === userObj.username
    )

    if(!existingUsers) {
        return res.status(400).send({
            message: "User not found or already removed",
        })
    }

    const filteredUser = users.filter((user) =>
        user.username !== userObj.username);

    users = filteredUser;

    return res.status(200).send({
        message: "User successfully removed",
        data: users
    })
});

export default router;