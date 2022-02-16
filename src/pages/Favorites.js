import classes from "./Favorites.module.css";
import { useContext } from "react";
import FavoritesContext from "../store/favorites_context";
import MeetupList from "../components/meetups/MeetupList";

const FavoritesPage = () => {
  const favContext = useContext(FavoritesContext);
  let content;
  if (favContext.favCounts === 0) {
    content = (
      <p className={classes.noFavs}>
        You got no favorites yet. Try adding some
      </p>
    );
  } else {
    content = (
      <ul>
        {favContext.favorites.map((meetup) => {
          return <MeetupList meetup={meetup} key={meetup.id} />;
        })}
      </ul>
    );
  }
  return (
    <section className={classes.mainContainer}>
      <h2>Favorites Page</h2>
      {content}
    </section>
  );
};
export default FavoritesPage;
