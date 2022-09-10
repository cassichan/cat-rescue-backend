import jwt from "jsonwebtoken";
import db from "../dbConnect/dbConnect.js";
import { secretKey } from "../dbConnect/credentials.js";

export async function createUser(req, res) {
  let { email, password } = req.body;
  email = email.toLowerCase();
  const user = await db
    .collection("users")
    .insertOne({ email, password })
    .catch((err) => res.status(500).send(err));
  const token = jwt.sign({ email, id: user.id }, secretKey);
  res.send({ token });
}

export async function loginUser(req, res) {
  let { email, password } = req.body;
  email = email.toLowerCase();
  const user = await db
    .collection("users")
    .find({ email: email, password: password })
    .toArray();

  if (user) {
    const token = jwt.sign({ email: user.email, id: user.id }, secretKey);
    res.send({ token });
  } else {
    res.status(401).send("Wrong username and password")
  }
}
