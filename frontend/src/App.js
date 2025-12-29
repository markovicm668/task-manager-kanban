import { BrowserRouter, Routes, Route } from "react-router-dom";
import Boards from "./pages/Boards";
import SingleBoard from "./pages/SingleBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/boards" element={<Boards />} />
        <Route path="/boards/:id" element={<SingleBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
