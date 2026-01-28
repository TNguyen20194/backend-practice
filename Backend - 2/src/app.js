import express from "express"
import cors from "cors"
import UserRouter from "./routes/user.routes.js"
import NoteRouter from "./routes/note.routes.js"

const app = express();

app.use(express.json());
app.use(cors())

// Users route
app.use("/users", UserRouter);

// Notes route
app.use("/notes", NoteRouter);

export default app;