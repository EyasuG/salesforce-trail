# Salesforce Trail

Eyasu's study companion for becoming a certified Salesforce developer: Platform Developer (PD1) by January 2027, Agentforce Specialist by February 2027, and a Salesforce developer role by April 2027.

It's one static page (`index.html`) with no build step. Tabs:

- **Today**: today's session and tasks, daily interview reps, this week's progress, your current portfolio-project level
- **Week plan**: all 27 weeks, from setup to a signed offer
- **Project**: the Laheey Wholesale Ops portfolio project, eight levels with checkable steps and its full documentation
- **Resources**: 60+ verified links, filterable
- **Cheatsheets**: governor limits, triggers, order of execution, SOQL, testing, async Apex, LWC, CLI, Agentforce, exam weights
- **Interview prep**, **Quiz**, **Job hunt**

Progress, quiz answers, story drafts and the job log are saved in your browser's local storage: they stay on the device and browser you use.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository (see the commands below).
2. In the repository: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Pages redeploys on every push to `main`. The site appears at https://eyasug.github.io/salesforce-trail/.

```bash
git init -b main
git add .
git commit -m "Salesforce Trail: initial site"
git remote add origin https://github.com/EyasuG/salesforce-trail.git
git push -u origin main
```

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Privacy

GitHub Pages sites on free accounts are public, even when you share the link with no one. This page includes interview notes and draft stories. It asks search engines not to index it (`noindex` in `index.html`), but anyone with the URL can open it. Remove the Interview prep content first if that matters to you.

## Updating

Replace `index.html` with a newer version, commit and push. Pages redeploys in about a minute.
