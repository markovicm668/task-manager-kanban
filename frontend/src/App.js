import { BrowserRouter, Routes, Route } from "react-router-dom";
import Boards from "./pages/Boards";
import SingleBoard from "./pages/SingleBoard";
import "./styles/app.scss";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/boards" element={<Boards />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/boards/:id" element={<SingleBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
