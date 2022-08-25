import { MongoClient, ServerApiVersion } from "mongodb";

import { uri } from "./credentials.js";

export const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});