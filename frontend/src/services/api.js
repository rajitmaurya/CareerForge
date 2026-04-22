import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const extractKeywords = async (jd) => {
  const response = await axios.post(`${API_URL}/keywords`, { jd });
  return response.data;
};

export const rewriteResume = async (resume, keywords) => {
  const response = await axios.post(`${API_URL}/rewrite`, { resume, keywords });
  return response.data;
};

export const calculateScore = async (resume, keywords) => {
  const response = await axios.post(`${API_URL}/score`, { resume, keywords });
  return response.data;
};

export const generatePDF = async (htmlContent) => {
  const response = await axios.post(`${API_URL}/pdf`, { htmlContent }, {
    responseType: 'blob' // Important for downloading files
  });
  return response.data;
};

export const saveResume = async (resumeData) => {
  const response = await axios.post(`${API_URL}/resumes`, resumeData);
  return response.data;
};

export const getResumes = async () => {
  const response = await axios.get(`${API_URL}/resumes`);
  return response.data;
};
