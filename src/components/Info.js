import React from "react";
import {
  Layout,
  Carousel,
  Collapse,
  Descriptions,
  Image,
  Popover,
  Typography,
  Button,
} from "antd";
import "antd/dist/reset.css";

const { Header, Content, Footer } = Layout;
const { Panel } = Collapse;
const { Title, Paragraph } = Typography;

const InfoPage = () => (
  <Layout className="layout" style={{ minHeight: "100vh" }}>
    <Header style={{ background: "#fff", padding: 0 }}>
      <Title
        level={2}
        style={{ margin: "16px", textAlign: "center", fontFamily: "Knockout" }}
      >
        Medical Prediction Information
      </Title>
    </Header>
    <Content style={{ padding: "50px" }}>
      <Carousel autoplay>
        <div>
          <Image
            width="100%"
            src="heartdisease.webp"
            alt="Heart Disease Prediction"
          />
        </div>
        <div>
          <Image width="100%" src="health.jpeg" alt="Diabetes Prediction" />
        </div>
        <div>
          <Image
            width="100%"
            src="pregnant.webp"
            alt="Pregnancy Diabetes Prediction"
          />
        </div>
      </Carousel>
      <Collapse defaultActiveKey={["1"]} style={{ marginTop: "24px" }}>
        <Panel header="Heart Disease Prediction Model" key="1">
          <Descriptions layout="vertical" bordered>
            <Descriptions.Item label="Model Algorithm">
              Logistic Regression
            </Descriptions.Item>
            <Descriptions.Item label="Data Source">
              Healthcare Dataset
            </Descriptions.Item>
            <Descriptions.Item label="Accuracy">81%</Descriptions.Item>
            <Descriptions.Item label="Use Case">
              Predicts the likelihood of heart disease in patients.
            </Descriptions.Item>
          </Descriptions>
        </Panel>
        <Panel header="Diabetes Prediction Model" key="2">
          <Descriptions layout="vertical" bordered>
            <Descriptions.Item label="Model Algorithm">
              XG-Boost
            </Descriptions.Item>
            <Descriptions.Item label="Data Source">
              Public Health Records in Kaggle Datasets
            </Descriptions.Item>
            <Descriptions.Item label="Accuracy">97%</Descriptions.Item>
            <Descriptions.Item label="Use Case">
              Assesses diabetes risk based on lifestyle and health factors.
            </Descriptions.Item>
          </Descriptions>
        </Panel>
        <Panel header="Pregnancy Diabetes Prediction Model" key="3">
          <Descriptions layout="vertical" bordered>
            <Descriptions.Item label="Model Algorithm">
              Logistic Regression
            </Descriptions.Item>
            <Descriptions.Item label="Data Source">
              Indian PIMA DataSet
            </Descriptions.Item>
            <Descriptions.Item label="Accuracy">76%</Descriptions.Item>
            <Descriptions.Item label="Use Case">
              Predicts gestational diabetes to ensure timely interventions.
            </Descriptions.Item>
          </Descriptions>
        </Panel>
      </Collapse>
      <div style={{ marginTop: "24px", textAlign: "center" }}>
        <Title level={4}>About Our Website</Title>
        <Paragraph>
          Our medical prediction website is at the forefront of healthcare
          analytics. We employ advanced machine learning models to predict
          various health conditions, enabling proactive medical care and
          interventions.
        </Paragraph>
        <Popover
          content="We use state-of-the-art encryption to protect your data."
          title="Data Privacy"
        >
          <Button type="primary">Learn More About Our Data Policy</Button>
        </Popover>
      </div>
    </Content>
    <Footer style={{ textAlign: "center" }}>
      Medical Diagnosis Website ©{new Date().getFullYear()}
    </Footer>
  </Layout>
);

export default InfoPage;
