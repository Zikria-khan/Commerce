const Report = require('../Models/reportSchema'); // Import the Report model

// Create a new report
const createReport = async (req, res) => {
  const { reportType, reportDescription,userId, reportTitle } = req.body;
console.log(req.body,reportType, reportDescription,userId, reportTitle)
  try {

    // Create a new report instance
    const newReport = new Report({
      reportType, reportDescription, reportTitle ,userId
    });

    // Save the report to the database
    const savedReport = await newReport.save();

    // Respond with a success message and the saved report
    res.status(201).json({
      message: 'Report created successfully',
      report: savedReport,
    });
  } catch (error) {
    console.error('Error creating report:', error); // Log the error
    res.status(500).json({
      message: 'Error creating report',
      error: error.message,
    });
  }
};

// Get all reports
const getReports = async (req, res) => {
  try {
    const reports = await Report.find(); // Fetch all reports from the database
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching reports',
      error: error.message,
    });
  }
};

// Get reports by userId
const getReportsByUserId = async (req, res) => {
  const { userId } = req.params; // Get userId from request params

  try {
    const reports = await Report.find({ userId }); // Fetch reports created by this user

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching reports by user',
      error: error.message,
    });
  }
};

// Get a report by ID
const getReportById = async (req, res) => {
  const { reportId } = req.params;

  try {
    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({
        message: 'Report not found',
      });
    }

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching report',
      error: error.message,
    });
  }
};

module.exports = {
  createReport,
  getReports,
  getReportsByUserId, // Expose the new function to get reports by userId
  getReportById,
};
