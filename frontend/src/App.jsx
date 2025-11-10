import Header from "./components/Header.jsx";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/LogIn.jsx";

function App() {
  return (
    <>
      <Login></Login>
    </>
    // <Routes>
    //   <Route path="/register" element={<Login />} />
    //   <Route path="/contact" element={<Contact />} />
    // </Routes>
  );
}

export default App;
