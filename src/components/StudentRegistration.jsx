import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const StudentRegistration = () => {
  const {
    courseTypes,
    courses,
    offerings,
    registrations,
    setRegistrations,
  } = useContext(AppContext);

  const [studentName, setStudentName] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedOffering, setSelectedOffering] = useState("");

  const filteredOfferings = selectedType
    ? offerings.filter((o) => o.courseTypeId === selectedType)
    : offerings;

  const handleRegister = () => {
    if (!studentName.trim() || !selectedOffering) return;
    setRegistrations([
      ...registrations,
      { id: Date.now(), studentName, offeringId: selectedOffering },
    ]);
    setStudentName("");
    setSelectedOffering("");
  };

  return (
    <div>
      <h2>Register Student</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: 400 }}>
        <label>Filter by Course Type:</label>
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value="">-- Select Type --</option>
          {courseTypes.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>

        <label>Select Course Offering:</label>
        <select value={selectedOffering} onChange={(e) => setSelectedOffering(e.target.value)}>
          <option value="">-- Select Offering --</option>
          {filteredOfferings.map((o) => {
            const course = courses.find((c) => c.id === o.courseId)?.name || "";
            const type = courseTypes.find((t) => t.id === o.courseTypeId)?.name || "";
            return (
              <option key={o.id} value={o.id}>{type} - {course}</option>
            );
          })}
        </select>

        <label>Student Name:</label>
        <input
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Enter student name"
        />

        <button onClick={handleRegister}>Register</button>
      </div>

      <h3 style={{ marginTop: "30px" }}>Registered Students</h3>
      <ul>
        {registrations.map((r) => {
          const offering = offerings.find((o) => o.id === r.offeringId);
          const course = courses.find((c) => c.id === offering?.courseId)?.name || "";
          const type = courseTypes.find((t) => t.id === offering?.courseTypeId)?.name || "";
          return (
            <li key={r.id}>
              {r.studentName} → {type} - {course}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StudentRegistration;
