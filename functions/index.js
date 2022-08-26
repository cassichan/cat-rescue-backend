import functions from "firebase-functions";
import express from "express";
import cors from "cors"
import {getDogs, getCats, addCat, addDog, deleteCat, deleteDog} from "./src/routers/routers.js"


const app = express();

app.use(express.json());
app.use(cors())

app.get("/cats", getCats);
app.post("/add-cat", addCat);
app.get("/dogs", getDogs);
app.post("/add-dog", addDog);
// app.patch("/dog/:_id", updateDog)
// app.patch("/cat/:_id", updateCat)
app.delete("/cats/:_id", deleteCat)
app.delete("/dogs/:_id", deleteDog)

export const api = functions.https.onRequest(app);