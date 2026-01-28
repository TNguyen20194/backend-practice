import express from "express"
import cors from "cors"

const app = express();

app.use(express.json());

let users = [
    {
        id: 1,
        username: "test",
        email: "test@email.com",
        age: 15
    }
]

app.get("/", (req, res) => {
    res.send({msg: "GET request to the homepage"})
});

app.get("/users", (req, res) => {
    return res.status(200).send({
        message: "Users successfully retrieved",
        data: users
    })
});

app.post("/users", (req,res) => {
    const reqNewUser = req.body;
 
    if(!reqNewUser || !reqNewUser.username) {
        return res.status(400).send({
            message: "username is required"
        })
    };

    const existingUsers = users.find(user => user.username === reqNewUser.username);

    if(existingUsers) {
        return res.status(409).send({
            message: "User already exists",
            data: existingUsers
        })
    };

    users = [...users, reqNewUser];

    return res.status(201).send({
         message: "User created",
         data: reqNewUser
    });
});



export default app;