import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../features/user/UserSlice";

interface Props {
  avatars: { [key: string]: string };
}

const EditProfile: React.FC<Props> = ({ avatars }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}") || {};

  const [name, setName] = useState<string>(loggedInUser.name || "");
  const [email, setEmail] = useState<string>(loggedInUser.email || "");
  const [password, setPassword] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [image, setImage] = useState<string>(loggedInUser.avatar || "/default-user.png");

  useEffect(() => {
    if (image) {
      localStorage.setItem("profileImage", image);
    }
  }, [image]);

  const handleImageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedImage = avatars[e.target.value];
    setImage(selectedImage);

    const savedUsers = JSON.parse(localStorage.getItem("users") || "[]") || [];
    const userIndex = savedUsers.findIndex((user: { email: string }) => user.email === loggedInUser.email);

    if (userIndex !== -1) {
      savedUsers[userIndex].avatar = selectedImage;
      loggedInUser.avatar = selectedImage;

      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      localStorage.setItem("users", JSON.stringify(savedUsers));
    }
  };

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>, field: string) => {
    e.preventDefault();

    if (field === "password" && oldPassword !== loggedInUser.password) {
      alert("Incorrect old password!");
      return;
    }

    const updatedUser = { ...loggedInUser };
    if (field === "name") updatedUser.name = name;
    if (field === "email") updatedUser.email = email;
    if (field === "password") updatedUser.password = password;

    dispatch(updateUser(updatedUser));
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    alert("Profile updated successfully!");

    setTimeout(() => {
      navigate("/profile");
    }, 1000);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

      <div className="flex justify-center mb-6">
        <img
          src={image}
          alt="Profile"
          className="rounded-full w-24 h-24 object-cover border-4 border-blue-500"
        />
      </div>

      <form className="space-y-6">
        {/* Avatar Select */}
        <div>
          <label className="block mb-1 font-medium">Profile Picture</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={Object.keys(avatars).find((key) => avatars[key] === image) || ""}
            onChange={handleImageChange}
          >
            {Object.keys(avatars).map((key) => (
              <option key={key} value={key}>
                {key}.png
              </option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
          <button
            className="w-full bg-blue-600 text-white rounded-lg mt-2 py-2 hover:bg-blue-700"
            onClick={(e) => handleUpdate(e, "name")}
          >
            Update Name
          </button>
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
          <button
            className="w-full bg-blue-600 text-white rounded-lg mt-2 py-2 hover:bg-blue-700"
            onClick={(e) => handleUpdate(e, "email")}
          >
            Update Email
          </button>
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 font-medium">Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <button
            className="w-full bg-blue-600 text-white rounded-lg mt-2 py-2 hover:bg-blue-700"
            onClick={(e) => handleUpdate(e, "password")}
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
