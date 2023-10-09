import { BrowserRouter, Routes, Route } from "react-router-dom";


import TravelerManagement from "./components/Traveler Management/IT20128036/TravelerCreateProfile";


// Import Navbar
import Backoffice from "./components/Navbar/Backoffice";
import TravelAgent from "./components/Navbar/Travel Agent";

// Import Ticket Booking Management Componets
import NewReservations from "./components/Ticket Booking Management/NewReservations";


import LandingPage from "./components/LandingPage/LandingPage";
import EmployeeLogin from "./components/Login/EmployeeLogin";
import AdminLogin from "./components/Login/AdminLogin";
import AddTrainSchedule from "./components/TrainManagement/AddTrainSchedule";
import ViewTrainSchedule from "./components/TrainManagement/ViewTrainSchedule";



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
        <Route path="/newreservation" element={<NewReservations />} />

        <Route path="/trainschedule/add" element={<AddTrainSchedule />} />
        <Route path="/trainschedule/view" element={<ViewTrainSchedule />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
