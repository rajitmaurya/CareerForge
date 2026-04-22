import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const ResumeForm = ({ data, onChange }) => {
  const updatePersonalInfo = (field, value) => {
    onChange({ ...data, personalInfo: { ...data.personalInfo, [field]: value } });
  };

  const updateExperience = (index, field, value) => {
    const newExp = [...data.experience];
    newExp[index][field] = value;
    onChange({ ...data, experience: newExp });
  };

  const addExperience = () => {
    onChange({
      ...data,
      experience: [...data.experience, { company: '', role: '', description: '' }]
    });
  };

  const removeExperience = (index) => {
    const newExp = data.experience.filter((_, i) => i !== index);
    onChange({ ...data, experience: newExp });
  };

  return (
    <div className="space-y-8">
      {/* Personal Info */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Personal Info</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
            value={data.personalInfo.name}
            onChange={(e) => updatePersonalInfo('name', e.target.value)}
          />
          <input
            type="text"
            placeholder="Professional Title"
            className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
            value={data.personalInfo.title}
            onChange={(e) => updatePersonalInfo('title', e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
            className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
            value={data.personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
            value={data.personalInfo.phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
          />
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Professional Summary</h4>
        <textarea
          rows={3}
          className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border resize-y"
          placeholder="Brief overview of your career..."
          value={data.summary}
          onChange={(e) => onChange({ ...data, summary: e.target.value })}
        />
      </div>

      {/* Experience */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Experience</h4>
          <button
            type="button"
            onClick={addExperience}
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium bg-blue-50 px-2 py-1 rounded-md"
          >
            <Plus className="w-4 h-4" /> Add Role
          </button>
        </div>
        
        {data.experience.map((exp, index) => (
          <div key={index} className="p-4 rounded-xl border border-slate-200 bg-slate-50 relative group">
            <button
              onClick={() => removeExperience(index)}
              className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 pr-6">
              <input
                type="text"
                placeholder="Company Name"
                className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border bg-white"
                value={exp.company}
                onChange={(e) => updateExperience(index, 'company', e.target.value)}
              />
              <input
                type="text"
                placeholder="Role / Job Title"
                className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border bg-white"
                value={exp.role}
                onChange={(e) => updateExperience(index, 'role', e.target.value)}
              />
            </div>
            <textarea
              rows={4}
              className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border resize-y bg-white"
              placeholder="Describe your responsibilities and achievements..."
              value={exp.description}
              onChange={(e) => updateExperience(index, 'description', e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Skills</h4>
        <input
          type="text"
          placeholder="e.g. React, Node.js, Python, Project Management"
          className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
          value={data.skills}
          onChange={(e) => onChange({ ...data, skills: e.target.value })}
        />
      </div>
    </div>
  );
};

export default ResumeForm;
