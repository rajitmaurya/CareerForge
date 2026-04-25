import React from 'react';
import { Target, CheckCircle2 } from 'lucide-react';

const ATSScore = ({ score, keywords }) => {
  let scoreColor = 'text-red-500';
  let bgColor = 'bg-red-50';
  let borderColor = 'border-red-200';
  let progressColor = 'bg-red-500';

  if (score >= 80) {
    scoreColor = 'text-green-500';
    bgColor = 'bg-green-50';
    borderColor = 'border-green-200';
    progressColor = 'bg-green-500';
  } else if (score >= 50) {
    scoreColor = 'text-yellow-500';
    bgColor = 'bg-yellow-50';
    borderColor = 'border-yellow-200';
    progressColor = 'bg-yellow-500';
  }

  return (
    <div className={`rounded-xl border p-4 sm:p-6 shadow-sm ${bgColor} ${borderColor}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className={`w-6 h-6 ${scoreColor}`} />
          <h3 className="text-lg font-bold text-slate-800">ATS Match Score</h3>
        </div>
        <div className={`text-3xl font-extrabold ${scoreColor}`}>
          {score}%
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-slate-200 rounded-full h-2.5 mb-6">
        <div 
          className={`h-2.5 rounded-full transition-all duration-1000 ${progressColor}`} 
          style={{ width: `${score}%` }}
        ></div>
      </div>

      {keywords && keywords.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-slate-700 mb-3">Extracted Keywords from JD:</p>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <span 
                key={index} 
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-white border border-slate-200 text-slate-700 shadow-sm"
              >
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSScore;
