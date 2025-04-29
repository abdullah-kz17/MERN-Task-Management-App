import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/protectedRoutes/PrivateRoute";
import AdminRoute from "./components/protectedRoutes/AdminRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Header from "./components/layout/Header";
import NotFound from "./pages/NotFound";
import TaskForm from "./components/task/TaskForm";
import TaskDashboard from "./pages/TaskDashboard";
import TaskDetail from "./pages/TaskDetail";
import EditTask from "./pages/EditTask";
import Footer from "./components/layout/Footer";
import UpdateProfile from "./pages/UpdateProfile";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />     
        <Route path="/TaskForm" element={
            <PrivateRoute>
          <TaskForm />
            </PrivateRoute>
          } />
        <Route path="/edit-task-form/:id" element={
          <PrivateRoute>
            <EditTask />
          </PrivateRoute>
          } />
        <Route path="/tasks" element={
          <PrivateRoute>
            <TaskDashboard />
          </PrivateRoute>
          } />
        <Route path="/tasks/:id" element={
          <PrivateRoute>
            <TaskDetail />
          </PrivateRoute>
          } />
        <Route path="/update-profile" element={
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
          } />
        <Route path="*" element={<NotFound />} />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
