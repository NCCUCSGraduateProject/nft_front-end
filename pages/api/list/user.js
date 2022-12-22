// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import MongoApp from "../config/mongo";
const MONGO_DBNAME = process.env.MONGODB_DBNAME;
export default async function handler(req, res) {
    const page = parseInt(req.query.page)
    const divide = parseInt(req.query.divide)
    if (req.method === "GET") {
        if (page < 1) {
            res.status(400).json({ error: "page can not < 1" })
        };

        const client = MongoApp;
        const database = client.db(MONGO_DBNAME);
        const recData = database.collection("u2i");

        const query = [{ "$skip": (page - 1) * divide }, { "$limit": parseInt(divide) }];
        const result = await recData.aggregate(query).toArray();

        res.status(200).json(result);
    }
}
