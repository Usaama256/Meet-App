import NewMeetUpForm from "../components/meetups/NewMeetupForm";
import classes from "./NewMeetUp.module.css";
import { addData } from "../store/firebase";
//import { useNavigate } from "react-router-dom";

const NewMeetupModal = (props) => {
  // const navigateAway = useNavigate();

  const addMeetupDataHandler = (newMeetupData) => {
    //Adding Data to firebase firestore
    addData(newMeetupData, "meetups", newMeetupData.id);
    //console.log(newMeetupData);
    //Sending New meet up data to an API
    // fetch("https://meetup-b0c3c-default-rtdb.firebaseio.com/meetups.json", {
    //   method: "POST",
    //   body: JSON.stringify(newMeetupData),
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    // }).then(navigateAway("/"));
    //props.onCancel(); //Removes the new meetup modal and overlay
  };
  return (
    <section className={classes.mainContainer}>
      <h2>Add New Meetup</h2>
      <NewMeetUpForm
        onAddMeetupData={addMeetupDataHandler}
        onCancel={props.onCancel}
      />
    </section>
  );
};

export default NewMeetupModal;
