// ---------------------------
// src/App.jsx
// ---------------------------
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CourseTypeManager from "./components/CourseTypeManager";
import CourseManager from "./components/CourseManager";
import CourseOfferingManager from "./components/CourseOfferingManager";
import StudentRegistration from "./components/StudentRegistration";

const App = () => (
  <div className="app">
    <nav>
      <Link to="/">Home</Link> | <Link to="/course-types">Course Types</Link> | <Link to="/courses">Courses</Link> | <Link to="/offerings">Offerings</Link> | <Link to="/register">Register</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/course-types" element={<CourseTypeManager />} />
      <Route path="/courses" element={<CourseManager />} />
      <Route path="/offerings" element={<CourseOfferingManager />} />
      <Route path="/register" element={<StudentRegistration />} />
    </Routes>
  </div>
);

export default App;

