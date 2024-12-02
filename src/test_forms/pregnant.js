import React, { useState } from "react";
import { Form, InputNumber, Button, notification, Tooltip, Card } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const DiabetesPredictionForm = () => {
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

  const validateInput = (min, max) => (_, value) => {
    if (!value) {
      return Promise.reject(new Error("This field is required!"));
    }
    if (value < min || value > max) {
      return Promise.reject(
        new Error(`Please enter a value between ${min} and ${max}.`)
      );
    }
    return Promise.resolve();
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
          {/* Each Form.Item now includes a custom validation rule */}

          <Form.Item
            name="Pregnancies"
            label="Pregnancies"
            rules={[{ validator: validateInput(0, 17) }]}
            tooltip={{
              title: "Number of times pregnant.",
              icon: <InfoCircleOutlined />,
            }}
          >
            <InputNumber placeholder="0 - 17" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="Glucose"
            label="Glucose Level"
            rules={[{ validator: validateInput(0, 199) }]}
            tooltip={{
              title:
                "Plasma glucose concentration a 2 hours in an oral glucose tolerance test",
              icon: <InfoCircleOutlined />,
            }}
          >
            <InputNumber
              placeholder="0 - 199 mg/dL"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="BloodPressure"
            label="Blood Pressure"
            rules={[{ validator: validateInput(40, 180) }]}
            tooltip={{
              title: "Diastolic blood pressure (mm Hg)",
              icon: <InfoCircleOutlined />,
            }}
          >
            <InputNumber
              placeholder="40 - 180 mm Hg"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="SkinThickness"
            label="Skin Thickness"
            rules={[{ validator: validateInput(0, 99) }]}
            tooltip={{
              title: "Triceps skin fold thickness (mm).",
              icon: <InfoCircleOutlined />,
            }}
          >
            <InputNumber placeholder="0 - 99 mm" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="Insulin"
            label="2-Hour Serum Insulin"
            rules={[{ validator: validateInput(0, 846) }]}
            tooltip={{
              title: "2-Hour serum insulin (mu U/ml).",
              icon: <InfoCircleOutlined />,
            }}
          >
            <InputNumber
              placeholder="0 - 846 mu U/ml"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="BMI"
            label="Body Mass Index (BMI)"
            rules={[{ validator: validateInput(0, 70) }]}
            tooltip={{
              title: "Body mass index (weight in kg/(height in m)^2).",
              icon: <InfoCircleOutlined />,
            }}
          >
            <InputNumber
              placeholder="0 - 70"
              style={{ width: "100%" }}
              step={0.1}
            />
          </Form.Item>

          <Form.Item
            name="DiabetesPedigreeFunction"
            label="Diabetes Pedigree Function"
            rules={[{ validator: validateInput(0.078, 2.42) }]}
            tooltip={{
              title: "Diabetes pedigree function score.",
              icon: <InfoCircleOutlined />,
            }}
          >
            <InputNumber
              placeholder="0.078 - 2.42"
              style={{ width: "100%" }}
              step={0.001}
            />
          </Form.Item>

          <Form.Item
            name="Age"
            label="Age"
            rules={[{ validator: validateInput(21, 81) }]}
            tooltip={{ title: "Age in years.", icon: <InfoCircleOutlined /> }}
          >
            <InputNumber
              placeholder="21 - 81 years"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Predict Diabetes
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default DiabetesPredictionForm;
