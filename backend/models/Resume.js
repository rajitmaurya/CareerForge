const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'My Resume'
  },
  personalInfo: {
    name: String,
    email: String,
    phone: String,
    title: String,
  },
  summary: String,
  experience: [
    {
      company: String,
      role: String,
      description: String,
    }
  ],
  skills: String,
  jd: String,
  atsScore: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Resume', resumeSchema);
