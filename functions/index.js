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
  deleteCat,
  deleteDog,
  getStrayCats,
  getStrayDogs,
  getOneCat
} from "./src/routers/routers.js";
import { createUser, loginUser } from "./src/routers/users.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/cats", getCats);
app.get("/get-new-cat", getStrayCats);


app.get("/cats/:_id", getOneCat)
// app.get("/cats/:catId", getOneCat)



app.post("/add-cat", addCat);
app.get("/dogs", getDogs);
app.get("/get-new-dog", getStrayDogs);
app.post("/add-dog", addDog);
app.patch("/cat", updateCat);
app.patch("/dog", updateDog);
app.delete("/remove-cat", deleteCat);
app.delete("/remove-dog", deleteDog);

app.post('/users', createUser);
app.post('/users/login', loginUser);

export const api = functions.https.onRequest(app);
