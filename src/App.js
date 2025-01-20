// import React, { useState, useRef, useEffect } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { Button, Carousel } from "antd";
// import { LeftOutlined, RightOutlined } from "@ant-design/icons";
// import "antd/dist/reset.css";
// import Header from "./components/Header";
// import DiabetesPredictionForm from "./components/DiabetesPredictionForm";
// import HeartDiseasePredictionForm from "./components/HeartDiseasePredictionForm";
// import PregnancyPredictionForm from "./components/PregnancyDiabetesPredictionForm";
// import Info from "./components/Info";
// import Test from "./components/Test";
// import Login from "./components/LoginForm";
// import Register from "./components/RegisterForm";
// import UserInfoPage from "./components/UserInfoPage";

// const slideData = [
//   {
//     key: "diabetes",
//     backgroundImage: "health.jpeg",
//     title: "Diabetes Prediction",
//     buttonText: "Diabetes Prediction",
//   },
//   {
//     key: "heartDisease",
//     backgroundImage: "heartdisease.webp",
//     title: "Heart Disease Prediction",
//     buttonText: "Heart Disease Prediction",
//   },
//   {
//     key: "pregnancyDiabetes",
//     backgroundImage: "pregnant.webp",
//     title: "Pregnancy Diabetes Prediction",
//     buttonText: "Pregnancy Diabetes Prediction",
//   },
// ];

// const Slide = ({ backgroundImage, title, buttonText, onGetStarted }) => {
//   const slideStyle = {
//     height: "60vh",
//     maxHeight: "500px",
//     maxWidth: "90vh",
//     marginTop: "130px",
//     marginLeft: "130px",
//     color: "#fff",
//     lineHeight: "160px",
//     textAlign: "center",
//     background: `no-repeat center/cover url(${backgroundImage})`,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//   };

//   return (
//     <div style={slideStyle}>
//       <h3
//         style={{
//           marginTop: "10px",
//           color: "#000",
//           fontSize: "30px",
//           fontFamily: "Helvetica Neue",
//           fontWeight: "bold",
//           textTransform: "uppercase",
//         }}
//       >
//         {title}
//       </h3>
//       <Button
//         type="primary"
//         onClick={onGetStarted}
//         size="large"
//         style={{ marginTop: "100px" }}
//       >
//         {buttonText}
//       </Button>
//     </div>
//   );
// };

// function App() {
//   const [currentView, setCurrentView] = useState("dashboard");
//   const [backgroundImage, setBackgroundImage] = useState(
//     slideData[0].backgroundImage
//   );
//   const carouselRef = useRef();

//   useEffect(() => {
//     if (currentView === "dashboard" && carouselRef.current) {
//       const activeSlideIndex =
//         carouselRef.current.innerSlider.state.currentSlide;
//       setBackgroundImage(slideData[activeSlideIndex].backgroundImage);
//     }
//   }, [currentView]);

//   const handleGetStarted = (view) => {
//     setCurrentView(view);
//   };

//   const renderContent = () => {
//     switch (currentView) {
//       case "diabetes":
//         return <DiabetesPredictionForm setCurrentView={setCurrentView} />;
//       case "heartDisease":
//         return <HeartDiseasePredictionForm setCurrentView={setCurrentView} />;
//       case "pregnancyDiabetes":
//         return <PregnancyPredictionForm setCurrentView={setCurrentView} />;
//       default:
//         return (
//           <>
//             <Carousel
//               fade
//               infinite
//               ref={carouselRef}
//               afterChange={(currentSlide) =>
//                 setBackgroundImage(slideData[currentSlide].backgroundImage)
//               }
//               autoplay={false}
//               dots={false}
//               style={{ maxWidth: "1000px", margin: "0 auto" }}
//             >
//               {slideData.map((slide) => (
//                 <Slide
//                   key={slide.key}
//                   backgroundImage={slide.backgroundImage}
//                   title={slide.title}
//                   buttonText={slide.buttonText}
//                   onGetStarted={() => handleGetStarted(slide.key)}
//                 />
//               ))}
//             </Carousel>
//             <Button
//               shape="circle"
//               icon={<LeftOutlined />}
//               onClick={() => carouselRef.current.prev()}
//               style={{
//                 position: "absolute",
//                 top: "50%",
//                 left: 32,
//                 transform: "translateY(-50%)",
//                 zIndex: 2,
//               }}
//             />
//             <Button
//               shape="circle"
//               icon={<RightOutlined />}
//               onClick={() => carouselRef.current.next()}
//               style={{
//                 position: "absolute",
//                 top: "50%",
//                 right: 32,
//                 transform: "translateY(-50%)",
//                 zIndex: 2,
//               }}
//             />
//           </>
//         );
//     }
//   };

//   const backgroundStyle = {
//     backgroundImage: `url(${backgroundImage})`,
//     transition: "background-image 0.3s ease-in-out",
//     backgroundSize: "cover",
//     filter: "blur(8px)",
//     width: "100vw",
//     height: "100vh",
//     position: "fixed",
//     top: 0,
//     left: 0,
//     zIndex: -1,
//   };
//   const PrivateRoute = ({ children }) => {
//     const user = localStorage.getItem("user"); // Check for user in local storage
//     return user ? children : <Navigate to="/login" />;
//   };

