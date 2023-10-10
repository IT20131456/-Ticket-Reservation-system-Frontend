import { BrowserRouter, Routes, Route } from "react-router-dom";

import TravelerManagement from "./components/Traveler Management/IT20128036/TravelerCreateProfile";

import TravelerProfiles from "./components/Traveler Management/IT20128036/RetriveTravelerProfiles";
import ViewTravelerProfile from "./components/Traveler Management/IT20128036/TravelerProfile";
import UpdateTravelerProfile from "./components/Traveler Management/IT20128036/UpdateTravelerProfile";


//Import Home Pages
import TravelAgentHome from "./components/Home/TravelAgentHome";
import BackofficeHome from "./components/Home//BackofficeHome";



// Import Ticket Booking Management Componets
import NewReservations from "./components/Ticket Booking Management/IT20131456/NewReservation";
import UpdateReservation from "./components/Ticket Booking Management/IT20131456/UpdateReservation";
import ViewReservations from "./components/Ticket Booking Management/IT20131456/ViewResrvations";


import LandingPage from "./components/LandingPage/LandingPage";
import EmployeeLogin from "./components/Login/EmployeeLogin";
import AdminLogin from "./components/Login/AdminLogin";



import TravelAgentRegistration from "./components/Registration/AgentRegistration";
import BackOfficeStaffRegistration from "./components/Registration/OfficeStaffRegistration";
import AllUserView from "./components/UserManagement/AllUserView";
import AddTrainSchedule from "./components/TrainManagement/AddTrainSchedule";
import ViewTrainSchedule from "./components/TrainManagement/ViewTrainSchedule";




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

      {/* Home Pages */}
        <Route path="/travelagenthome" element={<TravelAgentHome />} />
        <Route path="/backofficehome" element={<BackofficeHome />} />


        {/* Ticket Booking Management */}
        <Route path="/newreservation" element={<NewReservations />} />
        <Route path="/updatereservation/:id" element={<UpdateReservation />} />
        <Route path="/viewreservations" element={<ViewReservations />} />

        {/* User Management */}
        <Route path="/backoffice/registration" element={<BackOfficeStaffRegistration />} />
        <Route path="/travelagent/registration" element={<TravelAgentRegistration />} />
        <Route path="/usermanagement" element={<AllUserView />} />
          
          
        <Route path="/trainschedule/add" element={<AddTrainSchedule />} />
        <Route path="/trainschedule/view" element={<ViewTrainSchedule />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
