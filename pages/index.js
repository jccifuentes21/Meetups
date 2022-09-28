import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A first meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg/1024px-Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg",
    address: "Some address 12, 2344 some city",
    description: "This is a first meetup",
  },
  {
    id: "m2",
    title: "A second meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg/1024px-Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg",
    address: "Some address 12, 2344 some city",
    description: "This is a second meetup",
  },
  {
    id: "m3",
    title: "A third meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg/1024px-Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg",
    address: "Some address 12, 2344 some city",
    description: "This is a third meetup",
  },
];

const Homepage = (props) => {
  return <MeetupList meetups={props.meetups} />;
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
export const getStaticProps = async () =>{
  return {
    props: {
      meetups: DUMMY_MEETUPS
    },
    //Revalidate regenerates this page on the server at least every n seconds if there are requests for the page.
    revalidate: 100
  }
}

export default Homepage;
