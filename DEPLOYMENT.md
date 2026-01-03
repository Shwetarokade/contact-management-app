# Deployment Guide

This guide will help you deploy the Contact Management Application to production.

## Architecture

- **Backend**: Node.js/Express API deployed on Render
- **Frontend**: React application deployed on Vercel
- **Database**: MongoDB Atlas (already configured)

## Prerequisites

1. GitHub account
2. Render account (free tier available at https://render.com)
3. Vercel account (free tier available at https://vercel.com)
4. MongoDB Atlas account (already set up)

## Step 1: Prepare Your Repository

1. Make sure all code is committed to Git:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

## Step 2: Deploy Backend to Render

1. **Sign up/Login to Render**: Go to https://render.com and sign up/login

2. **Create a New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository containing this project

3. **Configure the Service**:
   - **Name**: `contact-management-backend` (or your preferred name)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. **Set Environment Variables**:
   - Click on "Environment" tab
   - Add the following variables:
     - `MONGO_URI`: Your MongoDB Atlas connection string
     - `NODE_ENV`: `production`
     - `PORT`: Render will set this automatically (usually 10000)

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy the service URL (e.g., `https://contact-management-backend.onrender.com`)

## Step 3: Deploy Frontend to Vercel

1. **Sign up/Login to Vercel**: Go to https://vercel.com and sign up/login

2. **Import Your Project**:
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure the Project**:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

4. **Set Environment Variables**:
   - Go to "Environment Variables" section
   - Add the following variable:
     - `REACT_APP_API_URL`: Your Render backend URL (e.g., `https://contact-management-backend.onrender.com`)
     - **Important**: Do NOT include trailing slash

5. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be live at a URL like `https://your-project.vercel.app`

## Step 4: Update MongoDB Atlas (if needed)

1. Go to MongoDB Atlas dashboard
2. Navigate to "Network Access"
3. Add Render's IP addresses or allow access from anywhere (0.0.0.0/0) for testing
4. Make sure your database user has proper permissions

## Step 5: Test Your Deployment

1. Visit your Vercel frontend URL
2. Try adding a contact
3. Verify that contacts are saved and displayed
4. Test the search and delete functionality

## Environment Variables Summary

### Backend (.env on Render)
```
MONGO_URI=your_mongodb_connection_string
NODE_ENV=production
PORT=10000 (set automatically by Render)
```

### Frontend (Environment Variables on Vercel)
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

## Troubleshooting

### Backend Issues

1. **Build Fails**: Check build logs on Render dashboard
2. **Database Connection Issues**: Verify MONGO_URI is correct and MongoDB Atlas allows connections
3. **Port Issues**: Render sets PORT automatically, make sure your code uses `process.env.PORT`

### Frontend Issues

1. **API Calls Fail**: 
   - Verify REACT_APP_API_URL is set correctly
   - Check CORS settings on backend
   - Check browser console for errors

2. **Build Fails**: 
   - Check build logs on Vercel
   - Ensure all dependencies are in package.json
   - Verify Node version compatibility

## Alternative Deployment Options

### Backend Alternatives
- **Railway**: https://railway.app
- **Heroku**: https://heroku.com (requires credit card for free tier)
- **Fly.io**: https://fly.io

### Frontend Alternatives
- **Netlify**: https://netlify.com
- **GitHub Pages**: Requires build step
- **Render**: Can also host static sites

## Notes

- Render free tier services spin down after 15 minutes of inactivity and take ~30 seconds to wake up
- Vercel has excellent performance and global CDN
- Both platforms offer free SSL certificates
- Consider upgrading to paid tiers for production use

## Support

For issues, check:
- Render documentation: https://render.com/docs
- Vercel documentation: https://vercel.com/docs
- React documentation: https://react.dev

