// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from "mongodb"
const MONGO_URL = process.env.MONGODB_URL;
const MONGO_DBNAME = process.env.MONGODB_DBNAME;

export default async function handler(req, res) {
    const { uri } = req.query
    if (req.method === "GET") {
        // Create a new MongoClient
        const client = new MongoClient(MONGO_URL, { useNewUrlParser: true });
        const database = client.db(MONGO_DBNAME);
        const recData = database.collection("recData");
        const query = [{ "$match": { uri: uri.join("/") } }];
        const result = await recData.aggregate(query).toArray();
        res.status(200).json(result[0]);
    }
}
