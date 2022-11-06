import { ObjectId } from "mongodb";
import db from "../dbConnect/dbConnect.js";
import jwt from "jsonwebtoken";
import { secretKey } from "../dbConnect/credentials.js";

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
  let id = new ObjectId(req.params._id);
  let oneCat = await cats
    .findOne({ _id: id })
    .catch((err) => res.status(500).send(err));
  res.json(oneCat);
};

// Get one dog
export const getOneDog = async (req, res) => {
  let id = new ObjectId(req.params._id);
  let oneDog = await dogs
    .findOne({ _id: id })
    .catch((err) => res.status(500).send(err));
  res.json(oneDog);
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

//Add cat
export const addCat = async (req, res) => {
  const newCat = req.body;
  const query = { rescue: { $exists: false } };
  await cats.insertOne(newCat);
  const allCats = await cats
    .find(query)
    .toArray()
    .catch((err) => res.status(500).send(err));
  res.json(allCats);
};

//Add dog
export const addDog = async (req, res) => {
  const newDog = req.body;
  const query = { rescue: { $exists: false } };
  await dogs.insertOne(newDog);
  const allDogs = await dogs
    .find(query)
    .toArray()
    .catch((err) => res.status(500).send(err));
  res.json(allDogs);
};

//Update cat
export const updateCat = async (req, res) => {
  const token = req.headers.authorization;
  const user = jwt.verify(token, secretKey);
  if (!user 
    // || !token
    ){
    res.status(400).send({ success: false, message: "Not authorized" });
    return;
  }
  let id = new ObjectId(req.query._id);
  await cats.findOneAndUpdate({ _id: id }, { $set: req.body });
  res.json("Cat updated" + id);
};

//Update dog
export const updateDog = async (req, res) => {
  const token = req.headers.authorization;
  const user = jwt.verify(token, secretKey);
  // console.log(req.query);
  if (!user) {
    res.status(400).send("Not authorized");
  }
  console.log(req.query);
  let id = new ObjectId(req.query._id);
  console.log(`This is the id after Objectid: ${id}`);
  await dogs.findOneAndUpdate({ _id: id }, { $set: req.body });
  res.json("Dog updated");
};

// //Delete cat
// export const deleteCat = async (req, res) => {
//   let id = new ObjectId(req.query._id);
//   await cats.findOneAndDelete({ _id: id }, { $set: req.body });
//   res.json("Cat deleted");
// };

// //Delete dog
// export const deleteDog = async (req, res) => {
//   let id = new ObjectId(req.query._id);
//   await dogs.findOneAndDelete({ _id: id }, { $set: req.body });
//   res.json("Dog deleted");
// };
