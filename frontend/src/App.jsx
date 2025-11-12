import { Routes, Route } from "react-router-dom";
import Login from "./Pages/LogIn.jsx";
import SignUp from "./Pages/SignUp.jsx";

function App() {
  return (
    <Routes>
      <Route path="/log-in" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
}

export default App;
