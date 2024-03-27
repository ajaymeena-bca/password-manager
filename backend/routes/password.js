import express from "express";
import { allPassword, del, getSingle, newPassword, update } from "../controllers/password.js";





const app = express.Router();


// app.get('/', (req, res) => {
//      res.send("Hello ")
// });

//Route - /api/v1/password
app.post('/create', newPassword)  

app.get('/all', allPassword)  


app.route('/:id').get(getSingle).put(update).delete(del);


export default app;