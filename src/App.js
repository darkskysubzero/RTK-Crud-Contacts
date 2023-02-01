import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import Info from "./pages/Info";

function App() {



  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/info/:id" element={<Info />} />
      </Routes>
    </div>
  );
}

export default App;
