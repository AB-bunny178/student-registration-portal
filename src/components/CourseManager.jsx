import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const CourseManager = () => {
  const { courses, setCourses } = useContext(AppContext);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleAdd = () => {
    if (!name.trim()) return;
    setCourses([...courses, { id: Date.now(), name }]);
    setName("");
  };

  const handleUpdate = () => {
    setCourses(
      courses.map((course) => (course.id === editingId ? { ...course, name } : course))
    );
    setName("");
    setEditingId(null);
  };

  const handleEdit = (id, name) => {
    setEditingId(id);
    setName(name);
  };

  const handleDelete = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  return (
    <div>
      <h2>Course Manager</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Course Name"
      />
      <button onClick={editingId ? handleUpdate : handleAdd}>
        {editingId ? "Update" : "Add"}
      </button>

      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            {course.name}
            <button onClick={() => handleEdit(course.id, course.name)}>Edit</button>
            <button onClick={() => handleDelete(course.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseManager;
