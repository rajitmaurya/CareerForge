const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const resumeController = require('../controllers/resumeController');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Auth routes
router.post('/auth/register', authController.registerUser);
router.post('/auth/login', authController.loginUser);

// AI routes
router.post('/keywords', aiController.extractKeywords);
router.post('/rewrite', aiController.rewriteResume);
router.post('/score', aiController.calculateScore);
router.post('/pdf', aiController.generatePDF);

// Resume routes (Protected)
router.post('/resumes', protect, resumeController.saveResume);
router.get('/resumes', protect, resumeController.getResumes);
router.get('/resumes/:id', protect, resumeController.getResumeById);

module.exports = router;
