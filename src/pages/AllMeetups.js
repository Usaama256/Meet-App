import classes from "./AllMeetups.module.css";
import MeetupList from "../components/meetups/MeetupList";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

import { useState, useEffect } from "react";
import { readData } from "../store/firebase";
import { useNavigate } from "react-router-dom";

// import image1 from "../components/images/136.jpg";
// import image2 from "../components/images/159.jpg";
// import image3 from "../components/images/160.jpg";
// import image4 from "../components/images/136.jpg";
// const DummuyMeets = [
//   {
//     id: "m1",
//     title: "My First Date",
//     image: image1,
//     address: "North Hill Restaurant",
//     description:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, at.",
//   },
//   {
//     id: "m2",
//     title: "Fish",
//     image: image2,
//     address: "City Side Lake",
//     description:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, at.",
//   },
//   {
//     id: "m3",
//     title: "Touring",
//     image: image3,
//     address: "Dubai Desert",
//     description:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, at.",
//   },
//   {
//     id: "m4",
//     title: "Lets Go Hike",
//     image: image4,
//     address: "Western Mountain Ranges",
//     description:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, at.",
//   },
// ];

const AllMeetupsPage = () => {
  const [isLoading, setIsLoading] = useState(true); //Controls the loading state
  const [loadedMeetups, setLoadedMeetups] = useState([]); //Stores fetched meetups
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    firebase
      .database()
      .ref(`meetups/`)
      .on("value", (snapshot) => {
        console.log(snapshot.val());
        const data = snapshot.val();
        var meetups = [];
        for (const key in data) {
          const meetup = {
            ...data[key],
          };
          meetups.push(meetup);
          setLoadedMeetups(meetups);
          setIsLoading(false);
          navigate("/");
        }
      });
  }, [navigate]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   setLoadedMeetups(readData("meetups"));
  //   if (loadedMeetups.length === 0) {
  //     setIsLoading(true);
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, [loadedMeetups.length]);

  //useEffect runs the code in the function only when the dependencies in [] are changed
  // useEffect(() => {
  //   // setIsLoading(true);
  //   // //Getting All Meetups from API server
  //   // fetch("https://meetup-b0c3c-default-rtdb.firebaseio.com/meetups.json")
  //   //   .then((response) => {
  //   //     return response.json();
  //   //   })
  //   //   .then((data) => {
  //   //     const meetups = [];
  //   //     for (const key in data) {
  //   //       const meetup = {
  //   //         id: key,
  //   //         ...data[key],
  //   //       };
  //   //       meetups.push(meetup);
  //   //     }
  //   //     //console.log(data, meetups);
  //   //     setIsLoading(false);
  //   //     setLoadedMeetups(meetups);
  //   //   });
  // }, []);

  if (isLoading) {
    return (
      <section className={classes.mainContainer}>
        <h2>All Meetups</h2>
        <div className={classes.loading}>
          Loading<p className={classes.periods}>....</p>
        </div>
      </section>
    );
  } else {
    return (
      <section className={classes.mainContainer}>
        <h2>All Meetups</h2>
        <ul>
          {loadedMeetups.map((meetup) => {
            return (
              <MeetupList
                meetup={meetup}
                // title={meetup.title}
                // location={meetup.address}
                // info={meetup.description}
                // img={meetup.image}
                // id={meetup.id}
                key={meetup.id}
              />
            );
          })}
        </ul>
      </section>
    );
  }
};
export default AllMeetupsPage;

/*    <img src={DummuyMeets.image1} alt="" />
      <img src={require("../components/images/22.jpg").default} alt="" /> 
      Importing Images directly */
