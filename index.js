import express from "express";
import {getCats, getDogs, addCat, addDog} from "./src/functions.js";

const app = express();
const PORT = 4012;

app.use(express.json());

app.get("/cats", getCats);
app.post("/add-cat", addCat);
app.get("/dogs", getDogs);
app.post("/add-dog", addDog)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost: ${PORT}`);
});