import Header from "./components/Header.jsx";
import PlayersPage from "./Pages/PayersPage.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/players" element={<PlayersPage />} />
      </Routes>
    </>
  );
}

export default App;
