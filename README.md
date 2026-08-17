# Venkata Hanumanth Vendra — Portfolio

Personal website for **Venkata Hanumanth Vendra — Principal DevOps & Cloud Solutions Architect**.
Static site (HTML + CSS + vanilla JS), no build step, no backend — hosted **free on GitHub Pages**.

**Live:** https://hanumanthvendra.github.io

---

## What's in here

```
index.html                     # the whole page (all sections)
assets/
  css/style.css                # styles — dark/light, responsive
  js/main.js                   # theme, nav, scroll-spy, reveal, video
  images/
    favicon.svg                # site icon
    og-image.png               # social-preview image (LinkedIn/Twitter)
  Venkata_Hanumanth_Vendra_Resume.pdf   # your resume (download button)
robots.txt                     # SEO
sitemap.xml                    # SEO
README.md                      # this file
.gitignore
```

No frameworks, no Node, no database, no API keys. Everything runs as static files.

---

## Preview it on your computer (optional)

Just open `index.html` in a browser — double-click it. That's it.
(For a “proper” local server you can run `python3 -m http.server` in this folder and open `http://localhost:8000`, but it isn’t required.)

---

## Deploy to GitHub Pages (step by step)

Your GitHub username is **`hanumanthvendra`**, so this will publish to
**https://hanumanthvendra.github.io** — no `/repo-name` in the URL.

### 1. Create the repository
1. Go to https://github.com/new
2. **Repository name** must be **exactly**: `hanumanthvendra.github.io`
   *(the name must match your username — that’s what makes it a “user site” at the root URL.)*
3. Set it to **Public**.
4. Do **not** add a README, .gitignore, or license (this folder already has them).
5. Click **Create repository**.

### 2. Upload the files

**Option A — drag & drop (easiest, no commands):**
1. On the empty repo page, click **“uploading an existing file”**.
2. Open this folder on your computer, select **everything inside it**
   (`index.html`, the `assets` folder, `robots.txt`, etc.) and drag it into the browser.
3. Scroll down, click **Commit changes**.

**Option B — Git (command line):**
```bash
cd path/to/hanumanthvendra.github.io
git init
git add .
git commit -m "Launch portfolio site"
git branch -M main
git remote add origin https://github.com/hanumanthvendra/hanumanthvendra.github.io.git
git push -u origin main
```

### 3. Enable GitHub Pages
1. In the repo, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: **`main`**, folder: **`/ (root)`**. Click **Save**.

### 4. Verify it’s live
- Wait ~1–2 minutes. Refresh **Settings → Pages** — you’ll see
  *“Your site is live at https://hanumanthvendra.github.io”*.
- Open that URL. Test dark/light toggle, the nav, and the **Download Resume** button.
- Tip: paste the URL into https://www.linkedin.com/post-inspector/ to preview the social card.

---

## Updating the site later

**On GitHub (no tools):** open the file in the repo → pencil icon (Edit) → make changes → **Commit changes**. Live in ~1 minute.

**With Git:**
```bash
# edit files locally, then:
git add .
git commit -m "Update content"
git push
```

### Update your resume PDF (without touching anything else)
1. In the repo, go into the **`assets`** folder.
2. Click **`Venkata_Hanumanth_Vendra_Resume.pdf`** → **⋯ → Delete** (or just upload to overwrite).
3. Click **Add file → Upload files**, drag in your new PDF, and **rename it to exactly**
   `Venkata_Hanumanth_Vendra_Resume.pdf` so the Download button keeps working.
4. Commit. Done — the site itself doesn’t need rebuilding.

### Add your intro video
Open `index.html`, find the block with `id="video-embed"`, and set **one** attribute:
- **YouTube:** `data-yt="YOUR_VIDEO_ID"` (the ID is the part after `watch?v=`).
- **MP4 file:** put the file at `assets/videos/intro.mp4`, then use `data-mp4="assets/videos/intro.mp4"` (and remove `data-yt`).

The video never autoplays and no third-party code loads until a visitor clicks Play.

---

## Custom domain (optional, if you buy one later)
1. Buy a domain (e.g. `venkatavendra.com`) from any registrar.
2. In the repo: **Settings → Pages → Custom domain**, type your domain, **Save**.
   (This creates a `CNAME` file in the repo — leave it there.)
3. At your registrar’s DNS settings, add records:
   - Four **A** records for the apex (`@`) → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One **CNAME** for `www` → `hanumanthvendra.github.io`
4. Wait for DNS to propagate (minutes to a few hours).
5. Update the URLs in `index.html` (`og:url`, `canonical`), `robots.txt`, and `sitemap.xml` to your new domain.

## HTTPS
GitHub Pages issues a free SSL certificate automatically.
In **Settings → Pages**, tick **Enforce HTTPS** once it becomes available (usually within an hour of going live or adding a custom domain). No cost, no config.

---

## Editing tips
- **Text/content:** it’s all in `index.html`, grouped by section with clear comments.
- **Colours/spacing:** the top of `assets/css/style.css` has CSS variables (`--accent`, `--bg`, etc.).
- **Metrics/experience/projects:** plain HTML lists — copy an existing block and edit.

Everything is intentionally simple so you can maintain it yourself.
