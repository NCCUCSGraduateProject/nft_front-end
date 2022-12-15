// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import MongoApp from "../config/mongo";
const MONGO_DBNAME = process.env.MONGODB_DBNAME;
export default async function handler(req, res) {
    const { number } = req.query
    if (req.method === "POST") {
        if (number < 1) {
            res.status(400).json({ error: "number can not < 1" })
        };
        const { likeList } = req.body;
        const uriList = likeList.map((item) => item.uri);
        const client = MongoApp;
        const database = client.db(MONGO_DBNAME);
        const assetData = database.collection("asset_rawdata");
        const recData = database.collection("i2i");

        const query = [{ "$match": { "uri": { "$in": uriList } } }];
        const result = await recData.aggregate(query).toArray();

        const recommendNumber = Math.floor(number / uriList.length);
        const recommendData = result.map((item) => item.recommend.slice(0, recommendNumber));
        const recommendList = recommendData.flat();
        
        console.log(recommendList.length)
        if (recommendList.length < number) {
            console.log(number)
            const randomNumber = number - recommendList.length;
            const queryRandom = [{ "$sample": { "size": randomNumber } }];
            const resultRandom = await recData.aggregate(queryRandom).toArray();
            const randomList = resultRandom.map((item) => item.uri);
            recommendList.push(...randomList);
        }

        const queryRecommend = [{ "$match": { "uri": { "$in": recommendList } } }];
        const resultRecommend = await assetData.aggregate(queryRecommend).toArray();

        // Shuffle
        Array.prototype.shuffle = function () {
            let i = this.length;
            while (i) {
                let j = Math.floor(Math.random() * i);
                let t = this[--i];
                this[i] = this[j];
                this[j] = t;
            }
            return this;
        }
        res.status(200).json(resultRecommend.shuffle());
    }
}
