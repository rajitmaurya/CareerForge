import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

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
    responseType: 'blob'
  });
  return response.data;
};

export const saveResume = async (resumeData) => {
  const response = await axios.post(`${API_URL}/resumes`, resumeData, { headers: getAuthHeaders() });
  return response.data;
};

export const getResumes = async () => {
  const response = await axios.get(`${API_URL}/resumes`, { headers: getAuthHeaders() });
  return response.data;
};
