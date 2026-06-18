import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import TaskManagement from "./pages/TaskManagement";
import TaskAllocation from "./pages/TaskAllocation";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoutes/index.jsx";

function App() {
  return (
    <div className=" ">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Profile />} />
            <Route path="/tasks" element={<TaskManagement />} />
            <Route path="/task-allocation" element={<TaskAllocation />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
