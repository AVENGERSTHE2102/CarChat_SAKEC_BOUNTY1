# Career Guidance Assistant

A dynamic, intelligent web application designed to help users discover personalized career paths, assess skills, and follow step-by-step learning roadmaps. Built with a focus on simple architecture, high stability, and instant usability.

## Quick Start (Run instantly)

This project requires **Node.js** (v18+ recommended) and `npm`.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Application
Run both the React frontend and Python backend simultaneously:
```bash
npm start
```

### 3. Open in Browser
Visit `http://localhost:5173` to interact with the assistant.

## Expected Input/Output Example
- **Input:** "I enjoy solving logical puzzles and designing websites." (Entered in the chat interface)
- **Output:** The AI instantly responds with tailored recommendations, and the user can navigate to the "Career Paths" tab to see dynamically rendered roles like "Full Stack Developer" or "UX/UI Designer" along with matching scores and salaries.

## Features
- 🤖 **Interactive Chat Assistant**: Simulate AI conversations to uncover career interests.
- 🗺️ **Career Paths**: View recommended career roles, required skills, and expected salaries.
- 🎓 **Learning Roadmaps**: Track progress step-by-step through a visual timeline of learning objectives.

## Dependencies File
This project uses `package.json` to manage dependencies. Core libraries include:
- `react` / `react-dom`
- `react-router-dom` (Navigation)
- `lucide-react` (Icons)
- `framer-motion` (Animations)

## Project Structure
```text
project-root/
├── README.md             <- This file
├── package.json          <- Dependencies file
└── src/                  <- Source code
    ├── main.jsx          <- Entry point
    ├── App.jsx           <- Router config
    ├── index.css         <- Core styling and CSS variables
    ├── components/       <- Layout components (Header, Sidebar)
    └── pages/            <- Views (Chat, Paths, Roadmaps)
```

## Demo
Live Demo URL: [To be added upon deployment, e.g., via Vercel]
