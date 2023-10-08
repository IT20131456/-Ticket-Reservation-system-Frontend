import { BrowserRouter, Routes, Route } from "react-router-dom";


import TravelerManagement from "./components/Traveler Management/IT20128036/TravelerCreateProfile";

//Import Home Pages
import TravelAgentHome from "./components/Home/TravelAgentHome";
import BackofficeHome from "./components/Home//BackofficeHome";


// Import Ticket Booking Management Componets
import NewReservations from "./components/Ticket Booking Management/NewReservation";
import UpdateReservation from "./components/Ticket Booking Management/UpdateReservation";
import ViewReservations from "./components/Ticket Booking Management/ViewResrvations";


import LandingPage from "./components/LandingPage/LandingPage";
import EmployeeLogin from "./components/Login/EmployeeLogin";
import AdminLogin from "./components/Login/AdminLogin";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ---------------Admin--------------- */}
       
        <Route path="/traveler" element={<TravelerManagement />} />
        



        <Route path="/" element={<LandingPage />} />
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />

      {/* Home Pages */}
        <Route path="/travelagenthome" element={<TravelAgentHome />} />
        <Route path="/backofficehome" element={<BackofficeHome />} />


        {/* Ticket Booking Management */}
        <Route path="/newreservation" element={<NewReservations />} />
        <Route path="/updatereservation" element={<UpdateReservation />} />
        <Route path="/viewreservations" element={<ViewReservations />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
