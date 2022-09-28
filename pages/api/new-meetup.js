import { MongoClient } from "mongodb";

const mongoPw = process.env.REACT_APP_MongoDB_PW;

//This code only runs in the server side!!! It is safe to store credentials
const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      `mongodb+srv://jccifuentes21:${mongoPw}@cluster0.qxm2z48.mongodb.net/meetups?retryWrites=true&w=majority`
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup Inserted!" });
  }
};

export default handler;
