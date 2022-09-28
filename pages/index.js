import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

const mongoPw = process.env.REACT_APP_MongoDB_PW;

const Homepage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active meetups!"/>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

//This function runs for every single incoming request, only use when you REALLY need access to the req, or if you need to update data that changes very frequently
// export const getServerSideProps = async(context) =>{
//   //Access to request and response from backend !
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

//code run here is executed during the build process, so it will never reach the visitors side --- Data fetching for pre rendering
export const getStaticProps = async () => {
  //Data coming from a database
  const client = await MongoClient.connect(
    `mongodb+srv://jccifuentes21:${mongoPw}@cluster0.qxm2z48.mongodb.net/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    //Revalidate regenerates this page on the server at least every n seconds if there are requests for the page.
    revalidate: 100,
  };
};

export default Homepage;
