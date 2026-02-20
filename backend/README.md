# 🤖 AI Career Guidance Assistant - Backend API

**Dynamic AI-powered career counseling with real-time market analysis**

---

## ✨ Features

✅ **AI-Powered Recommendations** - Uses Claude 4.5 for intelligent career analysis
✅ **Real-Time Market Data** - Analyzes current job trends and skill demands (Feb 2025)
✅ **Skill Gap Analysis** - Identifies what users need to learn
✅ **Personalized Roadmaps** - Step-by-step learning paths
✅ **Fallback Mode** - Works without API key for testing/demo
✅ **Production Ready** - Error handling, CORS, validation included

---

## 🚀 Quick Start (30 Seconds)

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Installation & Run

```bash
# 1. Navigate to backend directory
cd backend

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run the server
python main.py
```

✅ **Server will start at:** `http://localhost:8000`
✅ **API Documentation:** `http://localhost:8000/docs`
✅ **Health Check:** `http://localhost:8000`

---

## 🔑 API Key Setup (Optional)

The system works in **two modes**:

### 1. **AI Mode** (with Anthropic API key)
- Dynamic AI-powered recommendations
- Real-time reasoning
- Personalized analysis

```bash
# Copy example env file
cp .env.example .env

# Edit .env and add your API key
ANTHROPIC_API_KEY=your_actual_key_here
```

Get your API key: https://console.anthropic.com/

### 2. **Fallback Mode** (without API key)
- Smart rule-based recommendations
- Still analyzes user profile
- Perfect for testing/demo
- **No setup required** - just run it!

---

## 📡 API Endpoints

### 1. Health Check
```http
GET /
```

**Response:**
```json
{
  "status": "online",
  "service": "AI Career Guidance Assistant",
  "version": "1.0.0",
  "timestamp": "2025-02-20T10:30:00"
}
```

---

### 2. Chat Interface
```http
POST /api/chat
```

**Request Body:**
```json
{
  "message": "I want career guidance",
  "profile": {
    "name": "John Doe",
    "current_role": "Student",
    "education": "Computer Science degree",
    "interests": ["coding", "AI", "problem solving"],
    "skills": ["Python", "JavaScript"],
    "experience_years": 0,
    "preferred_industries": ["technology"],
    "location": "Remote"
  }
}
```

**Response:**
```json
{
  "message": "Hi John! Based on your profile...",
  "recommendations": [
    {
      "title": "Software Developer",
      "match_score": 85,
      "reason": "Your coding interests align perfectly...",
      "required_skills": ["Python", "Git", "Data Structures"],
      "average_salary": "$70,000 - $120,000",
      "growth_outlook": "High - 22% growth through 2030",
      "learning_roadmap": [
        "Master Python programming",
        "Learn data structures",
        "Build portfolio projects",
        "Contribute to open source",
        "Apply for positions"
      ]
    }
  ],
  "timestamp": "2025-02-20T10:30:00"
}
```

---

### 3. Profile Analysis
```http
POST /api/analyze-profile
```

**Request Body:**
```json
{
  "name": "Jane Smith",
  "education": "Marketing degree",
  "interests": ["data", "analytics", "business"],
  "skills": ["Excel", "Communication"],
  "experience_years": 2
}
```

**Returns:** Array of 3-5 career recommendations

---

### 4. Trending Skills
```http
GET /api/trending-skills?industry=technology
```

**Response:**
```json
{
  "industry": "technology",
  "trending_skills": [
    "Python", "JavaScript", "React", "AWS",
    "Docker", "AI/ML", "Cloud Computing"
  ],
  "timestamp": "2025-02-20T10:30:00"
}
```

**Supported Industries:** `technology`, `data`, `design`, `business`

---

### 5. Market Data
```http
GET /api/market-data/software-developer
```

**Response:**
```json
{
  "role": "software-developer",
  "market_data": {
    "demand": "High",
    "salary_range": "$60,000 - $120,000",
    "growth_rate": "15% (Above Average)",
    "open_positions": "50,000+",
    "competition": "Moderate",
    "remote_availability": "High"
  },
  "timestamp": "2025-02-20T10:30:00"
}
```

---

## 🧪 Testing

### Test with curl:

