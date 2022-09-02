// import { client } from "../dbConnect/dbConnect.js";
import { ObjectId } from "mongodb";
import db from "../dbConnect/dbConnect.js";
// import { secretKey } from "../credentials.js";

const cats = db.collection("real-cats");
const dogs = db.collection("real-dogs");

//Get only the cats at a rescue (ready for adoption)
export const getCats = async (req, res) => {
  const query = { rescue: { $exists: true } };
  const allCats = await cats
    .find(query)
    .toArray()
    .catch((err) => res.status(500).send(err));
  res.json(allCats);
};

//Get cats without rescue name (not ready for adoption)
export const getStrayCats = async (req, res) => {
  const query = { rescue: { $exists: false } };
  const strayCats = await cats
    .find(query)
    .toArray()
    .catch((err) => res.status(500).send(err));
  res.json(strayCats);
};

//Get one cat
export const getOneCat = async (req, res) => {
  // console.log(req.query);
  // let id = new ObjectId(req.query._id);
  let id = new ObjectId(req.query._id);
  // console.log(`This is the id after Objectid: ${id}`);
  let oneCat = await cats
    // .findOne({ _id: id}, { $set: req.body })
    .findOne({ _id: id });
  // .toArray((thisCat) => {
  //   res.json(thisCat);
  res
    .json(oneCat)
    // })
    .catch((err) => res.status(500).send(err));
};

//Get dogs at rescue/shelter (ready for adoption)
export const getDogs = async (req, res) => {
  const query = { rescue: { $exists: true } };
  const allDogs = await dogs
    .find(query)
    .toArray()
    .catch((err) => res.status(500).send(err));
  res.json(allDogs);
};

//Get dogs without a rescue name (not yet ready for adoption)
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
  console.log(req.query);
  let id = new ObjectId(req.query._id);
  console.log(`This is the id after Objectid: ${id}`);
  await cats.findOneAndUpdate({ _id: id }, { $set: req.body });
  res.json("Cat updated");
};

export const updateDog = async (req, res) => {
  console.log(req.query);
  let id = new ObjectId(req.query._id);
  console.log(`This is the id after Objectid: ${id}`);
  await dogs.findOneAndUpdate({ _id: id }, { $set: req.body });
  res.json("Dog updated");
};

export const deleteCat = async (req, res) => {
  let id = new ObjectId(req.query._id);
  await cats.findOneAndDelete({ _id: id }, { $set: req.body });
  res.json("Cat deleted");
};

export const deleteDog = async (req, res) => {
  let id = new ObjectId(req.query._id);
  await dogs.findOneAndDelete({ _id: id }, { $set: req.body });
  res.json("Dog deleted");
};

//Get all cats
// export const getCats = async (req, res) => {
//   const allCats = await cats
//     .find()
//     .toArray()
//     .catch((err) => res.status(500).send(err));
//   res.json(allCats);
// };

//Get all dogs
// export const getDogs = async (req, res) => {
//   const allDogs = await dogs
//     .find()
//     .toArray()
//     .catch((err) => res.status(500).send(err));
//   res.json(allDogs);
// };
