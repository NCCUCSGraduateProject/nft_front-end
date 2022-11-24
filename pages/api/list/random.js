// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import MongoApp from "../config/mongo";
const MONGO_DBNAME = process.env.MONGODB_DBNAME;
export default async function handler(req, res) {
    const { number } = req.query
    if (req.method === "GET") {
        if (number < 1) {
            res.status(400).json({ error: "number can not < 1" })
        };
        const client = MongoApp;
        const database = client.db(MONGO_DBNAME);
        const recData = database.collection("recData");

        const query = [{ "$sample": { size: parseInt(number) } }];
        const result = await recData.aggregate(query).toArray();
        res.status(200).json(result);
    }
}
