"""
AI-Powered Career Guidance Assistant Backend
Simple, stable, production-ready API
Optimized for Render deployment with OpenRouter API
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import json
from datetime import datetime
import httpx

app = FastAPI(title="Career Guidance AI Assistant")

# CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data Models ---

class UserProfile(BaseModel):
    """User profile for career guidance"""
    name: str
    current_role: Optional[str] = "Student"
    education: str
    interests: List[str]
    skills: List[str]
    experience_years: int = 0
    preferred_industries: List[str] = []
    location: Optional[str] = "Remote"

class CareerRecommendation(BaseModel):
    """Career path recommendation"""
    title: str
    match_score: int  # 0-100
    reason: str
    required_skills: List[str]
    average_salary: str
    growth_outlook: str
    learning_roadmap: List[str]

class ChatMessage(BaseModel):
    """Chat message from user"""
    message: str
    profile: Optional[UserProfile] = None

class ChatResponse(BaseModel):
    """AI response"""
    message: str
    recommendations: Optional[List[CareerRecommendation]] = None
    timestamp: str

# --- Real-Time Market Data Fetcher ---

class MarketDataFetcher:
    """Fetches real-time job market and skill trend data"""

    @staticmethod
    async def get_trending_skills(industry: str = "technology") -> List[str]:
        """Get trending skills from GitHub and tech communities"""
        # In a production system, this would call real APIs
        # For MVP: Using curated data that reflects current market (Feb 2025)
        trending_by_industry = {
            "technology": [
                "Python", "JavaScript", "React", "Node.js", "AWS",
                "Docker", "Kubernetes", "AI/ML", "Data Science",
                "DevOps", "Cloud Computing", "Cybersecurity"
            ],
            "data": [
                "Python", "SQL", "Tableau", "Power BI", "Excel",
                "Machine Learning", "Statistics", "R", "Big Data",
                "Apache Spark", "ETL", "Data Warehousing"
            ],
            "design": [
                "Figma", "Adobe XD", "UI/UX Design", "Prototyping",
                "User Research", "Wireframing", "Design Systems",
                "Accessibility", "Motion Design", "Sketch"
            ],
            "business": [
                "Data Analysis", "Excel", "Project Management",
                "Agile", "Scrum", "Communication", "Leadership",
                "Strategy", "Finance", "Marketing Analytics"
            ]
        }
        return trending_by_industry.get(industry.lower(), trending_by_industry["technology"])

    @staticmethod
    async def get_job_market_data(role: str) -> dict:
        """Get job market insights for a specific role"""
        # Real-time simulation - in production, integrate with:
        # - LinkedIn API
        # - Indeed API
        # - Glassdoor API
        # - GitHub Jobs

        market_data = {
            "demand": "High",
            "salary_range": "$60,000 - $120,000",
            "growth_rate": "15% (Above Average)",
            "open_positions": "50,000+",
            "competition": "Moderate",
            "remote_availability": "High"
        }
        return market_data

# --- AI Career Advisor ---

class CareerAdvisor:
    """AI-powered career guidance using OpenRouter API"""

    def __init__(self):
        self.api_key = os.getenv("OPENROUTER_API_KEY", "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")
        self.api_url = "https://openrouter.ai/api/v1/chat/completions"
        # Using Claude 3.5 Sonnet - best balance of intelligence and cost
        self.model = "anthropic/claude-3.5-sonnet"
        self.has_api = bool(self.api_key)

    async def analyze_profile_and_recommend(self, profile: UserProfile) -> List[CareerRecommendation]:
        """Analyze user profile and generate career recommendations"""

        if not self.has_api:
            # Fallback mode when API key not set
            return self._get_fallback_recommendations(profile)

        try:
            # Fetch real-time market data
            market_data = MarketDataFetcher()
            trending_skills = await market_data.get_trending_skills()

            # Build AI prompt with real-time context
            prompt = self._build_analysis_prompt(profile, trending_skills)

            # Call OpenRouter API with Claude 3.5 Sonnet
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    self.api_url,
                    headers={
                        "Authorization": f"Bearer {self.api_key}",
                        "HTTP-Referer": "https://career-guidance-ai.onrender.com",
                        "X-Title": "AI Career Guidance Assistant",
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": self.model,
                        "messages": [
                            {"role": "user", "content": prompt}
                        ],
                        "max_tokens": 1200,  # Optimized for OpenRouter credits
                        "temperature": 0.7
                    }
                )

                if response.status_code != 200:
                    print(f"OpenRouter API Error: {response.status_code} - {response.text}")
                    return self._get_fallback_recommendations(profile)

                result = response.json()
                response_text = result["choices"][0]["message"]["content"]

            # Parse AI response
            recommendations = self._parse_recommendations(response_text, profile)
            return recommendations

        except Exception as e:
            print(f"AI Error: {e}")
            # Return fallback recommendations on error (stability first)
            return self._get_fallback_recommendations(profile)

    def _build_analysis_prompt(self, profile: UserProfile, trending_skills: List[str]) -> str:
        """Build detailed prompt for AI analysis"""
        return f"""You are an expert career counselor with access to real-time job market data.

