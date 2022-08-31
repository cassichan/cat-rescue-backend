// import { client } from "../dbConnect/dbConnect.js";
import { ObjectId } from "mongodb";
import db from "../dbConnect/dbConnect.js";

const cats = db.collection("real-cats");
const dogs = db.collection("real-dogs");

//Get all cats
// export const getCats = async (req, res) => {
//   const allCats = await cats
//     .find()
//     .toArray()
//     .catch((err) => res.status(500).send(err));
//   res.json(allCats);
// };

//Get only the cats at a rescue (that have rescue name)
export const getCats = async (req, res) => {
  const query = { rescue: { $exists: true } };
  const allCats = await cats
    .find(query)
    .toArray()
    .catch((err) => res.status(500).send(err));
  res.json(allCats);
};

//Get cats without rescue name
export const getStrayCats = async (req, res) => {
  const query = { rescue: { $exists: false } };
  const strayCats = await cats
    .find(query)
    .toArray()
    .catch((err) => res.status(500).send(err));
  res.json(strayCats);
};

//Get all dogs
// export const getDogs = async (req, res) => {
//   const allDogs = await dogs
//     .find()
//     .toArray()
//     .catch((err) => res.status(500).send(err));
//   res.json(allDogs);
// };

//Get dogs at rescue/shelter (one with rescue name)
export const getDogs = async (req, res) => {
  const query = { rescue: { $exists: true } };
  const allDogs = await dogs
    .find(query)
    .toArray()
    .catch((err) => res.status(500).send(err));
  res.json(allDogs);
};

//Get dogs without a rescue name
export const getStrayDogs = async (req, res) => {
  const query = { rescue: { $exists: false } };
  const strayDogs = await dogs
    .find(query)
    .toArray()
    .catch((err) => res.status(500).send(err));
  res.json(strayDogs);
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

export const updateCat = async (req, res) => {
  console.log(req.query)
  let id = new ObjectId(req.query._id)
console.log(`This is the id after Objectid: ${id}`)
  await cats.findOneAndUpdate({_id: id}, {$set: req.body});
  res.json("Cat updated");
  // res.send(updatedDog);
};

export const updateDog = async (req, res) => {
  console.log(req.query)
  let id = new ObjectId(req.query._id)
console.log(`This is the id after Objectid: ${id}`)
  await dogs.findOneAndUpdate({_id: id}, {$set: req.body});
  res.json("Dog updated");
  // res.send(updatedDog);
};

export const deleteCat = async (req, res) => {
  let id = new ObjectId(req.query._id)
  await cats.findOneAndDelete({_id: id}, {$set: req.body})
  res.json("Cat deleted")
}

// export function deleteDog(req, res) {
//   // const { _id } = req.query;
//   await dogs.findOneAndDelete(req.query)
//   const allTheDogsAfterDelete = await dogs.find().toArray()
//   res.json(allTheDogsAfterDelete);
// }
