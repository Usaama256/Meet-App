import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

export const fireInit = () => {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBOixX5nG1K3lunYPXA6zok4Sh15PNeFWU",
    authDomain: "meetup-b0c3c.firebaseapp.com",
    databaseURL: "https://meetup-b0c3c-default-rtdb.firebaseio.com",
    projectId: "meetup-b0c3c",
    storageBucket: "meetup-b0c3c.appspot.com",
    messagingSenderId: "308939080919",
    appId: "1:308939080919:web:f36a5b5916e8fc0252dc92",
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
};

//meetup=>JS_Object, id=>meetup_ID, tableName=>Name_of_table
export const deleteData = (tableName, id) => {
  firebase.database().ref(`${tableName}/${id}`).remove();
};

export const addData = (meetup, tableName, id) => {
  firebase.database().ref(`${tableName}/${id}`).set(meetup);
};

export const readData = (tableName) => {
  var tableData = [];
  firebase
    .database()
    .ref(`${tableName}/`)
    .on("value", (snapshot) => {
      console.log(snapshot.val());
      const data = snapshot.val();
      var meetups = [];
      for (const key in data) {
        const meetup = {
          ...data[key],
        };
        meetups.push(meetup);
      }
      console.log(meetups, "IIIIIIIIIIIIM");
      return meetups;
    });
  // console.log(tableData, "After", data);

  return tableData;
};
