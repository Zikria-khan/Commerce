import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation
import './Report.css'; // Importing the regular CSS file

function Report() {
  const navigate = useNavigate(); // Hook to handle navigation
  
  // Example report data for admin (replace with real data from an API)
  const [reports, setReports] = useState([
    { id: 1, title: 'Website Down', description: 'The website is currently down.', type: 'error', submittedBy: 'John Doe' },
    { id: 2, title: 'Feature Request', description: 'Please add a dark mode option.', type: 'general', submittedBy: 'Jane Smith' },
    { id: 3, title: 'Payment Issue', description: 'Users are facing payment errors.', type: 'error', submittedBy: 'Michael Brown' },
  ]);

  // Function to navigate back to the shop
  const handleBackToShop = () => {
    navigate('/admindashboard'); // Replace '/shop' with the correct route for your shop page
  };

  return (
    <div className="report-container">
      <h2 className="report-header">Admin Dashboard</h2>

      {/* Section to View All Reports */}
      <div className="report-section">
        <h3>All Submitted Reports</h3>
        <table className="report-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Type</th>
              <th>Submitted By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.title}</td>
                <td>{report.description}</td>
                <td>{report.type}</td>
                <td>{report.submittedBy}</td>
                <td>
                  <button className="view-button">View</button>
                  <button className="resolve-button">Resolve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Back to Shop Button */}
      <button className="back-to-shop-button" onClick={handleBackToShop}>
        Back to Shop
      </button>
    </div>
  );
}

export default Report;
