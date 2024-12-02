import React from "react";
import { Menu } from "antd";
import { RetweetOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

const menuStyle = {
  flex: 1,
  justifyContent: "flex-end",
  border: "none",
  backgroundColor: "transparent",
};

const Header = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleMenuClick = (e) => {
    // Function to handle menu click using navigate
    switch (e.key) {
      case "home":
        navigate("/"); // Navigate to home
        break;
      case "info":
        navigate("/info"); // Navigate to FAQ page
        break;
      case "about":
        navigate("/Test"); // Navigate to About Us page
        break;
      default:
        break;
    }
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <div className="logo" style={{ width: "120px" }}>
        <img
          src="/medix.png"
          alt="Logo"
          style={{ marginTop: "5px", maxWidth: "100%", width: "69px" }}
        />
      </div>
      <Menu
        mode="horizontal"
        style={menuStyle}
        defaultSelectedKeys={["home"]}
        onClick={handleMenuClick}
      >
        <Menu.Item key="home" icon={<RetweetOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="info">Info</Menu.Item>
        <Menu.Item key="about">About Us</Menu.Item>
      </Menu>
    </header>
  );
};

export default Header;