//   return (
//     <BrowserRouter>
//       <div style={{ position: "relative", overflow: "hidden" }}>
//         <div style={backgroundStyle} />
//         <Header />
//         <main style={{ position: "relative" }}>
//           <Routes>
//             <Route
//               path="/"
//               element={<PrivateRoute>{renderContent()}</PrivateRoute>}
//             />
//             <Route
//               path="/info"
//               element={
//                 <PrivateRoute>
//                   <Info />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/test"
//               element={
//                 <PrivateRoute>
//                   <Test />
//                 </PrivateRoute>
//               }
//             />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route
//               path="/profile"
//               element={
//                 <PrivateRoute>
//                   <UserInfoPage />
//                 </PrivateRoute>
//               }
//             />
//           </Routes>
//         </main>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;

import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button, Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import Header from "./components/Header";
import DiabetesPredictionForm from "./components/DiabetesPredictionForm";
import HeartDiseasePredictionForm from "./components/HeartDiseasePredictionForm";
import PregnancyPredictionForm from "./components/PregnancyDiabetesPredictionForm";
import Info from "./components/Info";
// import Test from "./components/Test";
import Test from "./components/Test";
import Login from "./components/LoginForm";
import Register from "./components/RegisterForm";
import UserInfoPage from "./components/UserInfoPage";

const slideData = [
  {
    key: "diabetes",
    backgroundImage: "health.jpeg",
    title: "Diabetes Prediction",
    buttonText: "Diabetes Prediction",
  },
  {
    key: "heartDisease",
    backgroundImage: "heartdisease.webp",
    title: "Heart Disease Prediction",
    buttonText: "Heart Disease Prediction",
  },
  {
    key: "pregnancyDiabetes",
    backgroundImage: "pregnant.webp",
    title: "Pregnancy Diabetes Prediction",
    buttonText: "Pregnancy Diabetes Prediction",
  },
];

const Slide = ({ backgroundImage, title, buttonText, onGetStarted }) => {
  const slideStyle = {
    height: "60vh",
    maxHeight: "500px",
    maxWidth: "90vh",
    marginTop: "130px",
    marginLeft: "130px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: `no-repeat center/cover url(${backgroundImage})`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={slideStyle}>
      <h3
        style={{
          marginTop: "10px",
          color: "#000",
          fontSize: "30px",
          fontFamily: "Helvetica Neue",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        {title}
      </h3>
      <Button
        type="primary"
        onClick={onGetStarted}
        size="large"
        style={{ marginTop: "100px" }}
      >
        {buttonText}
      </Button>
    </div>
  );
};

function App() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [backgroundImage, setBackgroundImage] = useState(
    slideData[0].backgroundImage
  );
  const carouselRef = useRef();

  useEffect(() => {
    if (currentView === "dashboard" && carouselRef.current) {
      const activeSlideIndex =
        carouselRef.current.innerSlider.state.currentSlide;
      setBackgroundImage(slideData[activeSlideIndex].backgroundImage);
    }
  }, [currentView]);

  const handleGetStarted = (view) => {
    setCurrentView(view);
  };

  const renderContent = () => {
    switch (currentView) {
      case "diabetes":
        return <DiabetesPredictionForm setCurrentView={setCurrentView} />;
      case "heartDisease":
        return <HeartDiseasePredictionForm setCurrentView={setCurrentView} />;
      case "pregnancyDiabetes":
        return <PregnancyPredictionForm setCurrentView={setCurrentView} />;
      default:
        return (
          <>
            <Carousel
              fade
              infinite
              ref={carouselRef}
              afterChange={(currentSlide) =>
                setBackgroundImage(slideData[currentSlide].backgroundImage)
              }
              autoplay={false}
              dots={false}
              style={{ maxWidth: "1000px", margin: "0 auto" }}
            >
              {slideData.map((slide) => (
                <Slide
                  key={slide.key}
                  backgroundImage={slide.backgroundImage}
                  title={slide.title}
                  buttonText={slide.buttonText}
                  onGetStarted={() => handleGetStarted(slide.key)}
                />
              ))}
            </Carousel>
            <Button
              shape="circle"
              icon={<LeftOutlined />}
              onClick={() => carouselRef.current.prev()}
              style={{
                position: "absolute",
                top: "50%",
                left: 32,
                transform: "translateY(-50%)",
                zIndex: 2,
              }}
            />
            <Button
              shape="circle"
              icon={<RightOutlined />}
              onClick={() => carouselRef.current.next()}
              style={{
                position: "absolute",
                top: "50%",
                right: 32,
                transform: "translateY(-50%)",
                zIndex: 2,
              }}
            />
          </>
        );
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    transition: "background-image 0.3s ease-in-out",
    backgroundSize: "cover",
    filter: "blur(8px)",
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: -1,
  };

  return (
    <BrowserRouter>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div style={backgroundStyle} />
        <Header />
        <main style={{ position: "relative" }}>
          <Routes>
            <Route path="/" element={renderContent()} />
            <Route path="/info" element={<Info />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<UserInfoPage />} />
            {/* <Route path="/test" element={<Test />} />  */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
