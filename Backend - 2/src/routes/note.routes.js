import { Router } from "express"

const router = Router();

let notes = [];
let nextId = 1;

/*
{
    id: number,
    title: string,
    content: string,
    archived: boolean
}

*/

const sendResponse = (res, status, message, data = null) => {
    return res.status(status).send(
        {
            msg: message,
            data: data
        }
    )
}

// GET all notes
router.get("/", (req, res) => {
    return res.status(200).send({
        msg: "Notes successfully retrieved",
        data: notes
    })
});

// GET one note by ID
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    if(isNaN(id)) {
        return sendResponse(res, 400, "Invalid id. Must be a number");
    };

    const note = notes.find(note => note.id === id);

    if(!note) {
        return sendResponse(res, 404, "Note not found")
    };

    return sendResponse(res, 200, "Note found", note);
});

// CREATE Note
router.post("/", (req, res) => {
    console.log("POST route")
});

// UPDATE note
router.patch("/:id", (req, res) => {
    // Body
});

// DELETE note
router.delete("/:id", (req, res) => {
    // Body
});

export default router;