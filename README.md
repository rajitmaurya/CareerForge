# CareerForge Pro - AI Resume Architect

## Architecture

This is a modern MERN-stack (without MongoDB for simplicity, but easily addable) application that utilizes Google's Gemini AI to analyze job descriptions and optimize resumes. It also uses Puppeteer to generate pixel-perfect PDFs from the React components.

- **Frontend**: React, Vite, Tailwind CSS, Axios, Lucide React
- **Backend**: Node.js, Express, @google/genai, Puppeteer, CORS, dotenv

## How to Run Locally

### 1. Backend Setup
1. Navigate to the \`backend\` directory:
   \`\`\`bash
   cd backend
   \`\`\`
2. Install dependencies (already done if you followed my automated setup):
   \`\`\`bash
   npm install
   \`\`\`
3. Add your Gemini API Key in \`backend/.env\`:
   \`\`\`env
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key_here
   \`\`\`
4. Start the backend development server:
   \`\`\`bash
   npm run dev
   \`\`\`
   The server will run on \`http://localhost:5000\`.

### 2. Frontend Setup
1. Navigate to the \`frontend\` directory:
   \`\`\`bash
   cd frontend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start the Vite development server:
   \`\`\`bash
   npm run dev
   \`\`\`
   The application will run on \`http://localhost:5173\` (or \`5174\` if 5173 is in use).

## API Design

- **\`POST /api/keywords\`**: Analyzes a job description (jd) and extracts the most relevant keywords.
- **\`POST /api/rewrite\`**: Takes a resume object and extracted keywords, and uses Gemini to naturally insert the keywords into the resume's experience and summary sections without hallucinating facts.
- **\`POST /api/score\`**: Calculates a percentage score based on how many extracted keywords are present in the optimized resume.
- **\`POST /api/pdf\`**: Receives styled HTML string from the frontend and uses Puppeteer Headless Chrome to render and return a downloadable PDF buffer.
