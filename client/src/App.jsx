import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import UploadForm from "./Component/UploadForm";
import VideoList from "./Component/VideoList";
import VideoPlayer from "./Component/VideoPlayer";
import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";

function App() {
  return (
    <Router>
      <div className="App" style={appStyle}>
        <Header />
        <div style={contentStyle}>
          <Routes>
            <Route path="/" element={<UploadForm />} />
            <Route path="/videos" element={<VideoList />} />
            <Route path="/video/:id" element={<VideoPlayer />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
const appStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
};

const contentStyle = {
  flex: "1",
  padding: "20px",
};

export default App;
