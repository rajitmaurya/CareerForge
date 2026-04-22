const aiService = require('../services/aiService');
const pdfService = require('../services/pdfService');
const { calculateATSScore } = require('../utils/scoreCalculator');

exports.extractKeywords = async (req, res) => {
  try {
    const { jd } = req.body;
    if (!jd) {
      return res.status(400).json({ error: 'Job description is required' });
    }
    const keywords = await aiService.extractKeywordsFromJD(jd);
    res.json({ keywords });
  } catch (error) {
    console.error('Error in extractKeywords:', error);
    res.status(500).json({ error: 'Failed to extract keywords' });
  }
};

exports.rewriteResume = async (req, res) => {
  try {
    const { resume, keywords } = req.body;
    if (!resume || !keywords) {
      return res.status(400).json({ error: 'Resume and keywords are required' });
    }
    const optimizedResume = await aiService.rewriteResumeWithKeywords(resume, keywords);
    res.json({ optimizedResume });
  } catch (error) {
    console.error('Error in rewriteResume:', error);
    res.status(500).json({ error: 'Failed to rewrite resume' });
  }
};

exports.calculateScore = async (req, res) => {
  try {
    const { resume, keywords } = req.body;
    if (!resume || !keywords) {
      return res.status(400).json({ error: 'Resume and keywords are required' });
    }
    const score = calculateATSScore(resume, keywords);
    res.json({ score });
  } catch (error) {
    console.error('Error in calculateScore:', error);
    res.status(500).json({ error: 'Failed to calculate score' });
  }
};

exports.generatePDF = async (req, res) => {
  try {
    const { htmlContent } = req.body;
    if (!htmlContent) {
      return res.status(400).json({ error: 'HTML content is required' });
    }
    
    const pdfBuffer = await pdfService.createPDF(htmlContent);
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=resume.pdf',
      'Content-Length': pdfBuffer.length
    });
    
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error in generatePDF:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
};
