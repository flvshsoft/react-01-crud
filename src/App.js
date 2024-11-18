import React, { useState } from "react";
import { dummyData } from "./data";

function App() {
  const [data, setData] = useState(dummyData);
  const [form, setForm] = useState({ id: null, name: "", email: "", no_hp: "" });
  const [isEdit, setIsEdit] = useState(false);

  const [appName, setAppName] = useState("React CRUD");
  const [creator, setCreator] = useState("???");
  const [univ, setUniv] = useState("Lancang Kuning");

  const handleUniv = () => {
    setAppName("TalukApp");
    setCreator("Yura");
    setUniv("Flashsoft Indonesia");
  };

  // Handle input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Create data
  const handleCreate = () => {
    setData([...data, { ...form, id: Date.now() }]);
    setForm({ id: null, name: "", email: "", no_hp: "" });
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
      <h1>
        {appName} <small>by {creator}</small>
      </h1>
      <p>from {univ} </p>
      <button onClick={handleUniv}>Ubah Data</button>

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
        <input
          type="text"
          name="no_hp"
          placeholder="Masukkan no hp"
          value={form.no_hp}
          onChange={handleChange}
        />
        {isEdit ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={handleCreate}>Add</button>
        )}
      </div>

      {/* Table */}
      <h2>{appName}</h2>
      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Nomor Hp</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.no_hp}</td>
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
