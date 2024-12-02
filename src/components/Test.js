import React, { useState } from "react";
import { Row, Col, Card, Modal } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles

const teamMembers = [
  {
    name: "Sushan Shakya",
    title: "Frontend Developer/ Data Analyst",
    imageSrc: "sushan.jpg",
    bio: "I did the frontend of this project along with model training and testing. Helped in making Pregnancy Diabetes Algorithm. documentation was completed with group effort.",
    // You can add more information here that you want to display in the modal
  },
  {
    name: "Sujal Dongol",
    title: "Frontend-Backend Developer",
    imageSrc: "sujal.jpg",
    bio: "I did the Frontend and Backend of this project along with model training and testing. Helped in making Diabetes Algorithm. documentation was completed with group effort.",
    // You can add more information here that you want to display in the modal
  },
  {
    name: "Chhitiz Vaidya",
    title: "Machine Learning Engineer",
    imageSrc: "chhitiz.jpg",
    bio: "I did the model training and testing of this project along with model training and testing. Helped in frontend and backend. documentation was completed with group effort.",
    // You can add more information here that you want to display in the modal
  },
  // ... add other team members here
];

const AboutPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState({});

  const showModal = (member) => {
    setSelectedMember(member);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: "2rem", position: "relative", zIndex: 1 }}>
      <h1 style={{ textAlign: "center", fontSize: "60px" }}>TEAM MEMBERS</h1>
      <p style={{ textAlign: "center", marginBottom: "2rem" }}>
        We're led by a team who constantly questions, tinkers, and challenges to
        unlock great creativity around every turn.
      </p>
      <Row gutter={[16, 16]}>
        {teamMembers.map((member) => (
          <Col xs={24} sm={12} md={8} lg={8} key={member.name}>
            <Card
              hoverable
              style={{ width: 390, margin: "0 auto" }}
              cover={<img alt={member.name} src={member.imageSrc} />}
              onClick={() => showModal(member)}
            >
              <Card.Meta title={member.name} description={member.title} />
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} // No footer buttons, you can add if needed
      >
        <p
          style={{
            textAlign: "center",
            fontWeight: "bolder",
            fontSize: "20px",
          }}
        >
          {selectedMember.name}
        </p>
        <p style={{ textAlign: "center" }}>{selectedMember.title}</p>
        <p>{selectedMember.bio}</p>
        {/* You can add more content here */}
      </Modal>
    </div>
  );
};

export default AboutPage;
