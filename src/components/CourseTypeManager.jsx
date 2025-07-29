import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const CourseTypeManager = () => {
  const { courseTypes, setCourseTypes } = useContext(AppContext);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleAdd = () => {
    if (!name.trim()) return;
    setCourseTypes([...courseTypes, { id: Date.now(), name }]);
    setName("");
  };

  const handleUpdate = () => {
    if (!name.trim()) return;
    setCourseTypes(
      courseTypes.map((ct) => (ct.id === editingId ? { ...ct, name } : ct))
    );
    setName("");
    setEditingId(null);
  };

  const handleEdit = (id, name) => {
    setEditingId(id);
    setName(name);
  };

  const handleDelete = (id) => {
    setCourseTypes(courseTypes.filter((ct) => ct.id !== id));
  };

  return (
    <div>
      <h2>Course Type Manager</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Course Type Name"
      />
      <button onClick={editingId ? handleUpdate : handleAdd}>
        {editingId ? "Update" : "Add"}
      </button>

      <ul>
        {courseTypes.map((ct) => (
          <li key={ct.id}>
            {ct.name}
            <button onClick={() => handleEdit(ct.id, ct.name)}>Edit</button>
            <button onClick={() => handleDelete(ct.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseTypeManager;
