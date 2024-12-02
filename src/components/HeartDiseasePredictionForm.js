import React, { useState } from "react";
import { Form, InputNumber, Button, notification, Col, Row, Card } from "antd";
import axios from "axios";

const formContainerStyle = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px",
  border: "1px solid #f0f0f0",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const HeartDiseasePredictionForm = ({ setCurrentView }) => {
  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
  };
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    // Convert age from years to days
    const convertedValues = {
      ...values,
      age: Math.round(values.age * 365.25), // Including leap years
    };

    try {
      // Ensure this URL matches your Flask app's URL and endpoint
      const response = await axios.post(
        "http://localhost:5001/predict_heart_disease",
        convertedValues
      );
      notification.success({
        message: "Heart Disease Prediction Result",
        description: `The person ${
          response.data.prediction === 1 ? "has" : "doesn't have"
        }  heart disease with a probability of ${(
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
    <Card style={formContainerStyle} title="Heart Disease Prediction Form">
      <div style={{ maxWidth: 700, margin: "auto", paddingTop: 20 }}>
        <Form layout="vertical" onFinish={onFinish} autoComplete="off">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="age"
                label="Age"
                rules={[{ required: true, message: "Please input your age!" }]}
              >
                <InputNumber
                  min={18}
                  max={100}
                  style={{ width: "100%" }}
                  placeholder="1 - 100"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  { required: true, message: "Please select your gender!" },
                ]}
              >
                <InputNumber
                  min={1}
                  max={2}
                  style={{ width: "100%" }}
                  placeholder="1 for male, 2 for female"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="height"
                label="Height (cm)"
                rules={[
                  {
                    required: true,
                    message: "Please input your height in cm!",
                  },
                ]}
              >
                <InputNumber
                  min={55}
                  max={250}
                  style={{ width: "100%" }}
                  placeholder="55 - 250 (in cm) "
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="weight"
                label="Weight (kg)"
                rules={[
                  {
                    required: true,
                    message: "Please input your weight in kg!",
                  },
                ]}
              >
                <InputNumber
                  min={10.0}
                  max={200.0}
                  style={{ width: "100%" }}
                  placeholder="10.0 - 200.0"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="ap_hi"
                label="Upper Blood Pressure Point"
                rules={[
                  {
                    required: true,
                    message: "Please input your systolic blood pressure!",
                  },
                ]}
              >
                <InputNumber
                  min={60}
                  max={240}
                  style={{ width: "100%" }}
                  placeholder="60 -240"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="ap_lo"
                label="Lower Blood Pressure Point"
                rules={[
                  {
                    required: true,
                    message: "Please input your diastolic blood pressure!",
                  },
                ]}
              >
                <InputNumber
                  min={30}
                  max={190}
                  style={{ width: "100%" }}
                  placeholder="30 - 190"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cholesterol"
                label="Cholesterol"
                rules={[
                  {
                    required: true,
                    message: "Please input your cholesterol level!",
                  },
                ]}
              >
                <InputNumber
                  min={1}
                  max={3}
                  style={{ width: "100%" }}
                  placeholder="1: normal, 2: above normal, 3: well above normal"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="gluc"
                label="Glucose"
                rules={[
                  {
                    required: true,
                    message: "Please input your glucose level!",
                  },
                ]}
              >
                <InputNumber
                  min={1}
                  max={3}
                  style={{ width: "100%" }}
                  placeholder="1: normal, 2: above normal, 3: well above normal"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="smoke"
                label="Smoker"
                rules={[
                  {
                    required: true,
                    message: "Please indicate smoking status!",
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  max={1}
                  style={{ width: "100%" }}
                  placeholder="0: Non-smoker, 1: Smoker"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="alco"
                label="Alcohol intake"
                rules={[
                  {
                    required: true,
                    message: "Please indicate alcohol intake!",
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  max={1}
                  style={{ width: "100%" }}
                  placeholder="0: No, 1: Yes"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="active"
                label="Physical activity"
                rules={[
                  {
                    required: true,
                    message: "Please indicate your physical activity level!",
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  max={1}
                  style={{ width: "100%" }}
                  placeholder="0: Low, 1: High"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Predict Heart Disease
            </Button>
          </Form.Item>
        </Form>
      </div>
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
  );
};

export default HeartDiseasePredictionForm;
