// LoginForm.js
import React, { useState } from "react";
import { Card, Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/register");
  };

  const onFinish = (values) => {
    setLoading(true);
    fetch("http://localhost:5002/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        // if (response.ok) {
        //   throw new Error("Network response was not ok");
        // }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        if (data.message === "Login successful") {
          // notification.success({
          //   message: "Login Successful",
          //   description: data.message,
          // });
          // if (onLoginSuccess) {
          localStorage.setItem("username", data.user);
          localStorage.setItem("user", JSON.stringify(data.user));

          console.log(localStorage.getItem("user"));

          navigate("/");
          // }
        } else {
          notification.error({
            message: "Login Failed",
            description: data.message,
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
        notification.error({
          message: "Login Error",
          description: "An error occurred while trying to log in.",
        });
      });
  };

  return (
    <Card title="Login" style={{ width: 300, margin: "20px auto" }}>
      <Form
        name="login_form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Log in
          </Button>
        </Form.Item>
      </Form>
      <>Donot have an account? </>
      <Button
        style={{
          background: "none",
          border: "none",
          padding: "0",
          margin: "0",
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
          font: "inherit",
        }}
        onClick={handleClick}
      >
        Register
      </Button>
    </Card>
  );
};

export default LoginForm;