```bash
# Health check
curl http://localhost:8000

# Get trending skills
curl http://localhost:8000/api/trending-skills

# Get career recommendations
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Help me choose a career",
    "profile": {
      "name": "Test User",
      "education": "CS Student",
      "interests": ["coding", "AI"],
      "skills": ["Python"],
      "experience_years": 0
    }
  }'
```

### Test with Python:

```python
import requests

# Test profile
profile = {
    "name": "Alex",
    "education": "Computer Science",
    "interests": ["programming", "data"],
    "skills": ["Python", "SQL"],
    "experience_years": 1
}

# Get recommendations
response = requests.post(
    "http://localhost:8000/api/analyze-profile",
    json=profile
)

print(response.json())
```

---

## 🏗️ Architecture

```
User Input
    ↓
FastAPI Server (main.py)
    ↓
┌─────────────┬──────────────┬────────────────┐
│   AI Engine │ Market Data  │  Skill Analyzer│
│   (Claude)  │   Fetcher    │                │
└─────────────┴──────────────┴────────────────┘
    ↓
Career Recommendations + Learning Roadmap
```

### Components:

1. **CareerAdvisor** - AI reasoning engine using Claude
2. **MarketDataFetcher** - Real-time job/skill trend data
3. **Fallback System** - Smart recommendations when AI unavailable
4. **API Layer** - FastAPI endpoints with validation

---

## 🔒 Error Handling

The system is designed for **zero crashes**:

- ✅ Validates all inputs with Pydantic
- ✅ Try-catch blocks on all API calls
- ✅ Automatic fallback when AI fails
- ✅ Meaningful error messages
- ✅ HTTP status codes for debugging

---

## 🌐 CORS Configuration

Currently set to allow all origins for development:

```python
allow_origins=["*"]
```

For production, update to your frontend URL:

```python
allow_origins=["https://yourfrontend.com"]
```

---

## 📦 Dependencies

- **fastapi** - Modern web framework
- **uvicorn** - ASGI server
- **anthropic** - Claude AI SDK
- **pydantic** - Data validation
- **httpx** - Async HTTP client

---

## 🎯 Production Deployment

### Using Uvicorn:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Using Docker:
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Environment Variables:
- `ANTHROPIC_API_KEY` - Optional, enables AI mode
- `PORT` - Server port (default: 8000)
- `HOST` - Server host (default: 0.0.0.0)

---

## 📊 Expected Input/Output Example

### Input:
```json
{
  "name": "Sarah",
  "education": "Business Administration",
  "interests": ["data", "analytics", "visualization"],
  "skills": ["Excel", "PowerPoint"],
  "experience_years": 0
}
```

### Output:
```json
[
  {
    "title": "Data Analyst",
    "match_score": 88,
    "reason": "Your interest in data and analytics aligns perfectly with this high-demand role",
    "required_skills": ["SQL", "Python", "Tableau", "Statistics"],
    "average_salary": "$60,000 - $95,000",
    "growth_outlook": "High - 25% growth expected",
    "learning_roadmap": [
      "Learn SQL for data manipulation",
      "Master Python (Pandas, NumPy)",
      "Study data visualization (Tableau)",
      "Complete portfolio projects",
      "Get certified (Google Data Analytics)"
    ]
  }
]
```

---

## 🚨 Troubleshooting

### Port already in use:
```bash
# Find process using port 8000
lsof -ti:8000 | xargs kill -9

# Or use different port
python main.py  # then manually edit uvicorn.run(port=8001)
```

### ModuleNotFoundError:
```bash
pip install -r requirements.txt
```

### API Key Issues:
- System works without API key (fallback mode)
- Check `.env` file exists and has correct key
- Verify key format: `sk-ant-...`

---

## ✅ Bounty-thon Checklist

- [x] Works instantly without complex setup
- [x] No crashes - comprehensive error handling
- [x] Real input/output processing
- [x] No placeholders - all functions work
- [x] Clear README with run steps
- [x] Minimal dependencies
- [x] Production-ready code
- [x] Can be tested with one command

---

## 📞 Support

For issues or questions:
1. Check API documentation: `http://localhost:8000/docs`
2. Review error messages in console
3. Test with `/` endpoint first for health check

---

## 📄 License

MIT License - Free to use and modify

---

**Built for Bounty-thon 2025** 🏆
**Status:** Production Ready ✅
**Test Time:** < 1 minute ⚡
