import { client } from "../dbConnect/dbConnect.js";

export const getCats = (req, res) => {
    client.connect((err) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      const collection = client
        .db("animals")
        .collection("cats");
      collection.find().toArray((err, result) => {
        if (err) res.status(500).send(err);
        if (result) res.json(result);
        client.close();
      });
    });
  };

  //Update favorite
  // export const updateCat = (req, res) => {
  //   const {_id} = req.params;
  //   const {favorite} = req.body;
  //   const collection = client
  //   .db("animals")
  //   .collection("cats")
  //   collection.findOneAndUpdate(_id, favorite)
  // }

  export const getDogs = (req, res) => {
    client.connect((err) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      const collection = client
        .db("animals")
        .collection("dogs");
      collection.find().toArray((err, result) => {
        if (err) res.status(500).send(err);
        if (result) res.json(result);
        client.close();
      });
    });
  };

  export const addCat = (req, res) => {
    client.connect((err) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      const newCat = req.body;
      const collection = client
        .db("animals")
        .collection("cats");
      collection.insertOne(newCat, (err, result) => {
        if (err) res.status(500).send(err);
        if (result) res.json(result);
        client.close();
      });
    });
  };

  export const addDog = (req, res) => {
    client.connect((err) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      const newDog = req.body;
      const collection = client
        .db("animals")
        .collection("dogs");
      collection.insertOne(newDog, (err, result) => {
        if (err) res.status(500).send(err);
        if (result) res.json(result);
        client.close();
      });
    });
  };