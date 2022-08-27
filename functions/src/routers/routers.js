// import { client } from "../dbConnect/dbConnect.js";
import db from "../dbConnect/dbConnect.js";

const cats = db.collection("real-cats");
const dogs = db.collection("real-dogs");

export const getCats = async (req, res) => {
  const allCats = await cats
    .find()
    .toArray()
    .catch((err) => res.status(500).send(err));
  res.json(allCats);
};

export const getDogs = async (req, res) => {
  const allDogs = await dogs
    .find()
    .toArray()
    .catch((err) => res.status(500).send(err));
  res.json(allDogs);
};

export const addCat = async (req, res) => {
  const newCat = req.body;
  await cats.insertOne(newCat);
  const allCats = await cats
    .find()
    .toArray()
    .catch((err) => res.status(500).send(err));
  res.json(allCats);
};

export const addDog = async (req, res) => {
  const newDog = req.body;
  await dogs.insertOne(newDog);
  const allDogs = await dogs
    .find()
    .toArray()
    .catch((err) => res.status(500).send(err));
  res.json(allDogs);
};

//Update favorite
// export const updateCat = (req, res) => {
//   const {_id} = req.params;
//   const {favorite} = req.body;
//   const collection = client
//   .db("animals")
//   .collection("real-cats")
//   collection.findOneAndUpdate(_id, favorite)
// }

//Update favorite
// export const updateDog = (req, res) => {
//   const {_id} = req.params;
//   const {favorite} = req.body;
//   const collection = client
//   .db("animals")
//   .collection("real-dogs")
//   collection.findOneAndUpdate(_id, favorite)
// }

export function deleteCat(req, res) {
  const { _id } = req.params;
  res.status(203).send("Cat has been deleted from system.");
}

export function deleteDog(req, res) {
  const { _id } = req.params;
  res.status(203).send("Dog has been deleted from system.");
}
