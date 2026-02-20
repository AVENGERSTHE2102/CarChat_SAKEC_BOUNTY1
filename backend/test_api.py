"""
Quick test script to verify the AI Career Guidance API works
Run this after starting the server to confirm everything is functional
"""

import requests
import json
from time import sleep

API_URL = "http://localhost:8000"

def test_health_check():
    """Test if server is running"""
    print("🔍 Testing health check...")
    try:
        response = requests.get(f"{API_URL}/")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "online"
        print("✅ Health check passed")
        return True
    except Exception as e:
        print(f"❌ Health check failed: {e}")
        return False

def test_trending_skills():
    """Test trending skills endpoint"""
    print("\n🔍 Testing trending skills...")
    try:
        response = requests.get(f"{API_URL}/api/trending-skills?industry=technology")
        assert response.status_code == 200
        data = response.json()
        assert "trending_skills" in data
        assert len(data["trending_skills"]) > 0
        print(f"✅ Trending skills: {', '.join(data['trending_skills'][:5])}...")
        return True
    except Exception as e:
        print(f"❌ Trending skills test failed: {e}")
        return False

def test_career_recommendations():
    """Test career recommendations with real profile"""
    print("\n🔍 Testing career recommendations...")
    try:
        # Real test profile
        profile = {
            "name": "Test User",
            "current_role": "Student",
            "education": "Computer Science",
            "interests": ["programming", "AI", "data science"],
            "skills": ["Python", "JavaScript"],
            "experience_years": 0,
            "preferred_industries": ["technology"],
            "location": "Remote"
        }

        response = requests.post(
            f"{API_URL}/api/analyze-profile",
            json=profile
        )

        assert response.status_code == 200
        recommendations = response.json()
        assert len(recommendations) > 0

        print(f"✅ Got {len(recommendations)} career recommendations:")
        for i, rec in enumerate(recommendations[:3], 1):
            print(f"   {i}. {rec['title']} (Match: {rec['match_score']}%)")
            print(f"      Skills needed: {', '.join(rec['required_skills'][:3])}...")

        return True
    except Exception as e:
        print(f"❌ Career recommendations test failed: {e}")
        return False

def test_chat_endpoint():
    """Test chat interface"""
    print("\n🔍 Testing chat endpoint...")
    try:
        message = {
            "message": "I need career guidance",
            "profile": {
                "name": "Jane Doe",
                "education": "Business Administration",
                "interests": ["data", "analytics"],
                "skills": ["Excel"],
                "experience_years": 1
            }
        }

        response = requests.post(
            f"{API_URL}/api/chat",
            json=message
        )

        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "recommendations" in data
        print(f"✅ Chat response: {data['message'][:80]}...")
        return True
    except Exception as e:
        print(f"❌ Chat endpoint test failed: {e}")
        return False

def run_all_tests():
    """Run complete test suite"""
    print("=" * 60)
    print("🚀 AI CAREER GUIDANCE API - TEST SUITE")
    print("=" * 60)

    tests = [
        test_health_check,
        test_trending_skills,
        test_career_recommendations,
        test_chat_endpoint
    ]

    passed = 0
    failed = 0

    for test in tests:
        if test():
            passed += 1
        else:
            failed += 1
        sleep(0.5)  # Small delay between tests

    print("\n" + "=" * 60)
    print(f"📊 RESULTS: {passed} passed, {failed} failed")
    print("=" * 60)

    if failed == 0:
        print("🎉 ALL TESTS PASSED - API IS READY!")
        return True
    else:
        print("⚠️  SOME TESTS FAILED - CHECK SERVER LOGS")
        return False

if __name__ == "__main__":
    print("⏳ Starting tests in 2 seconds...")
    print("   (Make sure the server is running: python main.py)")
    sleep(2)

    success = run_all_tests()
    exit(0 if success else 1)
