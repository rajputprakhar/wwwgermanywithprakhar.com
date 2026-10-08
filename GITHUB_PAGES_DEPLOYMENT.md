# Static Deployment Guide for GitHub Pages

This project is fully configured for deployment on **GitHub Pages** (or any static host such as Vercel, Netlify, Cloudflare Pages, etc.).

---

## 🚀 Option 1: Automated Deployment via GitHub Actions (Recommended)

An automated deployment workflow is configured at `.github/workflows/deploy.yml`.

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for germanywithprakhar static site"
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Click **Settings** ➔ **Pages** (in the left sidebar).
   - Under **Build and deployment** ➔ **Source**, select **GitHub Actions**.

3. **Done!** Whenever you push to the `main` branch, GitHub Actions will automatically run `npm run build:static` and publish your site to `https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPO_NAME>/`.

---

## 🛠️ Option 2: Manual Local Build & Deploy

If you want to build locally and deploy the output:

1. **Build the static site**:
   ```bash
   npm run build:static
   ```
   This generates a completely self-contained static build inside the `dist/` folder.

2. **Publish `dist` to GitHub Pages**:
   You can either push the contents of `dist/` to the `gh-pages` branch, or drag-and-drop the contents of `dist` into any static web host.

---

## ✨ Static Features Included
- **Zero Server Dependency**: Works 100% on static file servers.
- **Relative Path Routing (`base: './'`)**: Assets and links resolve correctly whether hosted at the root domain (`username.github.io`) or in a subpath repository (`username.github.io/repo-name/`).
- **`.nojekyll` included**: Prevents GitHub Pages from filtering out critical bundle assets.
- **Client-Side Persistence**: The Admin Portal, consulting lead bookings, and newsletter subscriptions persist in browser `localStorage`.
- **Pre-Rendered Fallbacks**: Built-in curated dataset for the Top 5 most popular YouTube videos, German city cost calculators, and regulatory FAQ updates work out of the box without requiring runtime API servers.
