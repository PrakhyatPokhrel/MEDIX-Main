// RegisterForm.js
import React, { useState } from 'react';
import { Card, Form, Input, Button, notification } from 'antd';

const RegisterForm = ({ onRegisterSuccess }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    fetch('http://localhost:5000/register', {
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
          message: 'Registration Successful',
          description: data.message,
        });
        if (onRegisterSuccess) {
          onRegisterSuccess(); // Navigate to login or dashboard
        }
      } else {
        notification.error({
          message: 'Registration Failed',
          description: data.message,
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setLoading(false);
      notification.error({
        message: 'Registration Error',
        description: 'An error occurred while trying to register.',
      });
    });
  };

  return (
    <Card title="Register" style={{ width: 300, margin: '20px auto' }}>
      <Form
        name="register_form"
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
            Register
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default RegisterForm;
