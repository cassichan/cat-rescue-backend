import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import {
  getDogs,
  getCats,
  addCat,
  addDog,
  updateDog,
  updateCat,
  //  ,deleteCat, deleteDog,
  getStrayCats,
  getStrayDogs,
} from "./src/routers/routers.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/cats", getCats);
app.get("/get-new-cat", getStrayCats);
// app.get("/get-one-cat")
app.post("/add-cat", addCat);
app.get("/dogs", getDogs);
app.get("/get-new-dog", getStrayDogs);
app.post("/add-dog", addDog);
app.patch("/cat", updateCat)
app.patch("/dog", updateDog);
// app.delete("/remove-cat/_id", deleteCat)
// app.delete("/remove-dog/_id", deleteDog)

export const api = functions.https.onRequest(app);
