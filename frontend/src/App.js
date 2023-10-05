import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Ticket Booking Management/Text";

function App() {
  
  return (
    <BrowserRouter>
 
    {/* <NavBar/> */}

      <Routes>
        {/* ---------------Admin--------------- */}
        <Route path="/" element={<Home />} />
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
