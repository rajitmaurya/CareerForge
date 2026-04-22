const Resume = require('../models/Resume');

exports.saveResume = async (req, res) => {
  try {
    const { title, personalInfo, summary, experience, skills, jd, atsScore } = req.body;
    
    const newResume = new Resume({
      title,
      personalInfo,
      summary,
      experience,
      skills,
      jd,
      atsScore
    });

    const savedResume = await newResume.save();
    res.status(201).json(savedResume);
  } catch (error) {
    console.error('Error saving resume:', error);
    res.status(500).json({ error: 'Failed to save resume' });
  }
};

exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
};

exports.getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    console.error('Error fetching resume by ID:', error);
    res.status(500).json({ error: 'Failed to fetch resume' });
  }
};
