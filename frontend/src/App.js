import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Navbar
import Backoffice from "./components/Navbar/Backoffice";
import TravelAgent from "./components/Navbar/Travel Agent";

// Import Ticket Booking Management Componets
import NewReservations from "./components/Ticket Booking Management/NewReservations";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/backoffice" element={<Backoffice />} />
        <Route path="/travelagent" element={<TravelAgent />} />

        {/* Ticket Booking Management */}
        <Route path="/newreservation" element={<NewReservations />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
