import React from "react";
import { Card, Table, Typography, Space } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const UserInfoPage = () => {
  const navigate = useNavigate();
  var userData = JSON.parse(localStorage.getItem("user"));
  const columns = [
    {
      title: "Field",
      dataIndex: "field",
      key: "field",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
  ];

  const data = [
    { key: "1", field: "Username", value: userData.username || "N/A" },
    { key: "2", field: "Gender", value: userData.gender || "N/A" },
    { key: "3", field: "Age", value: userData.age || "N/A" },
    { key: "4", field: "Height (m)", value: userData.height || "N/A" },
    { key: "5", field: "Weight (kg)", value: userData.weight || "N/A" },
    {
      key: "6",
      field: "High Blood Pressure",
      value: userData.high_blood_pressure || "N/A",
    },
    {
      key: "7",
      field: "Low Blood Pressure",
      value: userData.low_blood_pressure || "N/A",
    },
    { key: "8", field: "Cholesterol", value: userData.cholesterol || "N/A" },
    { key: "9", field: "Glucose", value: userData.glucose || "N/A" },
    {
      key: "10",
      field: "Smoking History",
      value: userData.smoking_history || "N/A",
    },
    {
      key: "11",
      field: "Alcohol Intake",
      value: userData.alcohol_intake || "N/A",
    },
    {
      key: "12",
      field: "Physical Activity",
      value: userData.physical_activity || "N/A",
    },
  ];

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
      }}
    >
      <Card style={{ maxWidth: "800px", margin: "20px auto" }}>
        <Title level={2} style={{ textAlign: "center" }}>
          User Information
        </Title>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          rowKey="key"
          style={{ marginTop: "20px" }}
        />
      </Card>
      <div style={{ width: "800px", margin: "20px auto", marginTop: "20px" }}>
        <button
          style={{
            width: "100%",
            backgroundColor: "#ff4d4f",
            color: "white",
            border: "none",
            padding: "10px 0",
            fontSize: "16px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => {
            localStorage.clear();
            navigate("/login");
            // Add your logout logic here
            console.log("Logged out");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserInfoPage;
