import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const CourseOfferingManager = () => {
  const { courses, courseTypes, offerings, setOfferings } = useContext(AppContext);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleAdd = () => {
    if (!selectedCourse || !selectedType) return;
    setOfferings([
      ...offerings,
      { id: Date.now(), courseId: selectedCourse, courseTypeId: selectedType },
    ]);
    setSelectedCourse("");
    setSelectedType("");
  };

  const handleUpdate = () => {
    setOfferings(
      offerings.map((o) =>
        o.id === editingId ? { ...o, courseId: selectedCourse, courseTypeId: selectedType } : o
      )
    );
    setSelectedCourse("");
    setSelectedType("");
    setEditingId(null);
  };

  const handleEdit = (offering) => {
    setSelectedCourse(offering.courseId);
    setSelectedType(offering.courseTypeId);
    setEditingId(offering.id);
  };

  const handleDelete = (id) => {
    setOfferings(offerings.filter((o) => o.id !== id));
  };

  return (
    <div>
      <h2>Course Offering Manager</h2>
      <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
        <option value="">Select Course</option>
        {courses.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
        <option value="">Select Course Type</option>
        {courseTypes.map((t) => (
          <option key={t.id} value={t.id}>{t.name}</option>
        ))}
      </select>

      <button onClick={editingId ? handleUpdate : handleAdd}>
        {editingId ? "Update" : "Add"}
      </button>

      <ul>
        {offerings.map((o) => {
          const course = courses.find((c) => c.id === o.courseId)?.name || "";
          const type = courseTypes.find((t) => t.id === o.courseTypeId)?.name || "";
          return (
            <li key={o.id}>
              {type} - {course}
              <button onClick={() => handleEdit(o)}>Edit</button>
              <button onClick={() => handleDelete(o.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CourseOfferingManager;
