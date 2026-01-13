# Deployment Guide - TicTac Multiplayer

This guide will help you deploy your multiplayer Tic-Tac-Toe game to production.

## Architecture

- **Frontend**: Deploy to Vercel (or Netlify)
- **Backend**: Deploy to Railway, Render, or any platform that supports WebSockets

## Step 1: Deploy Backend

### Option A: Railway (Recommended)

1. **Create a Railway account** at [railway.app](https://railway.app)

2. **Create a new project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub repository
   - Select the `backEnd` folder as the root directory

3. **Configure Environment Variables**
   - Go to your project settings
   - Add the following variables:
     ```
     PORT=3000
     ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
     ```
   - Replace `your-vercel-app.vercel.app` with your actual Vercel URL

4. **Deploy**
   - Railway will automatically deploy your backend
   - Copy your backend URL (e.g., `https://your-app.railway.app`)

### Option B: Render

1. **Create a Render account** at [render.com](https://render.com)

2. **Create a new Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Root Directory**: `backEnd`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`

3. **Add Environment Variables**
   ```
   PORT=3000
   ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
   ```

4. **Deploy**
   - Render will build and deploy your service
   - Copy your backend URL

## Step 2: Deploy Frontend to Vercel

1. **Create Environment Variable**
   
   In your `frontEnd` directory, create a `.env` file:
   ```env
   VITE_BACKEND_URL=https://your-backend-url.railway.app
   ```
   Replace with your actual backend URL from Step 1.

2. **Deploy to Vercel**
   
   **Option A: Using Vercel CLI**
   ```bash
   cd frontEnd
   npm install -g vercel
   vercel
   ```

   **Option B: Using Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure:
     - **Root Directory**: `frontEnd`
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

3. **Add Environment Variable in Vercel**
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add:
     - **Name**: `VITE_BACKEND_URL`
     - **Value**: `https://your-backend-url.railway.app`
   - Click "Save"

4. **Redeploy**
   - Trigger a new deployment to apply the environment variable

## Step 3: Update Backend CORS

After deploying the frontend, update your backend's `ALLOWED_ORIGINS` environment variable:

**On Railway/Render:**
```
ALLOWED_ORIGINS=https://your-vercel-app.vercel.app,https://your-vercel-app-preview.vercel.app
```

Include both your production and preview URLs.

## Step 4: Test Your Deployment

1. Open your Vercel URL in two different browser windows
2. Enter the same room ID in both windows
3. Play a game to ensure real-time synchronization works

## Troubleshooting

### "Session ID unknown" Error

This error occurs when:
- ✅ **Fixed**: Backend is deployed to a platform that supports WebSockets (Railway, Render)
- ❌ **Wrong**: Backend is deployed to Vercel (doesn't support WebSockets)

### CORS Errors

If you see CORS errors:
1. Verify `ALLOWED_ORIGINS` in backend includes your frontend URL
2. Make sure there are no trailing slashes in URLs
3. Check that both HTTP and HTTPS protocols match

### Connection Timeout

If the frontend can't connect to the backend:
1. Verify `VITE_BACKEND_URL` is set correctly in Vercel
2. Check that your backend is running (visit the URL in a browser)
3. Ensure your backend platform allows WebSocket connections

### Environment Variables Not Working

- In Vercel, environment variables require a redeploy to take effect
- Make sure variable names start with `VITE_` for Vite apps
- Check that `.env` files are not committed to Git (they should be in `.gitignore`)

## Local Development

For local development, use these environment variables:

**Backend** (`.env`):
```env
PORT=3000
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174
```

**Frontend** (`.env`):
```env
VITE_BACKEND_URL=http://localhost:3000
```

## Security Notes

1. **Never commit `.env` files** - They should be in `.gitignore`
2. **Use HTTPS in production** - Most platforms provide this automatically
3. **Restrict CORS origins** - Only allow your frontend domains
4. **Monitor your backend** - Set up logging and error tracking

## Cost

- **Vercel**: Free tier available (generous limits)
- **Railway**: $5/month credit (free tier available)
- **Render**: Free tier available (may sleep after inactivity)

## Next Steps

After successful deployment:
1. Share your app URL with friends
2. Monitor backend logs for errors
3. Consider adding analytics
4. Add more features (chat, leaderboard, etc.)

---

**Need Help?** Check the logs in your deployment platform's dashboard for detailed error messages.
