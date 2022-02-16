import { createContext, useState, useEffect } from "react";
import { fireInit, addData, readData, deleteData } from "./firebase";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const FavoritesContext = createContext({
  favorites: [],
  favCounts: 0,
  addFavorite: (favMeetup) => {},
  removeFavorite: (meetupId) => {},
  itemIsFavorite: (meetupId) => {},
});

export const FavoritesContextProvider = (props) => {
  fireInit();
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref(`favorites/`)
      .on("value", (snapshot) => {
        console.log(snapshot.val());
        const data = snapshot.val();
        var meetups = [];
        for (const key in data) {
          const meetup = {
            ...data[key],
          };
          meetups.push(meetup);
          setUserFavorites(meetups);
        }
      });
  }, []);

  //setUserFavorites(readData("favorites"));

  // //fetching favorites from API
  // fetch("https://meetup-b0c3c-default-rtdb.firebaseio.com/favorites.json")
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     const favs = [];
  //     for (const key in data) {
  //       const fav = {
  //         id: key,
  //         ...data[key],
  //       };
  //       favs.push(fav);
  //     }
  //     setUserFavorites(favs);
  //   });

  const AddFavHandler = (favMeetup) => {
    //setUserFavorites(userFavorites.concat(favMeetup));

    addData(favMeetup, "favorites", favMeetup.id);

    firebase
      .database()
      .ref(`favorites/`)
      .on("value", (snapshot) => {
        console.log(snapshot.val());
        const data = snapshot.val();
        var meetups = [];
        for (const key in data) {
          const meetup = {
            ...data[key],
          };
          meetups.push(meetup);
          setUserFavorites(meetups);
        }
      });

    // //Adding Favorite to API database
    // fetch("https://meetup-b0c3c-default-rtdb.firebaseio.com/favorites.json", {
    //   method: "POST",
    //   body: JSON.stringify(favMeetup),
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    // }).then(
    //   fetch("https://meetup-b0c3c-default-rtdb.firebaseio.com/favorites.json")
    //     .then((response) => {
    //       return response.json();
    //     })
    //     .then((data) => {
    //       const favs = [];
    //       for (const key in data) {
    //         const fav = {
    //           id: key,
    //           ...data[key],
    //         };
    //         favs.push(fav);
    //       }
    //       setUserFavorites(favs);
    //     })
    // );

    // setUserFavorites((prevUserFavorites) => {
    //   console.log(favMeetup);

    //   return prevUserFavorites.concat(favMeetup);
    // });
  };

  const RemoveFavHandler = (meetupId) => {
    deleteData("favorites", meetupId);

    firebase
      .database()
      .ref(`favorites/`)
      .on("value", (snapshot) => {
        console.log(snapshot.val());
        const data = snapshot.val();
        var meetups = [];
        for (const key in data) {
          const meetup = {
            ...data[key],
          };
          meetups.push(meetup);
          setUserFavorites(meetups);
        }
      });

    // setUserFavorites((prevUserFavorites) => {
    //   return prevUserFavorites.filter((meetup) => meetup.id !== meetupId);
    // });
  };

  const itemIsFavHandler = (meetupId) => {
    return userFavorites.some((meetup) => meetup.id === meetupId);
  };

  const context = {
    favorites: userFavorites,
    favCounts: userFavorites.length,
    addFavorite: AddFavHandler,
    removeFavorite: RemoveFavHandler,
    itemIsFavorite: itemIsFavHandler,
  };

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
