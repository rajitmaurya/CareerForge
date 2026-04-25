import React from 'react';
import { FileText, Calendar, Target, Edit } from 'lucide-react';

const Dashboard = ({ resumes, onLoadResume }) => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Your Saved Resumes</h2>
        <p className="mt-2 text-lg text-slate-600">Access and edit your previously optimized resumes.</p>
      </div>

      {resumes.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 sm:p-12 text-center">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-slate-900 mb-2">No resumes saved yet</h3>
          <p className="text-slate-500">
            Go to the Editor, create your first resume, and click "Save" to see it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div key={resume._id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">
              <div className="p-5 sm:p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-slate-800 line-clamp-1" title={resume.title}>
                    {resume.title}
                  </h3>
                  {resume.atsScore > 0 && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700">
                      <Target className="w-3 h-3" /> {resume.atsScore}%
                    </span>
                  )}
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <FileText className="w-4 h-4" />
                    <span className="line-clamp-1">{resume.personalInfo?.title || 'No Title'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(resume.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => onLoadResume(resume)}
                  className="w-full flex items-center justify-center gap-2 text-sm font-medium text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 px-4 py-2.5 rounded-lg transition-colors border border-blue-100 hover:border-blue-600"
                >
                  <Edit className="w-4 h-4" />
                  Load & Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
