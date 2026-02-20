# 🚀 Render Deployment Guide

## Quick Deploy to Render (5 Minutes)

### Option 1: Deploy with render.yaml (Recommended)

1. **Push to GitHub**
   ```bash
   cd AI_CarChat/backend
   git init
   git add .
   git commit -m "Initial commit - AI Career Guidance Backend"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Render**
   - Go to https://render.com
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Select the `AI_CarChat/backend` directory
   - Render will automatically detect `render.yaml`
   - Click "Apply"

3. **Done!** 🎉
   - Your API will be live at: `https://career-guidance-ai-backend.onrender.com`
   - Health check: `https://career-guidance-ai-backend.onrender.com/`
   - API docs: `https://career-guidance-ai-backend.onrender.com/docs`

---

### Option 2: Manual Deployment

1. **Go to Render Dashboard**
   - https://dashboard.render.com

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Select your repo

3. **Configure Service**
   ```
   Name: career-guidance-ai-backend
   Region: Oregon (or closest to you)
   Branch: main
   Root Directory: AI_CarChat/backend
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

4. **Add Environment Variable**
   - Click "Environment" tab
   - Add:
     ```
     Key: OPENROUTER_API_KEY
     Value: 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
     ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait 2-3 minutes for deployment

---

## Free Tier Benefits

✅ **Completely Free** (no credit card required)
✅ **Auto HTTPS** - SSL certificate included
✅ **Auto Scaling** - Handles traffic spikes
✅ **Health Checks** - Automatic monitoring
✅ **Logs** - Real-time deployment logs
✅ **Auto Deploy** - Push to GitHub = auto deploy

**Limitations:**
- ⏰ Spins down after 15 minutes of inactivity
- ⚡ First request after spin-down takes ~30 seconds
- 💾 512 MB RAM

---

## Testing Deployed API

Once deployed, test your API:

```bash
# Health check
curl https://YOUR-SERVICE.onrender.com/

# Get trending skills
curl https://YOUR-SERVICE.onrender.com/api/trending-skills

# Get career recommendations
curl -X POST https://YOUR-SERVICE.onrender.com/api/analyze-profile \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "education": "Computer Science",
    "interests": ["coding", "AI"],
    "skills": ["Python"],
    "experience_years": 0
  }'
```

---

## Quick Reference

**Your Service URL:**
```
https://career-guidance-ai-backend.onrender.com
```

**API Documentation:**
```
https://career-guidance-ai-backend.onrender.com/docs
```

**Health Check:**
```
https://career-guidance-ai-backend.onrender.com/
```

---

**Status:** ✅ Ready to Deploy
**Time to Deploy:** ⚡ < 5 minutes
**Cost:** 💰 $0 (Free tier)
