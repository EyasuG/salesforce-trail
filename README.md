# Salesforce Trail

Eyasu's study companion for becoming a certified Salesforce developer: Platform Developer (PD1) by January 2027, Agentforce Specialist by February 2027, and a Salesforce developer role by April 2027.

It's one static page (`index.html`) with no build step. Tabs:

- **Today**: today's session and tasks, daily interview reps, this week's progress, your current portfolio-project level
- **Week plan**: all 27 weeks, from setup to a signed offer
- **Project**: the Laheey Wholesale Ops portfolio project, eight levels with checkable steps and its full documentation
- **Resources**: 60+ verified links, filterable
- **Cheatsheets**: governor limits, triggers, order of execution, SOQL, testing, async Apex, LWC, CLI, Agentforce, exam weights
- **Interview prep**, **Quiz**, **Job hunt**

Progress, quiz answers, story drafts and the job log are saved in your browser's local storage. To carry them across devices, turn on sync (below).

## Sync across devices

A Cloudflare Worker (`sync-worker/`) stores one copy of your progress in Cloudflare KV at `https://salesforce-trail-sync.eyasug.workers.dev/progress`. It only answers requests that carry your sync key, and only from this site's origin.

- **Turn it on:** click **Sync off** in the header and paste your sync key. Do this once per browser. The key is in `.sync-key` in this folder; it's git-ignored, so it never reaches GitHub.
- **How it works:** changes upload about a second after you make them. When the page opens or you switch back to the tab, it downloads newer progress from your other devices. If two devices change things at the same moment, the last save wins.
- **First connect on a browser that already has progress:** you're asked whether to keep the synced copy or this browser's.
- **Turn it off:** click the sync button and clear the box.

Redeploy the Worker after editing it:

```bash
cd sync-worker && npx wrangler deploy
```

Change the key with `npx wrangler secret put SYNC_KEY` (inside `sync-worker/`), save it to `.sync-key`, and paste it into each browser again.

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
