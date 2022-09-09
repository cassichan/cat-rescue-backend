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
  getOneCat,
  getOneDog,
} from "./src/routers/routers.js";
import { createUser, loginUser } from "./src/routers/users.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/cats", getCats);
app.get("/get-stray-cats", getStrayCats);

app.get("/cats/:_id", getOneCat);
app.get("/dogs/:_id", getOneDog);

app.post("/add-cat", addCat);
app.get("/dogs", getDogs);
app.get("/get-stray-dogs", getStrayDogs);
app.post("/add-dog", addDog);
app.patch("/update-cat", updateCat);
app.patch("/update-dog", updateDog);
app.delete("/remove-cat", deleteCat);
app.delete("/remove-dog", deleteDog);

app.post("/users", createUser);
app.post("/users/login", loginUser);

export const api = functions.https.onRequest(app);