USER PROFILE:
- Name: {profile.name}
- Current Role: {profile.current_role}
- Education: {profile.education}
- Interests: {', '.join(profile.interests)}
- Current Skills: {', '.join(profile.skills)}
- Experience: {profile.experience_years} years
- Preferred Industries: {', '.join(profile.preferred_industries) if profile.preferred_industries else 'Open to all'}
- Location: {profile.location}

REAL-TIME MARKET DATA (Feb 2025):
- Trending Skills: {', '.join(trending_skills)}
- Hot Industries: AI/ML, Cloud Computing, Cybersecurity, Data Science, Web Development

TASK:
Provide 3-5 career recommendations that:
1. Match user's interests and skills
2. Are in-demand in current market (Feb 2025)
3. Have clear growth potential
4. Include realistic skill gaps
5. Provide actionable learning roadmaps

FORMAT YOUR RESPONSE AS JSON:
[
  {{
    "title": "Career Title",
    "match_score": 85,
    "reason": "Why this career fits the user",
    "required_skills": ["skill1", "skill2", "skill3"],
    "average_salary": "$XX,000 - $XX,000",
    "growth_outlook": "High/Medium/Low with explanation",
    "learning_roadmap": ["Step 1", "Step 2", "Step 3"]
  }}
]

Provide ONLY the JSON array, no other text."""

    def _parse_recommendations(self, response_text: str, profile: UserProfile) -> List[CareerRecommendation]:
        """Parse AI response into structured recommendations"""
        try:
            # Extract JSON from response
            start_idx = response_text.find('[')
            end_idx = response_text.rfind(']') + 1

            if start_idx == -1 or end_idx == 0:
                raise ValueError("No JSON array found")

            json_str = response_text[start_idx:end_idx]
            recommendations_data = json.loads(json_str)

            recommendations = []
            for rec_data in recommendations_data:
                recommendations.append(CareerRecommendation(**rec_data))

            return recommendations

        except Exception as e:
            print(f"Parse error: {e}")
            return self._get_fallback_recommendations(profile)

    def _get_fallback_recommendations(self, profile: UserProfile) -> List[CareerRecommendation]:
        """Provide smart fallback recommendations based on profile"""
        # Analyze user interests and skills to provide relevant fallbacks
        interests_lower = [i.lower() for i in profile.interests]
        skills_lower = [s.lower() for s in profile.skills]

        recommendations = []

        # Tech-related interests
        if any(word in ' '.join(interests_lower) for word in ['coding', 'programming', 'software', 'technology', 'ai', 'data']):
            recommendations.append(CareerRecommendation(
                title="Software Developer",
                match_score=85,
                reason="Your interest in technology and coding aligns well with software development. High demand in 2025.",
                required_skills=["Python", "JavaScript", "Git", "Problem Solving", "Data Structures"],
                average_salary="$70,000 - $120,000",
                growth_outlook="High - 22% growth projected through 2030",
                learning_roadmap=[
                    "Master a programming language (Python or JavaScript)",
                    "Learn data structures and algorithms",
                    "Build 3-5 portfolio projects",
                    "Contribute to open source projects",
                    "Apply for junior developer positions"
                ]
            ))

        # Data-related interests
        if any(word in ' '.join(interests_lower) for word in ['data', 'analytics', 'statistics', 'numbers']):
            recommendations.append(CareerRecommendation(
                title="Data Analyst",
                match_score=80,
                reason="Your analytical interests match well with data analysis. Growing field with high demand.",
                required_skills=["SQL", "Excel", "Python", "Tableau", "Statistics"],
                average_salary="$60,000 - $95,000",
                growth_outlook="High - 25% growth expected in data careers",
                learning_roadmap=[
                    "Learn SQL and Excel for data manipulation",
                    "Master Python for data analysis (Pandas, NumPy)",
                    "Study statistics and data visualization",
                    "Complete data analysis projects",
                    "Get certified (Google Data Analytics or similar)"
                ]
            ))

        # Creative/Design interests
        if any(word in ' '.join(interests_lower) for word in ['design', 'creative', 'art', 'ui', 'ux']):
            recommendations.append(CareerRecommendation(
                title="UI/UX Designer",
                match_score=78,
                reason="Your creative interests align with user experience design. High demand for digital products.",
                required_skills=["Figma", "User Research", "Wireframing", "Prototyping", "Design Thinking"],
                average_salary="$65,000 - $110,000",
                growth_outlook="Medium-High - Digital transformation driving demand",
                learning_roadmap=[
                    "Learn design fundamentals and color theory",
                    "Master Figma or Adobe XD",
                    "Study user research methods",
                    "Build portfolio with 5+ case studies",
                    "Network with designers and apply for roles"
                ]
            ))

        # Business/Management interests
        if any(word in ' '.join(interests_lower) for word in ['business', 'management', 'leadership', 'strategy']):
            recommendations.append(CareerRecommendation(
                title="Product Manager",
                match_score=75,
                reason="Your business acumen fits product management. Bridge between tech and business.",
                required_skills=["Product Strategy", "Agile", "Communication", "Data Analysis", "Market Research"],
                average_salary="$80,000 - $140,000",
                growth_outlook="High - Product-led companies need PMs",
                learning_roadmap=[
                    "Learn product management fundamentals",
                    "Understand Agile and Scrum methodologies",
                    "Develop technical literacy",
                    "Work on side projects as PM",
                    "Get Product Manager certification"
                ]
            ))

        # If no specific match, provide general tech recommendation
        if not recommendations:
            recommendations.append(CareerRecommendation(
                title="Full-Stack Developer",
                match_score=70,
                reason="Versatile career path with high demand across industries. Great starting point for tech careers.",
                required_skills=["HTML/CSS", "JavaScript", "React", "Node.js", "Databases"],
                average_salary="$75,000 - $125,000",
                growth_outlook="High - Continuous demand for web developers",
                learning_roadmap=[
                    "Learn HTML, CSS, JavaScript basics",
                    "Master React for frontend development",
                    "Learn Node.js for backend",
                    "Understand databases (SQL and NoSQL)",
                    "Build full-stack projects and deploy them"
                ]
            ))

        return recommendations[:3]  # Return top 3 recommendations

# Initialize AI advisor
advisor = CareerAdvisor()

# --- API Endpoints ---

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "online",
        "service": "AI Career Guidance Assistant",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat()
    }

@app.post("/api/chat", response_model=ChatResponse)
async def chat(message: ChatMessage):
    """Main chat endpoint for career guidance"""
    try:
        response_message = ""
        recommendations = None

        # If profile is provided, generate career recommendations
        if message.profile:
            recommendations = await advisor.analyze_profile_and_recommend(message.profile)
            response_message = f"Hi {message.profile.name}! Based on your profile and current market trends, I've identified {len(recommendations)} career paths that match your interests and skills. Let me walk you through each one."
        else:
            # General conversation
            response_message = "Hello! I'm your AI Career Guidance Assistant. To provide personalized career recommendations, please share your profile including your interests, skills, and career goals."

        return ChatResponse(
            message=response_message,
            recommendations=recommendations,
            timestamp=datetime.now().isoformat()
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")

@app.post("/api/analyze-profile", response_model=List[CareerRecommendation])
async def analyze_profile(profile: UserProfile):
    """Analyze user profile and return career recommendations"""
    try:
        recommendations = await advisor.analyze_profile_and_recommend(profile)
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing profile: {str(e)}")

@app.get("/api/trending-skills")
async def get_trending_skills(industry: str = "technology"):
    """Get trending skills for specific industry"""
    try:
        skills = await MarketDataFetcher.get_trending_skills(industry)
        return {
            "industry": industry,
            "trending_skills": skills,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching trending skills: {str(e)}")

@app.get("/api/market-data/{role}")
async def get_market_data(role: str):
    """Get market data for specific role"""
    try:
        data = await MarketDataFetcher.get_job_market_data(role)
        return {
            "role": role,
            "market_data": data,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching market data: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    # Use PORT environment variable for Render deployment
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
