import { useState } from "react";
import ProfileModal from "../organisms/ProfileModal";
import DropdownMenu from "../molecules/DropdownMenu";

interface User {
  name: string;
  email: string;
  role: "admin" | "user";
  avatar?: string;
}

interface NavbarProps {
  user: User | null;
  handleLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, handleLogout }) => {
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  const appTitle = user
    ? `Todo App (${user.role === "admin" ? "Admin" : "User"})`
    : "Todo App";

  return (
    <nav className="w-full bg-gray-900 text-white shadow-lg px-4 py-3 flex items-center justify-between">
      {/* App Title */}
      <div className="text-xl font-semibold tracking-wide">{appTitle}</div>

      {/* Dropdown + Avatar */}
      {user && (
        <div className="flex items-center space-x-3">
          <DropdownMenu
            user={user}
            userImage={user.avatar || "/default-user.png"}
            handleLogout={handleLogout}
            setProfileOpen={setProfileOpen}
          />
        </div>
      )}

      {/* Profile Modal */}
      {profileOpen && user && (
        <ProfileModal
          user={user}
          userImage={user.avatar || "/default-user.png"}
          onClose={() => setProfileOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
