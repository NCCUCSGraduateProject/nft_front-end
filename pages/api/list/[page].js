// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from "mongodb"
const MONGO_URL = process.env.MONGODB_URL;
const MONGO_DBNAME = process.env.MONGODB_DBNAME;

const DIVIDE = 20;
export default async function handler(req, res) {
    const { page } = req.query
    if (req.method === "GET") {
        if (page < 1) {
            res.status(400).json({ error: "page can not < 1" })
        } const client = new MongoClient(MONGO_URL, { useNewUrlParser: true });
        const database = client.db(MONGO_DBNAME);
        const recData = database.collection("recData");

        const query = [{ "$skip": (page - 1) * DIVIDE }, { "$limit": DIVIDE }];
        const result = await recData.aggregate(query).toArray();
        res.status(200).json(result);
    }
}
