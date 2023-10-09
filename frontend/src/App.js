import { BrowserRouter, Routes, Route } from "react-router-dom";

import TravelerManagement from "./components/Traveler Management/IT20128036/TravelerCreateProfile";
import TravelerProfiles from "./components/Traveler Management/IT20128036/RetriveTravelerProfiles";
import ViewTravelerProfile from "./components/Traveler Management/IT20128036/TravelerProfile";
import UpdateTravelerProfile from "./components/Traveler Management/IT20128036/UpdateTravelerProfile";

// Import Navbar
import Backoffice from "./components/Navbar/Backoffice";
import TravelAgent from "./components/Navbar/Travel Agent";

// Import Ticket Booking Management Componets
import TicketBooking from "./components/Ticket Booking Management/NewReservations";
import LandingPage from "./components/LandingPage/LandingPage";
import EmployeeLogin from "./components/Login/EmployeeLogin";
import AdminLogin from "./components/Login/AdminLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ---------------Admin--------------- */}

        <Route path="/traveler" element={<TravelerManagement />} />
        <Route path="/travelerprofiles" element={<TravelerProfiles />} />
        <Route
          path="/viewtravelerprofile/:id"
          element={<ViewTravelerProfile />}
        />
        <Route
          path="/updatetravelerprofile/:id"
          element={<UpdateTravelerProfile />}
        />

        <Route path="/" element={<LandingPage />} />
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/backoffice" element={<Backoffice />} />
        <Route path="/travelagent" element={<TravelAgent />} />

        {/* Ticket Booking Management */}
        <Route path="/ticketbooking" element={<TicketBooking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
