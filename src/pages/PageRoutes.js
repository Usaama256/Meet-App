import { Route, Routes } from "react-router-dom";

import AllMeetupsPage from "./AllMeetups";
import FavoritesPage from "./Favorites";
//import NewMeetupPage from "./NewMeetup";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AllMeetupsPage />} />

      {/* <Route path="/new_meet" element={<NewMeetupPage />} /> */}

      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  );
};

export default PageRoutes;
