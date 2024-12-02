// LoginForm.js
import React, { useState } from 'react';
import { Card, Form, Input, Button, notification } from 'antd';

const LoginForm = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setLoading(false);
      if (data.success) {
        notification.success({
          message: 'Login Successful',
          description: data.message,
        });
        if (onLoginSuccess) {
          onLoginSuccess(); // Call the provided callback function if login is successful
        }
      } else {
        notification.error({
          message: 'Login Failed',
          description: data.message,
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setLoading(false);
      notification.error({
        message: 'Login Error',
        description: 'An error occurred while trying to log in.',
      });
    });
  };

  return (
    <Card title="Login" style={{ width: 300, margin: '20px auto' }}>
      <Form
        name="login_form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginForm;
