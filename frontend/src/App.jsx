import React, { useState, useEffect } from 'react';
import { extractKeywords, rewriteResume, calculateScore, generatePDF, saveResume, getResumes } from './services/api';
import JDInput from './components/JDInput';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import ATSScore from './components/ATSScore';
import Dashboard from './components/Dashboard';
import { Loader2, FileDown, Sparkles, Save, LayoutDashboard, FileText } from 'lucide-react';

function App() {
  const [jd, setJd] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [resumeData, setResumeData] = useState({
    personalInfo: { name: '', email: '', phone: '', title: '' },
    summary: '',
    experience: [{ company: '', role: '', description: '' }],
    skills: ''
  });
  const [atsScore, setAtsScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [showDashboard, setShowDashboard] = useState(false);
  const [savedResumes, setSavedResumes] = useState([]);

  useEffect(() => {
    if (showDashboard) {
      loadResumes();
    }
  }, [showDashboard]);

  const loadResumes = async () => {
    try {
      const data = await getResumes();
      setSavedResumes(data);
    } catch (error) {
      console.error('Failed to load resumes', error);
    }
  };

  const handleSaveResume = async () => {
    if (!resumeData.personalInfo.name) {
      alert('Please fill out at least your name before saving.');
      return;
    }
    setIsLoading(true);
    setLoadingStep('Saving to Dashboard...');
    try {
      const payload = {
        title: `${resumeData.personalInfo.name} - ${new Date().toLocaleDateString()}`,
        ...resumeData,
        jd,
        atsScore,
        skills: typeof resumeData.skills === 'string' ? resumeData.skills : resumeData.skills.join(', ')
      };
      await saveResume(payload);
      alert('Resume saved to dashboard successfully!');
    } catch (error) {
      console.error('Failed to save resume:', error);
      alert('Failed to save resume.');
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  const handleOptimize = async () => {
    if (!jd || !resumeData.personalInfo.name) {
      alert('Please fill out basic resume info and Job Description');
      return;
    }

    setIsLoading(true);
    try {
      setLoadingStep('Extracting keywords from JD...');
      const { keywords: extractedKeywords } = await extractKeywords(jd);
      setKeywords(extractedKeywords);

      setLoadingStep('Optimizing resume with AI...');
      const { optimizedResume } = await rewriteResume(resumeData, extractedKeywords);
      setResumeData(optimizedResume);

      setLoadingStep('Calculating ATS Score...');
      const { score } = await calculateScore(optimizedResume, extractedKeywords);
      setAtsScore(score);
    } catch (error) {
      console.error('Optimization failed:', error);
      alert('Failed to optimize resume. Is the backend running?');
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('resume-preview-content');
    if (!element) return;
    
    setIsLoading(true);
    setLoadingStep('Generating Professional PDF...');
    try {
      // Use inline styles for PDF generation or send a styled HTML string
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-white p-8">
          ${element.innerHTML}
        </body>
        </html>
      `;
      
      const blob = await generatePDF(htmlContent);
      
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'CareerForge_Optimized_Resume.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Failed to generate PDF.');
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              CareerForge Pro
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowDashboard(!showDashboard)}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              {showDashboard ? <><FileText className="w-4 h-4" /> Editor</> : <><LayoutDashboard className="w-4 h-4" /> Dashboard</>}
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold shadow-md">
              R
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showDashboard ? (
          <Dashboard resumes={savedResumes} onLoadResume={(resume) => {
             setResumeData({
               personalInfo: resume.personalInfo || { name: '', email: '', phone: '', title: '' },
               summary: resume.summary || '',
               experience: resume.experience && resume.experience.length > 0 ? resume.experience : [{ company: '', role: '', description: '' }],
               skills: resume.skills || ''
             });
             setJd(resume.jd || '');
             setAtsScore(resume.atsScore || 0);
             setShowDashboard(false);
          }} />
        ) : (
          <>
            <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">AI Resume Architect</h2>
          <p className="mt-2 text-lg text-slate-600">Tailor your resume for any job description instantly.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Inputs */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-lg font-semibold text-slate-800">1. Target Role</h3>
              </div>
              <div className="p-6">
                <JDInput jd={jd} setJd={setJd} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-800">2. Your Details</h3>
              </div>
              <div className="p-6">
                <ResumeForm data={resumeData} onChange={setResumeData} />
              </div>
            </div>

            <button
              onClick={handleOptimize}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-4 px-6 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {loadingStep}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Optimize Resume with AI
                </>
              )}
            </button>
          </div>

          {/* Right Column - Preview & Stats */}
          <div className="space-y-6">
            {atsScore > 0 && (
              <ATSScore score={atsScore} keywords={keywords} />
            )}

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center flex-wrap gap-2">
                <h3 className="text-lg font-semibold text-slate-800">Live Preview</h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveResume}
                    disabled={isLoading}
                    className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    disabled={isLoading}
                    className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <FileDown className="w-4 h-4" />
                    Download PDF
                  </button>
                </div>
              </div>
              <div className="p-8 bg-slate-100 min-h-[600px] flex justify-center overflow-auto">
                <ResumePreview data={resumeData} />
              </div>
            </div>
          </div>
        </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
