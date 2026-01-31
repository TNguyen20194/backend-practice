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
    const { title, content } = req.body;

    if(!title || !content) {
        return res.status(400).send({
            msg: "Title and content are required."
        })
    };

    const existingNote = notes.find(note => note.title === title)

    if(existingNote) {
        return res.status(409).send({
            msg: "Note already created",
            data: existingNote
        })
    }

    const newNote = {
        id: nextId++,
        title,
        content,
        archived: false
    };

    notes = [...notes, newNote];

    return res.status(200).send({
        msg: "Note created",
        data: newNote
    })
});

// UPDATE note
router.patch("/:id", (req, res) => {
    // Body
});

// DELETE note
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    if(isNaN(id)) {
        return sendResponse(res, 400, "Invalid id. Must be a number");
    };

    const existingNote = notes.find(note => note.id === id);

    if(!existingNote) {
        return res.status(404).send({
        msg: "Note not found or already removed."
    });
    };

    const filteredNotes = notes.filter(note => note.id !== id);

    notes = filteredNotes;

    return res.status(200).send({
        msg: "Note successfully removed.",
        data: notes
    });

});

export default router;