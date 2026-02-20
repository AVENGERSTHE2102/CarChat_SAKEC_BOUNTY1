# 🧪 Testing Guide - AI Career Guidance Backend

## Quick Test (30 seconds)

### 1. Start the Server

```bash
cd backend
python3 main.py
```

Expected output:
```
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### 2. Run Tests

In a new terminal:
```bash
cd backend
python3 test_api.py
```

Expected result:
```
🎉 ALL TESTS PASSED - API IS READY!
```

---

## Manual API Testing

### Test 1: Health Check
```bash
curl http://localhost:8000
```

**Expected Response:**
```json
{
  "status": "online",
  "service": "AI Career Guidance Assistant",
  "version": "1.0.0",
  "timestamp": "2026-02-20T12:00:00"
}
```

---

### Test 2: Get Trending Skills
```bash
curl "http://localhost:8000/api/trending-skills?industry=technology"
```

**Expected Response:**
```json
{
  "industry": "technology",
  "trending_skills": [
    "Python", "JavaScript", "React", "Node.js", "AWS",
    "Docker", "Kubernetes", "AI/ML", "Data Science", ...
  ],
  "timestamp": "2026-02-20T12:00:00"
}
```

**Try Different Industries:**
- `?industry=data` - Data science skills
- `?industry=design` - Design and UX skills
- `?industry=business` - Business and management skills

---

### Test 3: Career Recommendations (Simple)
```bash
curl -X POST http://localhost:8000/api/analyze-profile \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alex",
    "education": "Computer Science",
    "interests": ["coding", "AI"],
    "skills": ["Python"],
    "experience_years": 0
  }'
```

**Expected Response:**
```json
[
  {
    "title": "Software Developer",
    "match_score": 85,
    "reason": "Your interest in coding and AI aligns well...",
    "required_skills": ["Python", "JavaScript", "Git", ...],
    "average_salary": "$70,000 - $120,000",
    "growth_outlook": "High - 22% growth through 2030",
    "learning_roadmap": [
      "Master Python programming",
      "Learn data structures and algorithms",
      "Build 3-5 portfolio projects",
      ...
    ]
  },
  ...
]
```

---

### Test 4: Career Recommendations (Data Analyst)
```bash
curl -X POST http://localhost:8000/api/analyze-profile \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sarah",
    "education": "Business Administration",
    "interests": ["data", "analytics", "visualization"],
    "skills": ["Excel"],
    "experience_years": 1
  }'
```

**Expected:** Data Analyst and Business Intelligence recommendations

---

### Test 5: Chat Interface
```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Help me find a career",
    "profile": {
      "name": "Jordan",
      "education": "Marketing",
      "interests": ["creative", "design", "digital"],
      "skills": ["Photoshop", "Social Media"],
      "experience_years": 0
    }
  }'
```

**Expected Response:**
```json
{
  "message": "Hi Jordan! Based on your profile and current market trends...",
  "recommendations": [...],
  "timestamp": "2026-02-20T12:00:00"
}
```

---

### Test 6: Market Data
```bash
curl http://localhost:8000/api/market-data/software-developer
```

**Expected Response:**
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
  "timestamp": "2026-02-20T12:00:00"
}
```

---

## Python Test Script

Save as `quick_test.py`:

```python
import requests
import json

API_URL = "http://localhost:8000"

# Test profile
profile = {
    "name": "Test User",
    "education": "Computer Science",
    "interests": ["programming", "AI", "data"],
    "skills": ["Python", "SQL"],
    "experience_years": 0
}

# Get recommendations
response = requests.post(
    f"{API_URL}/api/analyze-profile",
    json=profile
)

if response.status_code == 200:
    recommendations = response.json()
    print(f"✅ Success! Got {len(recommendations)} recommendations:\n")
    for i, rec in enumerate(recommendations, 1):
        print(f"{i}. {rec['title']} (Match: {rec['match_score']}%)")
        print(f"   Salary: {rec['average_salary']}")
        print(f"   Skills: {', '.join(rec['required_skills'][:5])}\n")
else:
    print(f"❌ Error: {response.status_code}")
```

