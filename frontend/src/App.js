import { BrowserRouter, Routes, Route } from "react-router-dom";


import TravelerManagement from "./components/Traveler Management/IT20128036/TravelerCreateProfile";


// Import Navbar
import Backoffice from "./components/Navbar/Backoffice";
import TravelAgent from "./components/Navbar/Travel Agent";

// Import Ticket Booking Management Componets
import TicketBooking from "./components/Ticket Booking Management/NewReservations";
import LandingPage from "./components/LandingPage/LandingPage";
import EmployeeLogin from "./components/Login/EmployeeLogin";
import AdminLogin from "./components/Login/AdminLogin";
import TravelAgentRegistration from "./components/Registration/TravelAgentRegistration";
import BackOfficeStaffRegistration from "./components/Registration/BackOfficeStaffRegistration";
import AllUserView from "./components/UserManagement/AllUserView";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ---------------Admin--------------- */}
       
        <Route path="/traveler" element={<TravelerManagement />} />
        



        <Route path="/" element={<LandingPage />} />
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/backoffice" element={<Backoffice />} />
        <Route path="/travelagent" element={<TravelAgent />} />

        {/* Ticket Booking Management */}
        <Route path="/ticketbooking" element={<TicketBooking />} />

        {/* User Management */}
        <Route path="/backoffice/registration" element={<BackOfficeStaffRegistration />} />
        <Route path="/travelagent/registration" element={<TravelAgentRegistration />} />
        <Route path="/usermanagement" element={<AllUserView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
