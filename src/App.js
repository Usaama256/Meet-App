import AppContentLayout from "./components/layout/ContentLayout";
import PageRoutes from "./pages/PageRoutes";
import { fireInit } from "./store/firebase";

const App = () => {
  fireInit(); //Initiallizing Firebase

  return (
    <div>
      <AppContentLayout>
        <PageRoutes />
      </AppContentLayout>
    </div>
  );
};

export default App;