Run with:
```bash
python3 quick_test.py
```

---

## Interactive API Documentation

FastAPI provides interactive API documentation:

**Swagger UI:** http://localhost:8000/docs
- Try all endpoints interactively
- See request/response schemas
- Test with different inputs

**ReDoc:** http://localhost:8000/redoc
- Alternative documentation view
- Better for reading

---

## Testing Different Scenarios

### Scenario 1: Fresh Graduate (Tech)
```json
{
  "name": "Recent Grad",
  "education": "Computer Science degree",
  "interests": ["coding", "web development"],
  "skills": ["HTML", "CSS", "JavaScript"],
  "experience_years": 0
}
```
**Expected:** Full-Stack Developer, Frontend Developer

---

### Scenario 2: Career Switcher (To Data)
```json
{
  "name": "Career Switcher",
  "education": "Mathematics degree",
  "interests": ["data", "statistics", "machine learning"],
  "skills": ["Excel", "R"],
  "experience_years": 3
}
```
**Expected:** Data Analyst, Data Scientist

---

### Scenario 3: Creative Professional
```json
{
  "name": "Designer",
  "education": "Graphic Design",
  "interests": ["design", "user experience", "creative"],
  "skills": ["Photoshop", "Illustrator"],
  "experience_years": 1
}
```
**Expected:** UI/UX Designer, Product Designer

---

## Error Testing

### Test Invalid Input
```bash
curl -X POST http://localhost:8000/api/analyze-profile \
  -H "Content-Type: application/json" \
  -d '{
    "invalid": "data"
  }'
```

**Expected:** 422 Validation Error with clear message

---

### Test Empty Profile
```bash
curl -X POST http://localhost:8000/api/analyze-profile \
  -H "Content-Type: application/json" \
  -d '{
    "name": "",
    "education": "",
    "interests": [],
    "skills": [],
    "experience_years": 0
  }'
```

**Expected:** Still returns recommendations (fallback logic)

---

## Performance Testing

### Response Time Test
```bash
time curl -s http://localhost:8000/api/trending-skills > /dev/null
```

**Expected:** < 1 second

---

### Concurrent Requests
```bash
for i in {1..10}; do
  curl -s http://localhost:8000 &
done
wait
```

**Expected:** All requests succeed

---

## Automated Test Suite

Run the comprehensive test suite:

```bash
python3 test_api.py
```

This tests:
1. ✅ Server health check
2. ✅ Trending skills endpoint
3. ✅ Career recommendations
4. ✅ Chat interface
5. ✅ Error handling
6. ✅ Response times

**Expected Result:**
```
🎉 ALL TESTS PASSED - API IS READY!
```

---

## Troubleshooting Tests

### Server not responding
```bash
# Check if server is running
curl http://localhost:8000

# If not, start it
python3 main.py
```

### Port in use
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Restart server
python3 main.py
```

### Dependencies missing
```bash
pip3 install -r requirements.txt
```

---

## CI/CD Testing

For automated testing in CI/CD:

```bash
#!/bin/bash
# test_ci.sh

# Install dependencies
pip install -r requirements.txt

# Start server in background
python3 main.py &
SERVER_PID=$!

# Wait for server to start
sleep 3

# Run tests
python3 test_api.py
TEST_RESULT=$?

# Cleanup
kill $SERVER_PID

# Exit with test result
exit $TEST_RESULT
```

---

## API Compliance Checklist

- [x] All endpoints return valid JSON
- [x] Proper HTTP status codes (200, 400, 422, 500)
- [x] Input validation with clear error messages
- [x] CORS headers for frontend access
- [x] Response times < 5 seconds
- [x] No crashes on invalid input
- [x] Graceful error handling
- [x] Consistent response format

---

## Production Readiness Checklist

- [x] All tests passing
- [x] Error handling implemented
- [x] Input validation working
- [x] CORS configured
- [x] Documentation complete
- [x] No hardcoded values
- [x] Environment variables supported
- [x] Fallback mode working
- [x] Logging implemented
- [x] Health check endpoint

---

**Status: ✅ ALL TESTS PASSING - READY FOR PRODUCTION**
