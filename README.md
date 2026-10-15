# RECLAIM

Buildless, responsive one-page event website. Open index.html directly, or serve this folder with any static host. No npm install or build step required.

## Files
- index.html — all page content, FAQ answers, team initials, and sharing metadata
- styles.css — palette variables, layout, responsive rules, motion, and focus styles
- script.js — CONFIG links, mobile menu, artwork fallbacks, countdown, and scroll reveals
- assets/favicon.svg — pink heart favicon

## Add the original artwork
The supplied attachment paths were unavailable to the build environment. Add your originals as:
- assets/reclaim-logo.png — official wordmark; automatically replaces the Shrikhand text fallback
- assets/reclaim-poster.png — square event poster; automatically replaces the clearly labeled poster placeholder and enables social preview artwork

No image-generation or logo recreation was used. The visible text fallback is intentional.

## Replace links
Edit the CONFIG object at the very top of script.js. Replace the link values with your real URLs: rsvp, speaker, sponsor; the five linkedin profiles; and the three socials. While unset, clicks show a friendly coming-soon notice. The RSVP link opens Partiful. The sponsor and speaker links open their respective supplied Google Forms. Sponsorship prices, tiers, and benefits are intentionally excluded from the public site.

## Replace team photos
In index.html, find the PHOTOS comment inside #team. Replace each <span class="avatar">…</span> with, for example:
<img class="avatar" src="assets/aimen.jpg" alt="Aimen Moten">
Put each photo in assets. The same avatar class handles circular cropping.

## Other edits
- FAQ: attendance is confirmed as free. Edit answers directly in index.html.
- Contact emails: edit mailto links and their visible labels directly in index.html.
- Countdown: October 28, 2026, 9:00 AM Pacific (UTC−07:00), independent of the visitor’s timezone.
- Social metadata: if hosting somewhere else, change og:url, og:image, and twitter:image in index.html to that host’s absolute HTTPS URLs. Add the real poster before sharing publicly.
- Google Fonts are loaded remotely; local serif/sans fallbacks work offline.

## Deploy elsewhere
Upload index.html, styles.css, script.js, and assets/ together to Netlify, Vercel, or GitHub Pages. Publish the folder directly with no build command. The additional dist/ and .openai/ directories are only for the private Sites preview and can be omitted on another host.
