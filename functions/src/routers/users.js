import jwt from "jsonwebtoken";
import db from "../dbConnect/dbConnect.js";
import { secretKey } from "../dbConnect/credentials.js";
import crypto from "crypto";
import { ObjectId } from "mongodb";

export async function createUser(req, res) {
  let { email, password } = req.body;
  email = email.toLowerCase()
  let encryptedPassword = crypto
    .createHash("md5")
    .update(password)
    .digest("hex");
  const user = await db
    .collection("users")
    .insertOne({ email, password: encryptedPassword, favoritePets: [] })
    .catch((err) => res.status(500).send(err));
  const token = jwt.sign({ email, id: user.id }, secretKey);
  res.send({ token, email });
}
// }
export async function loginUser(req, res) {
  let { email, password } = req.body;
  email = email.toLowerCase();
  let encryptedPassword = crypto
    .createHash("md5")
    .update(password)
    .digest("hex");
  const user = await db
    .collection("users")
    .findOne({ email: email, password: encryptedPassword });
  if (user) {
    const token = jwt.sign({ email: user.email, id: user._id }, secretKey, {
      expiresIn: "1h",
    });
    res.send({ token, email });
  } else {
    res.status(401).send("Invalid username or password");
    return;
  }
}

export async function updateFavoriteList(req, res) {
  const token = req.headers.authorization;
  try {
    const validToken = jwt.verify(token, secretKey);
    // console.log(validToken);
    let id = new ObjectId(validToken.id);
    const user = await db.collection("users").findOne({ _id: id });
    if (user.favoritePets.includes(cats.id) === false) {
      user.favoritePets.push();
    }
  } catch (err) {
    res.status(500).send(err);
  }
}
