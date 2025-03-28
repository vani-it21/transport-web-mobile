import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
import Login from "./assets/structures/Login";
import UserDashboard from "./assets/structures/UserDashboard";
import VDashboard from "./assets/AdminPages/VDashboard";
import Vehicles from "./assets/AdminPages/Vehicles";
import AddDrivers from "./assets/AdminPages/AddDrivers";
import AddVehicles from "./assets/AdminPages/AddVehicles";
import FuelMileage from "./assets/AdminPages/FuelMileage";
import VehicleBookings1 from "./assets/AdminPages/VehicleBookings1";
import VehicleForm from "./assets/AdminPages/VehicleForm";
import VUpdates from "./assets/AdminPages/VUpdates";
import VList from "./assets/AdminPages/VList";
import Drivers from "./assets/AdminPages/Drivers";
import DutyMapping from "./assets/AdminPages/DutyMapping";
import Logout from "./assets/AdminPages/Logout";
import Notifications from "./assets/AdminPages/Notifications";
import Purchase from "./assets/AdminPages/Purchase";
import Settings from "./assets/AdminPages/Settings";
import SalaryUpdation from "./assets/AdminPages/SalaryUpdation";
import ServiceUpdate from "./assets/AdminPages/ServiceUpdate";
import Owndashboard from "./assets/AdminPages/Owndashboard";
import LeaveManagement from "./assets/AdminPages/LeaveManagement";

// Define Props for ProtectedRoute
interface ProtectedRouteProps {
  role: string | null;
  requiredRole: string;
}

// Protected Route Component
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role, requiredRole }) => {
  return role === requiredRole ? <Outlet /> : <Navigate to="/" replace />;
};

function App() {
  // Get user data from localStorage safely
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? (JSON.parse(storedUser) as { role?: string }) : null;

  return (
   
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute role={user?.role || null} requiredRole="admin" />}>
          <Route path="/admin" element={<VDashboard />} />
          <Route path="/Vehicles" element={<Vehicles />} />
          <Route path="/AddDrivers" element={<AddDrivers />} />
          <Route path="/AddVehicles" element={<AddVehicles />} />
          <Route path="/FuelMileage" element={<FuelMileage />} />
          <Route path="/Vehiclebookings1" element={<VehicleBookings1 />} />
          <Route path="/vehicle-form" element={<VehicleForm />} />
          <Route path="/Vehicle-update" element={<VUpdates />} />
          <Route path="/Vehicle-List" element={<VList />} />
          <Route path="/Drivers" element={<Drivers />} />
          <Route path="/DutyMapping" element={<DutyMapping />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/Notifications" element={<Notifications />} />
          <Route path="/Purchase" element={<Purchase />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/SalaryUpdate" element={<SalaryUpdation />} />
          <Route path="/ServiceUpdate" element={<ServiceUpdate />} />
          <Route path="/Owndashboard" element={<Owndashboard />} />
          <Route path="/leave" element={<LeaveManagement />} />
        </Route>

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute role={user?.role || null} requiredRole="user" />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Route>

        {/* Redirect Unknown Routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

  );
}

export default App;
