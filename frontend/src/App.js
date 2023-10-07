import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Navbar
import Backoffice from "./components/Navbar/Backoffice";
import TravelAgent from "./components/Navbar/Travel Agent";

// Import Ticket Booking Management Componets
import TicketBooking from "./components/Ticket Booking Management/NewReservations";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/backoffice" element={<Backoffice />} />
        <Route path="/travelagent" element={<TravelAgent />} />

        {/* Ticket Booking Management */}
        <Route path="/ticketbooking" element={<TicketBooking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
