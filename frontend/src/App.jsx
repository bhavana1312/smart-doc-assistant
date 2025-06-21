// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LandingPage from "./components/LandingPage";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import UploadPDF from "./components/UploadPDF";
// import ChatBox from "./components/ChatBox";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/upload" element={<UploadPDF />} />
//         <Route path="/chat" element={<ChatBox />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UploadPDF from "./components/UploadPDF";
import ChatBox from "./components/ChatBox";
import Navbar from "./components/Navbar";
import Quiz from "./components/Quiz"

// ✅ PrivateRoute to protect authenticated pages
function PrivateRoute({ element }) {
  const user = localStorage.getItem("user");
  return user ? element : <Navigate to="/login" replace />;
}

// ✅ Custom layout that includes Navbar only for upload/chat when logged in
function AppContent() {
  const location = useLocation();
  const user = localStorage.getItem("user");

  const isProtectedPath = [
    "/upload",
    "/chat",
    "/quiz",
    "/login",
    "/signup",
  ].includes(location.pathname);
  const showNavbar = isProtectedPath ;

  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && <Navbar />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/upload"
            element={<PrivateRoute element={<UploadPDF />} />}
          />
          <Route
            path="/chat"
            element={<PrivateRoute element={<ChatBox />} />}
          />
          <Route
            path="/quiz"
            element={<PrivateRoute element={<Quiz />} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
