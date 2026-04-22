exports.calculateATSScore = (resumeObj, keywords) => {
  if (!keywords || keywords.length === 0) return 0;
  
  // Convert resume to a single string for simple matching
  const resumeText = JSON.stringify(resumeObj).toLowerCase();
  
  let matchCount = 0;
  keywords.forEach(keyword => {
    if (resumeText.includes(keyword.toLowerCase())) {
      matchCount++;
    }
  });

  const score = Math.round((matchCount / keywords.length) * 100);
  return score;
};
