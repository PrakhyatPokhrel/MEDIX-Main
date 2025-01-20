import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Row,
  Col,
  notification,
} from "antd";

const { Option } = Select;

const RegisterForm = ({ onRegisterSuccess }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    fetch("http://localhost:5002/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        if (data.message === "User registered successfully") {
          notification.success({
            message: "Registration Successful",
            description: data.message,
          });
          if (onRegisterSuccess) {
            onRegisterSuccess(); // Navigate to login or dashboard
          }
        } else {
          notification.error({
            message: "Registration Failed",
            description: data.message,
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
        notification.error({
          message: "Registration Error",
          description: "An error occurred while trying to register.",
        });
      });
  };

  return (
    <Card title="Register" style={{ width: 800, margin: "20px auto" }}>
      <Form
        name="register_form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        {/* Username and Password */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
          </Col>
        </Row>

        {/* Gender and Age */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[
                { required: true, message: "Please select your gender!" },
              ]}
            >
              <Select placeholder="Select Gender">
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="age"
              label="Age"
              rules={[{ required: true, message: "Please input your age!" }]}
            >
              <InputNumber
                min={1}
                max={120}
                placeholder="Age"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Height and Weight */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="height"
              label="Height (in meters)"
              rules={[{ required: true, message: "Please input your height!" }]}
            >
              <InputNumber
                min={0.5}
                max={2.5}
                step={0.01}
                placeholder="Height in meters"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="weight"
              label="Weight (in kilograms)"
              rules={[{ required: true, message: "Please input your weight!" }]}
            >
              <InputNumber
                min={10}
                max={300}
                step={0.1}
                placeholder="Weight in kilograms"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Blood Pressure */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="high_blood_pressure" label="High Blood Pressure">
              <InputNumber
                min={50}
                max={250}
                placeholder="High Blood Pressure"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="low_blood_pressure" label="Low Blood Pressure">
              <InputNumber
                min={30}
                max={150}
                placeholder="Low Blood Pressure"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Additional Fields */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="cholesterol" label="Cholesterol">
              <InputNumber
                min={50}
                max={500}
                placeholder="Cholesterol Level"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="glucose" label="Glucose">
              <InputNumber
                min={50}
                max={500}
                placeholder="Glucose Level"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="smoking_history" label="Smoking History">
              <Select placeholder="Select Smoking History">
                <Option value="Never">Never</Option>
                <Option value="Former">Former</Option>
                <Option value="Current">Current</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="alcohol_intake" label="Alcohol Intake">
              <Select placeholder="Select Alcohol Intake">
                <Option value={0}>None</Option>
                <Option value={1}>High</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="physical_activity" label="Physical Activity">
              <Select placeholder="Select Physical Activity">
                <Option value={0}>Sedentary</Option>
                <Option value={1}>Active</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="pregnancies" label="Pregnancies">
              <InputNumber
                min={0}
                max={20}
                placeholder="Number of Pregnancies"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="hemoglobin_level" label="Hemoglobin Level">
              <InputNumber
                min={5}
                max={20}
                placeholder="Hemoglobin Level"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="skin_thickness" label="Skin Thickness">
              <InputNumber
                min={1}
                max={100}
                placeholder="Skin Thickness"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="insulin" label="Insulin Level">
              <InputNumber
                min={0}
                max={900}
                placeholder="Insulin Level"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="diabetes" label="Diabetes">
              <Select placeholder="Do you have diabetes?">
                <Option value={1}>Yes</Option>
                <Option value={0}>No</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="hypertension" label="Hypertension">
              <Select placeholder="Select Hypertension">
                <Option value={1}>Yes</Option>
                <Option value={0}>No</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="heart_disease" label="Heart Disease">
              <Select placeholder="Select Heart Disease">
                <Option value={1}>Yes</Option>
                <Option value={0}>No</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default RegisterForm;
