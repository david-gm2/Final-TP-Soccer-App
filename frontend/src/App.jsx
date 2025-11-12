import Header from "./components/Header.jsx";
import PlayersPage from "./Pages/PayersPage.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/players" element={<PlayersPage />} />
         <Route path="/log-in" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
