import React from 'react';

const ResumePreview = ({ data }) => {
  const { personalInfo, summary, experience, skills } = data;

  return (
    <div 
      id="resume-preview-content" 
      className="bg-white p-8 w-full max-w-[210mm] shadow-lg border border-slate-200"
      style={{ minHeight: '297mm' }}
    >
      {/* Header */}
      <header className="border-b-2 border-slate-800 pb-4 mb-6 text-center">
        <h1 className="text-3xl font-serif font-bold text-slate-900 mb-1">
          {personalInfo?.name || 'Your Name'}
        </h1>
        <h2 className="text-xl text-slate-600 mb-3 font-medium">
          {personalInfo?.title || 'Professional Title'}
        </h2>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500 font-medium">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.email && personalInfo?.phone && <span>•</span>}
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">
            Professional Summary
          </h3>
          <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && experience.some(exp => exp.company || exp.role) && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">
            Experience
          </h3>
          <div className="space-y-5">
            {experience.map((exp, index) => (
              (exp.company || exp.role) ? (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-slate-900 text-base">{exp.role || 'Role'}</h4>
                    <span className="font-semibold text-slate-700">{exp.company || 'Company'}</span>
                  </div>
                  {exp.description && (
                    <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap mt-2 pl-4 border-l-2 border-slate-200">
                      {/* Splitting bullet points if they exist, or just displaying text */}
                      {exp.description.split('\n').map((line, i) => (
                        line.trim() ? <div key={i} className="relative mb-1">
                           <span className="absolute -left-4 top-1.5 w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                           {line.replace(/^-\s*/, '')}
                        </div> : null
                      ))}
                    </div>
                  )}
                </div>
              ) : null
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && (
        <section>
          <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">
            Skills & Competencies
          </h3>
          <p className="text-slate-700 text-sm font-medium leading-relaxed">
            {skills}
          </p>
        </section>
      )}
    </div>
  );
};

export default ResumePreview;
