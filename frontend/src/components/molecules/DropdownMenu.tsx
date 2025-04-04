import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  role: "admin" | "user";
  avatar?: string;
}

interface DropdownMenuProps {
  user: User;
  userImage: string;
  handleLogout: () => void;
  setProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  user,
  userImage,
  handleLogout,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 bg-gray-800 text-white px-3 py-1.5 rounded-full hover:bg-gray-700 transition duration-200"
      >
        <img
          src={userImage}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="hidden sm:flex flex-col items-start leading-tight">
          <span className="text-sm font-medium">{user.name}</span>
          <span className="text-xs text-gray-300">Profile</span>
        </div>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 z-50 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden animate-fade-in">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
          </div>

          <button
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
            onClick={() => {
              setDropdownOpen(false);
              navigate("/edit-profile");
            }}
          >
            Edit Profile
          </button>

          <button
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
            onClick={() => {
              setDropdownOpen(false);
              navigate("/dummy-todos");
            }}
          >
            Dummy Todos
          </button>

          <hr className="my-1 border-gray-200" />

          <button
            className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
            onClick={() => {
              setDropdownOpen(false);
              handleLogout();
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
