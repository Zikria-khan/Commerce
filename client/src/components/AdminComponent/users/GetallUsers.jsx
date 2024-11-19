import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import './GetallUser.css'; // Custom CSS for styling

function GetAllUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Initialize navigate function

  // Fetch all users from the API or database (mocked here)
  useEffect(() => {
    const fetchedUsers = [
      { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Inactive" },
      { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "User", status: "Active" },
      { id: 4, name: "Bob Brown", email: "bob@example.com", role: "Admin", status: "Active" },
    ];
    setUsers(fetchedUsers);
  }, []);

  // Navigate back to Admin Dashboard
  const handleBackClick = () => {
    navigate('/admindashboard'); // Adjust the route as needed
  };

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>All Users</h2>
        <button className="btn btn-blue">Add New User</button>
        <button className="btn btn-back" onClick={handleBackClick}>Back to Admin Dashboard</button>
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button className="btn btn-view">View</button>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GetAllUsers;
