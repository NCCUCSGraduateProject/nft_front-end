import { MongoClient } from "mongodb";
const ENV = process.env.ENVIRONMENT;
const MONGO_URL = ENV === "local" ? process.env.MONGODB_URL : process.env.MONGODB_REMOTE_URL;

const client = new MongoClient(MONGO_URL, { useNewUrlParser: true });

export default client;