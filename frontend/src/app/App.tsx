import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import ProtectedRoute from "../route/ProtectedRoute";
import Navbar from "../components/organisms/Navbar";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Todo from "../features/todo/Todo";
import EditProfile from "../components/EditProfile";
import DummyTodos from "../features/todo/DummyTodos";

// Avatar images array
const avatarArray = [
  new URL("../assets/vishesh.png", import.meta.url).href,
  new URL("../assets/user.png", import.meta.url).href,
  new URL("../assets/user1.png", import.meta.url).href,
  new URL("../assets/user2.png", import.meta.url).href,
  new URL("../assets/user3.png", import.meta.url).href,
  new URL("../assets/user4.png", import.meta.url).href,
];

const avatars: { [key: string]: string } = avatarArray.reduce((acc, url, index) => {
  acc[`user${index}`] = url;
  return acc;
}, {} as { [key: string]: string });

interface User {
  email: string;
  role: "user" | "admin";
  name: string;
  password: string;
  avatar?: string;
}

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    navigate("/login");
  };

  const hideNavbarOnPages = ["/login", "/signup"];
  const showNavbar = !hideNavbarOnPages.includes(location.pathname);

  return (
    <div className="w-full h-screen">
      {showNavbar && <Navbar user={user} handleLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Navigate to="/todo" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todo" element={<ProtectedRoute><Todo /></ProtectedRoute>} />
        <Route path="/edit-profile" element={<ProtectedRoute><EditProfile avatars={avatars} /></ProtectedRoute>} />
        <Route path="*" element={<div className="text-center mt-20 text-2xl text-red-600">404 - Page Not Found</div>} />
        <Route path="/dummy-todos" element={<ProtectedRoute><DummyTodos /></ProtectedRoute>} />
      </Routes>
    </div>
  );
};

export default App;
