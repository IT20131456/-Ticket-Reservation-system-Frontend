import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Ticket Booking Management/Text";
import TravelerManagement from "./components/Ticket Booking Management/IT20128036/TravelerCreateProfile";

function App() {
  
  return (
    <BrowserRouter>
 
    {/* <NavBar/> */}

      <Routes>
        {/* ---------------Admin--------------- */}
        <Route path="/" element={<Home />} />
        <Route path="/traveler" element={<TravelerManagement />} />
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
