import React, { useState } from "react";
import { Form, InputNumber, Button, notification, Tooltip, Card } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const DiabetesPredictionForm = ({ setCurrentView }) => {
  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
  };
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        values
      );
      notification.success({
        message: "Prediction Result",
        description: `The person ${
          response.data.prediction === 1 ? "has" : "doesn't have"
        } diabetes with a probability of ${(
          response.data.probability * 100
        ).toFixed(2)}%.`,
      });
    } catch (error) {
      console.error("Error during prediction:", error);
      notification.error({
        message: "Prediction Error",
        description:
          "There was an error making the prediction. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto", paddingTop: 20 }}>
      <Card
        style={{
          padding: "20px",
          background: "white",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        }}
      >
        <Form layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            name="Pregnancies"
            label="Pregnancies"
            rules={[
              {
                required: true,
                message: "Please input the number of pregnancies!",
                type: "number",
                min: 0,
                max: 17,
              },
            ]}
            tooltip={{
              title: "Number of times pregnant.",
              icon: <InfoCircleOutlined />,
            }}
          >
            <InputNumber
              min={0}
              max={17}
              placeholder="0 - 17"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="Glucose"
            label="Glucose"
            rules={[
              {
                required: true,
                message: "Please input the glucose level!",
                type: "number",
                min: 0,
                max: 199,
              },
            ]}
            tooltip={{
              title: "Glucose level (mg/dL)",
              icon: <InfoCircleOutlined />,
            }}
          >
            <InputNumber
              min={0}
              max={199}
              placeholder="0 - 199 mg/dL"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="BloodPressure"
            label="Blood Pressure"
            rules={[
              {
                required: true,
                message: "Please input the blood pressure!",
                type: "number",
                min: 40,
                max: 180,
              },
            ]}
            tooltip={{
              title: "Average low-to-high blood pressure (mm Hg).",
              icon: <InfoCircleOutlined />,
            }}
          >
            <InputNumber
              min={40}
              max={180}
              placeholder="40 - 180"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="SkinThickness"
            label="Skin Thickness"
            rules={[
              {
                required: true,
                message: "Please input the skin thickness!",
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
            tooltip={{
              title: "Triceps skin fold thickness (mm).",
              icon: <InfoCircleOutlined />,
            }}
          >
            <InputNumber
              min={0}
              max={99}
              placeholder="0 - 99"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="Insulin"
            label="Insulin"
            rules={[
              {
                required: true,
                message: "Please input the 2-Hour serum insulin!",
                type: "number",
                min: 0,
                max: 846,
              },
            ]}
            tooltip={{
              title: "2-Hour serum insulin (mu U/ml).",
              icon: <InfoCircleOutlined />,
            }}
          >
            <InputNumber
              min={0}
              max={846}
              placeholder="0-846"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="BMI"
            label="BMI"
            rules={[
              {
                required: true,
                message: "Please input the body mass index!",
                type: "number",
                min: 0,
                max: 70,
              },
            ]}
            tooltip={{
              title: "Body mass index (weight in kg/(height in m)^2).",
              icon: <InfoCircleOutlined />,
            }}
          >
            <InputNumber
              min={0}
              max={70}
              step={0.1}
              placeholder="0-70"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="DiabetesPedigreeFunction"
            label="Diabetes Pedigree Function"
            rules={[
              {
                required: true,
                message: "Please input the diabetes pedigree function!",
                type: "number",
                min: 0.078,
                max: 2.42,
              },
            ]}
            tooltip={{
              title:
                "Diabetes pedigree function (a function which scores likelihood of diabetes based on family history).",
              icon: <InfoCircleOutlined />,
            }}
          >
            <InputNumber
              min={0.078}
              max={2.42}
              step={0.001}
              placeholder="0078 - 2.42"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="Age"
            label="Age"
            rules={[
              {
                required: true,
                message: "Please input the age!",
                type: "number",
                min: 21,
                max: 81,
              },
            ]}
            tooltip={{
              title: "Age (years).",
              icon: <InfoCircleOutlined />,
            }}
          >
            <InputNumber
              min={21}
              max={81}
              placeholder="21 - 81"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Predict Diabetes
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
        >
          Back
        </Button>
      </Card>
    </div>
  );
};

export default DiabetesPredictionForm;
