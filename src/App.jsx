import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import DataLabeling from "./pages/Data_labeling";
import FileList from "./components/DataLabeling/FileManager/FileList";
import DataTable from "./components/DataLabeling/Datalable/DataTable";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";

function App() {
  return (
    <AuthProvider>
      <Navbar /> 
        
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Routes */}
          <Route
            path="/label"
            element={
              <ProtectedRoute>
                <DataLabeling />
              </ProtectedRoute>
            }
          />
          <Route
            path="/files"
            element={
              <ProtectedRoute>
                <FileList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/label/:id"
            element={
              <ProtectedRoute>
                <DataTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
    </AuthProvider>
  );
}

export default App;