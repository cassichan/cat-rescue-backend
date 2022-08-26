import { client } from "../dbConnect/dbConnect.js";

export const getCats = (req, res) => {
    client.connect((err) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      const collection = client
        .db("animals")
        .collection("real-cats");
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

  export const getDogs = (req, res) => {
    client.connect((err) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      const collection = client
        .db("animals")
        .collection("real-dogs");
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
        .collection("real-cats");
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
        .collection("real-dogs");
      collection.insertOne(newDog, (err, result) => {
        if (err) res.status(500).send(err);
        if (result) res.json(result);
        client.close();
      });
    });
  };

export function deleteCat(req, res) {
    const {_id} = req.params;
    res.status(203).send("Cat has been deleted from system.")
}

export function deleteDog(req, res) {
  const {_id} = req.params;
  res.status(203).send("Dog has been deleted from system.")
}