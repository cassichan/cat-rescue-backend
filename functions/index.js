import functions from "firebase-functions";
import express from "express";
import cors from "cors"
import {getDogs, getCats, addCat, addDog} from "./src/routers/routers.js"


const app = express();

app.use(express.json());
app.use(cors())

app.get("/cats", getCats);
app.post("/add-cat", addCat);
// app.patch("/:_id", updateCat)
app.get("/dogs", getDogs);
app.post("/add-dog", addDog);
// app.patch("/:_id", updateDog)

export const api = functions.https.onRequest(app);