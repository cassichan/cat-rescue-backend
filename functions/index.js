import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import {
  getDogs,
  getCats,
  addCat,
  addDog,
  updateDog,
  //  ,deleteCat, deleteDog,
  getStrayCats,
  getStrayDogs,
} from "./src/routers/routers.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/cats", getCats);
app.get("/get-new-cat", getStrayCats);
app.post("/add-cat", addCat);
app.get("/dogs", getDogs);
app.get("/get-new-dog", getStrayDogs);
app.post("/add-dog", addDog);
app.patch("/dog/:_id", updateDog);
// app.patch("/cat/_id", updateCat)
// app.delete("/remove-cat/_id", deleteCat)
// app.delete("/remove-dog/_id", deleteDog)

export const api = functions.https.onRequest(app);
