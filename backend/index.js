import express from "express";
import Chat from "./Chat.js";

const port = 5131;
const app = express();
app.use(express.json());
new Chat(app);
app.listen(port, () => console.log('Backend running on port ' + port));