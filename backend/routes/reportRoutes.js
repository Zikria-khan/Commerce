const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController'); // Import your report controller

// Route to create a new report
router.post('/reports', reportController.createReport);

// Route to get all reports
router.get('/reports', reportController.getReports);

// Route to get reports for a specific user (by userId)
router.get('/reports/user/:userId', reportController.getReportsByUserId);

// Route to get a report by its ID
router.get('/reports/:reportId', reportController.getReportById);

module.exports = router;
