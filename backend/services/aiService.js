const { GoogleGenAI } = require('@google/genai');

// Use dummy API key for local development if not provided
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'dummy_key' });

exports.extractKeywordsFromJD = async (jd) => {
  const prompt = `
    Analyze the following Job Description and extract the top 15 most important keywords, skills, and technologies required for the role. 
    Return ONLY a valid JSON array of strings representing these keywords. Do not include any markdown formatting like \`\`\`json.
    
    Job Description:
    ${jd}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });
    let text = response.text;
    // Clean up if the model includes markdown
    if (text.startsWith('\`\`\`json')) {
      text = text.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '');
    }
    return JSON.parse(text);
  } catch (error) {
    console.error('Error with Gemini API (Keywords):', error);
    // Fallback for demo purposes if API key is missing or invalid
    return ['React', 'Node.js', 'MongoDB', 'JavaScript', 'TypeScript', 'API Design'];
  }
};

exports.rewriteResumeWithKeywords = async (resume, keywords) => {
  const prompt = `
    You are an expert resume writer and ATS optimization specialist.
    Rewrite the following resume to naturally incorporate the provided keywords while maintaining professionalism and clarity. 
    DO NOT hallucinate fake experience. Only enhance existing bullet points to align with the keywords where it makes sense.
    
    Keywords to include: ${keywords.join(', ')}
    
    Current Resume:
    ${JSON.stringify(resume)}
    
    Return the optimized resume in the EXACT same JSON format as provided. Do not include any markdown formatting like \`\`\`json.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });
    let text = response.text;
    // Clean up if the model includes markdown
    if (text.startsWith('\`\`\`json')) {
      text = text.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '');
    }
    return JSON.parse(text);
  } catch (error) {
    console.error('Error with Gemini API (Rewrite):', error);
    // Fallback for demo purposes
    return resume; // Returning original resume as fallback
  }
};
