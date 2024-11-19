import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Report.css';

function Report() {
  const [report, setReport] = useState({
    reportTitle: '',
    reportDescription: '',
    reportType: 'bug',
  });

  const [userReports, setUserReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  // Redirect to login if no userId is found
  useEffect(() => {
    if (!userId) {
      setError('You must log in to access reports.');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      fetchReports();
    }
  }, [userId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReport({ ...report, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert('Please log in to submit a report.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...report, userId }),
      });

      if (!response.ok) throw new Error('Error submitting report');
      alert('Report submitted successfully!');
      setReport({ reportTitle: '', reportDescription: '', reportType: 'bug' });
      fetchReports(); // Refresh the reports after submission
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report.');
    }
  };

  const fetchReports = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/reports/user/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch reports');

      const data = await response.json();
      setUserReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
      setError('Failed to load your reports.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-container">
      <h2>E-commerce Reports</h2>

      {/* Report Form */}
      <div className="report-form-section">
        <h3>Submit a Report</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="reportTitle">Report Title</label>
            <input
              type="text"
              id="reportTitle"
              name="reportTitle"
              value={report.reportTitle}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="reportDescription">Description</label>
            <textarea
              id="reportDescription"
              name="reportDescription"
              value={report.reportDescription}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="reportType">Report Type</label>
            <select
              id="reportType"
              name="reportType"
              value={report.reportType}
              onChange={handleInputChange}
              required
            >
              <option value="bug">Bug</option>
              <option value="feedback">Feedback</option>
              <option value="complaint">Complaint</option>
              <option value="suggestion">Suggestion</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button type="submit" className="submit-button">
            Submit Report
          </button>
        </form>
      </div>

      {/* User Reports */}
      <div className="user-reports-section">
        <h3>Your Reports</h3>
        {loading ? (
          <p>Loading reports...</p>
        ) : error ? (
          <p>{error}</p>
        ) : userReports.length === 0 ? (
          <p>No reports found.</p>
        ) : (
          <ul>
            {userReports.map((report, index) => (
              <li key={index}>
                <strong>{report.reportTitle}</strong>: {report.reportDescription} (Type: {report.reportType})
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Back to Shop Link */}
      <div className="back-to-shop">
        <Link to="/shoppingpage" className="back-link">
          Back to Shop Page
        </Link>
      </div>
    </div>
  );
}

export default Report;
