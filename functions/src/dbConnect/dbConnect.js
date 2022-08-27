// import { MongoClient, ServerApiVersion } from "mongodb";
import {MongoClient} from "mongodb"

import { uri } from "./credentials.js";

// export const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });
const client = new MongoClient(uri)
const db = client.db("animals")

export default db;