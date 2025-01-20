import React, { useState } from "react";
import "./ProfielDropdown.css"; // Optional for styling

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    toggleDropdown();
    // Add your logout logic here
  };
  var username = localStorage.getItem("username");

  return (
    <div className="profile-container">
      <button className="profile-button" onClick={toggleDropdown}>
        Profile
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-item">Hello, {username}</div>
          <div className="dropdown-item" onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
