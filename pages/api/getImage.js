// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import MongoApp from "./config/mongo"
const MONGO_DBNAME = process.env.MONGODB_DBNAME;

export default async function handler(req, res) {
    const { uri } = req.query
    if (req.method === "GET") {
        // Create a new MongoClient
        const client = MongoApp;
        const database = client.db(MONGO_DBNAME);
        const recData = database.collection("recData");
        const recDataQuery = [{ "$match": { uri } }];
        const recDataResult = await recData.aggregate(recDataQuery).toArray();

        const data = {
            image_url: recDataResult[0].image_url,
            image_preview_url: recDataResult[0].image_preview_url,
            name: recDataResult[0].name,
            description: recDataResult[0].description,
            uri: recDataResult[0].uri,
        }
        res.status(200).json(data);
    }
}
