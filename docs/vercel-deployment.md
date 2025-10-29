# Vercel Deployment Guide: Frontend App

## 🚀 Quick Start Deployment

### Step 1: Prepare Frontend for Production
1. **Update API URL in Code**
   - Open `frontend/src/app/page.tsx`
   - Change the fetch URL from localhost to environment variable:
   ```typescript
   // Replace this line:
   const res = await fetch('http://localhost:3000/create-token', {

   // With this:
   const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/create-token', {
   ```

2. **Test Locally First**
   ```bash
   cd frontend
   npm run build
   npm run start
   ```
   - Verify the app builds and runs without errors

### Step 2: Deploy to Vercel
1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com) and sign up
   - Connect your GitHub account

2. **Deploy via Dashboard**
   - Click "New Project" → "Import Git Repository"
   - Select your `HederaCommunEA` repository
   - Configure settings:
     ```
     Framework Preset: Next.js
     Root Directory: frontend
     Build Command: npm run build
     Output Directory: .next (automatic)
     Install Command: npm install
     ```

3. **Set Environment Variables**
   In Vercel dashboard → Your Project → Settings → Environment Variables:
   ```
   NEXT_PUBLIC_API_URL = https://your-app.onrender.com  # Update after Render deployment
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for deployment
   - Note your app URL: `https://your-app.vercel.app`

### Step 3: Update Backend CORS
After Vercel deployment:
1. Go to your Render service dashboard
2. Update `FRONTEND_URL` environment variable:
   ```
   FRONTEND_URL = https://your-app.vercel.app
   ```
3. Restart the Render service

### Step 4: Test Full Integration
```bash
# Test the complete flow
curl -X POST https://your-app.onrender.com/create-token \
  -H "Content-Type: application/json" \
  -H "Origin: https://your-app.vercel.app" \
  -d '{"name":"TestCoin","symbol":"TEST","initialSupply":1000000}'
```

## 🔧 Troubleshooting

### Common Issues

**Build fails**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `frontend/package.json`
- Verify Next.js version compatibility

**API calls fail**
- Check that `NEXT_PUBLIC_API_URL` is set correctly
- Verify Render backend is deployed and running
- Check CORS configuration on backend

**Environment variables not working**
- Environment variables must be prefixed with `NEXT_PUBLIC_` to be accessible in browser
- Redeploy after adding new environment variables

**404 errors on refresh**
- This is normal for Next.js apps - Vercel handles routing automatically

### Logs and Monitoring
- View deployment logs in Vercel dashboard
- Monitor function execution times
- Set up error tracking with Sentry (optional)

## 📋 Pre-Deployment Checklist

- [ ] Frontend code updated to use environment variables
- [ ] Local build tested successfully
- [ ] Vercel account created
- [ ] GitHub repository connected
- [ ] Environment variables configured
- [ ] Backend deployed to Render (for API URL)

## 🔒 Security Notes

- Never commit sensitive data to Git
- Use environment variables for all external URLs
- Enable Vercel's security headers automatically
- Regularly update dependencies

## 📞 Support

- [Vercel Documentation](https://vercel.com/docs) for deployment issues
- [Next.js Documentation](https://nextjs.org/docs) for framework issues
- Check Vercel status page for outages

## 🚀 Advanced Features

### Custom Domain
1. Go to Vercel dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Configure DNS as instructed

### Preview Deployments
- Every push to non-main branches creates a preview deployment
- Useful for testing features before merging

### Analytics
- Enable Vercel Analytics in dashboard
- Monitor real user performance metrics