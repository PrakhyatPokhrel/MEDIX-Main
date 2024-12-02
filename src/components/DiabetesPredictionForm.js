import React, { useState } from "react";
import {
  Form,
  InputNumber,
  Button,
  notification,
  Col,
  Row,
  Card,
  Select,
} from "antd";
import axios from "axios";

const { Option } = Select;

const DiabetesPredictionForm = ({ setCurrentView }) => {
  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
  };
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5002/predict_diabetes",
        values
      );
      notification.success({
        message: "Diabetes Prediction Result",
        description: `The person ${
          response.data.prediction === 1 ? "has" : "doesn't have"
        } diabetes with a probability of ${(
          response.data.probability * 100
        ).toFixed(2)}%.`,
      });
    } catch (error) {
      console.error("Prediction error:", error);
      notification.error({
        message: "Prediction Error",
        description:
          "There was an error processing your prediction. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title="Diabetes Prediction Form"
      bordered={false}
      style={{ width: 600, margin: "auto", marginTop: 32 }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[
                { required: true, message: "Please select your gender!" },
              ]}
            >
              <Select placeholder="Select your gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="age"
              label="Age"
              rules={[
                { required: true, message: "Please input your age!" },
                {
                  type: "number",
                  min: 0,
                  max: 100,
                  message: "Age must be between 0 and 100!",
                },
              ]}
            >
              <InputNumber
                min={0}
                max={100}
                style={{ width: "100%" }}
                placeholder="0 - 100"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="hypertension"
              label="Hypertension"
              rules={[
                {
                  required: true,
                  message: "Please indicate your hypertension status!",
                },
              ]}
            >
              <Select placeholder="Select your hypertension status">
                <Option value={0}>No</Option>
                <Option value={1}>Yes</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="heart_disease"
              label="Heart Disease"
              rules={[
                {
                  required: true,
                  message: "Please indicate if you have heart disease!",
                },
              ]}
            >
              <Select placeholder="Select your heart disease status">
                <Option value={0}>No</Option>
                <Option value={1}>Yes</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="smoking_history"
              label="Smoking History"
              rules={[
                {
                  required: true,
                  message: "Please select your smoking history!",
                },
              ]}
            >
              <Select placeholder="Select your smoking history">
                <Option value="No Info">No Info</Option>
                <Option value="current">Current</Option>
                <Option value="never">Never</Option>
                <Option value="former">Former</Option>
                <Option value="not current">Not Current</Option>
                <Option value="ever">Ever</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="bmi"
              label="BMI (Body Mass Index)"
              rules={[
                { required: true, message: "Please input your BMI!" },
                {
                  type: "number",
                  min: 10,
                  max: 96,
                  message: "BMI must be between 10 and 96!",
                },
              ]}
            >
              <InputNumber
                min={10}
                max={96}
                style={{ width: "100%" }}
                placeholder="10 - 96"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="HbA1c_level"
              label="HbA1c Level (Hemoglobin level)"
              rules={[
                { required: true, message: "Please input your HbA1c level!" },
                {
                  type: "number",
                  min: 4.5,
                  max: 9,
                  message: "HbA1c level must be between 4.5 and 9!",
                },
              ]}
            >
              <InputNumber
                min={5}
                max={9}
                step={0.1}
                placeholder="4.5-9"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="blood_glucose_level"
              label="Blood Glucose Level"
              rules={[
                {
                  required: true,
                  message: "Please input your blood glucose level!",
                },
                {
                  type: "number",
                  min: 80,
                  max: 300,
                  message: "Blood glucose level must be between 80 and 300!",
                },
              ]}
            >
              <InputNumber
                min={80}
                max={300}
                style={{ width: "100%" }}
                placeholder="80 - 300"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit Prediction
          </Button>
        </Form.Item>
      </Form>
      <Button
        theme="pink"
        title="back"
        bordered="false"
        htmlType="submit"
        text="back"
        style={{
          width: 200,
          margin: "auto",
          marginTop: 32,
          color: "#FF0000",
        }}
        onClick={handleBackToDashboard}
      >Back</Button>
    </Card>
  );
};

export default DiabetesPredictionForm;
