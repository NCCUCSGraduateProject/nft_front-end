// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import MongoApp from "../config/mongo"
const MONGO_DBNAME = process.env.MONGODB_DBNAME;

export default async function handler(req, res) {
    const { address } = req.query
    if (req.method === "GET") {
        // Create a new MongoClient
        const client = MongoApp;
        const database = client.db(MONGO_DBNAME);
        const recData = database.collection("u2i");
        console.log(address)
        const recDataQuery = [{ "$match": { user_address: address[0] } }];
        const recDataResult = await recData.aggregate(recDataQuery).toArray();

        res.status(200).json({ ...recDataResult[0] });
    }
}
