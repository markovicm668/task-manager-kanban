import { BrowserRouter, Routes, Route } from "react-router-dom";
import Boards from "./pages/Boards";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/boards" element={<Boards />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
