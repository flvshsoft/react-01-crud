import React, { useState } from "react";
import { dummyData } from "./data";

function App() {
  const [data, setData] = useState(dummyData);
  const [form, setForm] = useState({ id: null, name: "", email: "" });
  const [isEdit, setIsEdit] = useState(false);

  // Handle input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Create data
  const handleCreate = () => {
    setData([...data, { ...form, id: Date.now() }]);
    setForm({ id: null, name: "", email: "" });
  };

  // Edit data
  const handleEdit = (item) => {
    setForm(item);
    setIsEdit(true);
  };

  // Update data
  const handleUpdate = () => {
    setData(data.map((item) => (item.id === form.id ? form : item)));
    setForm({ id: null, name: "", email: "" });
    setIsEdit(false);
  };

  // Delete data
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>React CRUD App</h1>

      {/* Form */}
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        {isEdit ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={handleCreate}>Add</button>
        )}
      </div>

      {/* Table */}
      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
