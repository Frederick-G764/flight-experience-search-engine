# Deployment Guide - Vercel

This guide will help you deploy the Premium Flight Experience Search prototype to Vercel.

## Prerequisites

- GitHub account
- Vercel account (free tier is fine)
- Code pushed to a GitHub repository

## Step-by-Step Deployment

### Method 1: Vercel Dashboard (Easiest)

1. **Push to GitHub**
   ```bash
   git push origin claude/flight-experience-prototype-011CUU1yneW5fuGfAQmrdWik
   ```

2. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account (or create a free account)

3. **Import Project**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Find and select your `flight-experience-search-engine` repository
   - Click "Import"

4. **Configure Project**
   Vercel will auto-detect Next.js. The default settings should work:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
   - Node Version: 18.x or higher

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for the build to complete
   - Your site will be live at: `https://[project-name]-[random-id].vercel.app`

6. **Custom Domain (Optional)**
   - In the Vercel dashboard, go to Project Settings → Domains
   - Add a custom domain like `flight-experience-prototype.vercel.app`
   - Follow Vercel's instructions to configure DNS

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```
   Follow the prompts to authenticate.

3. **Deploy to Preview**
   ```bash
   vercel
   ```
   This creates a preview deployment. Answer the prompts:
   - Set up and deploy? Y
   - Which scope? (select your account)
   - Link to existing project? N
   - What's your project's name? flight-experience-search-engine
   - In which directory is your code located? ./
   - Want to override settings? N

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

5. **View Your Site**
   The CLI will output your deployment URL.

## Post-Deployment

### Verify Functionality

After deployment, test:
- ✅ Home page loads with search form
- ✅ Search redirects to results page
- ✅ All 6 flights display correctly
- ✅ Hover tooltips work on feature indicators
- ✅ "View Details" links to flight detail pages
- ✅ All 6 detail pages load with tabbed content
- ✅ Mobile responsive design works

### Performance

The deployed site should:
- Load in < 3 seconds
- Have a Lighthouse score > 90
- Work on all modern browsers
- Be responsive on mobile, tablet, desktop

### Troubleshooting

**Build fails with font errors:**
- The project has been configured to use system fonts
- No Google Fonts are required

**404 errors on flight detail pages:**
- Ensure `generateStaticParams` is working in `/app/flight/[id]/page.tsx`
- Check that all 6 flight IDs are being generated

**Styling issues:**
- Verify Tailwind CSS is properly configured
- Check that `globals.css` is imported in `layout.tsx`

**Deployment is slow:**
- First deployment may take 3-5 minutes
- Subsequent deployments are faster (1-2 minutes)

## Environment Variables

This prototype does not require any environment variables.

For future production versions, you might need:
- `AMADEUS_API_KEY` - For real flight data
- `NEXT_PUBLIC_ANALYTICS_ID` - For analytics
- `DATABASE_URL` - For persistent storage

## Continuous Deployment

Vercel automatically sets up continuous deployment:
- Push to your branch → Vercel creates a preview deployment
- Merge to main → Vercel deploys to production

To disable auto-deploy:
1. Go to Project Settings → Git
2. Adjust deployment branches

## Monitoring

### View Deployments
- Vercel Dashboard → Your Project → Deployments
- See all preview and production deployments
- View logs and build output

### Analytics
- Vercel provides free analytics
- Go to Project → Analytics
- View page views, performance metrics

### Logs
```bash
# View logs using CLI
vercel logs [deployment-url]
```

## Custom Domain Setup

1. **Buy a domain** (optional)
   - Namecheap, Google Domains, etc.

2. **Add to Vercel**
   - Project Settings → Domains
   - Add `flight-experience-prototype.vercel.app` or your custom domain

3. **Configure DNS**
   - Add CNAME record pointing to Vercel
   - Vercel provides exact DNS settings

4. **SSL Certificate**
   - Vercel automatically provisions SSL
   - HTTPS enabled by default

## Costs

- **Free Tier**: 100GB bandwidth, unlimited deployments
- This prototype will stay well within free tier limits
- No credit card required for deployment

## Next Steps After Deployment

1. **Test thoroughly** on the live site
2. **Share the URL** with stakeholders
3. **Gather feedback** on the UX/UI
4. **Iterate** based on feedback
5. **Plan for** real data integration

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Community: https://github.com/vercel/next.js/discussions

## Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Build completed successfully
- [ ] Production URL is live
- [ ] All pages tested and working
- [ ] Mobile responsive verified
- [ ] Tooltips working correctly
- [ ] Navigation between pages works
- [ ] Custom domain configured (optional)

---

**Expected Deployment URL Format:**
`https://flight-experience-search-engine-[hash].vercel.app`

**Typical Build Time:**
2-3 minutes

**Expected Bundle Size:**
~500KB gzipped
