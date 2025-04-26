import { Routes, Route } from "react-router-dom";
import About from "../pages/About";
import Login from "../pages/Login";
import Assistance from "../pages/Assistance";
import WeeklyActions from "../pages/WeeklyActions";
import Notifications from "../pages/Notification";
import MeetingSummariser from "../pages/meetingSummariser";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Assistance />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/assistance" element={<Assistance />} />
      <Route path="/weekly-actions" element={<WeeklyActions />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/meetings" element={<MeetingSummariser />} />
    </Routes>
  );
};

export default AppRoutes;
