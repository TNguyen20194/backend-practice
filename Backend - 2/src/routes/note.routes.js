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
        return res.status(400).send({
            msg: "Invalid id. Must be a number"
        })
    };

    const note = notes.find(note => note.id === id);

    if(!note) {
        return res.status(404).send({
            msg: "Note not found"
        })
    };

    return res.status(200).send({
        msg: "Note found!",
        data: note
    })

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