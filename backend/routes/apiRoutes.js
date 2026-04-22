const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const resumeController = require('../controllers/resumeController');

router.post('/keywords', aiController.extractKeywords);
router.post('/rewrite', aiController.rewriteResume);
router.post('/score', aiController.calculateScore);
router.post('/pdf', aiController.generatePDF);

router.post('/resumes', resumeController.saveResume);
router.get('/resumes', resumeController.getResumes);
router.get('/resumes/:id', resumeController.getResumeById);

module.exports = router;
