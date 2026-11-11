# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two primary audiences, weighted equally:

- **Recruiters and hiring managers** deciding whether to reach out. They scan for level, scope of impact, stack, and a way to make contact. Kai-Chin is open to opportunities but not urgently job hunting; the hero carries an "Available for opportunities" badge.
- **Engineering peers and the dev community**, often arriving from GitHub, Medium, YouTube, or LeetCode, who want to see what Kai-Chin has built and how they work.

Users of the side projects (maptogpx.com, Habit Reports, etc.) may also land here, but they are not a primary audience.

## Product Purpose

kaichin.dev is the personal portfolio of Kai-Chin Huang, Software Engineer II at Amazon. It presents professional experience, education, shipped side projects, and skills, and routes visitors to contact channels and external profiles. Success means a recruiter can judge fit and reach out quickly, and a peer comes away knowing what Kai-Chin has shipped.

## Positioning

**A builder who actually ships products people use.** The most important takeaway is not "big-tech engineer" alone, but that Kai-Chin takes ideas all the way to launch on their own: live websites, store-listed apps, published packages and extensions, each with real usage. The Amazon work is supporting proof of production-grade engineering, not the headline.

## Operating Context

- Visitors usually arrive from a link (resume, LinkedIn, GitHub profile, Medium, YouTube) and skim rather than read deeply.
- Outbound links are the main actions: project sites and store listings, GitHub, LinkedIn, LeetCode, Medium blog, YouTube, email.
- Sections today: Hero, Experience, Education, Projects, Skills, footer.

## Capabilities and Constraints

- **Hosting:** must keep working on GitHub Pages (static hosting, custom domain `kaichin.dev` via `CNAME`, deploys on push to `master`). Today the whole site is one `index.html` with inline CSS/JS and no build step; splitting files is allowed as long as GitHub Pages serves it without a server.
- **Analytics (do not change):** GA4 property "Kai-Chin Personal Website", measurement ID `G-2B46VSS4B1`. The tag collects only on `kaichin.dev/` and `kaichin.dev/index.html`; local previews, the github.io hostname, and other paths such as `/bike/` must not collect. Google signals and ad personalization stay disabled; browser-history page views stay disabled so in-page section navigation does not inflate counts. Details in `README.md`.
- **Language:** current content is English. Whether to add another language is undecided.
- Other projects live under the same domain (e.g. `/bike/`) and must not be affected.

## Brand Commitments

- Name: Kai-Chin Huang; domain kaichin.dev.
- **Personal side stays.** The interests block (cycling, working out, vibe coding) is part of the identity and must not be removed. Footer voice: "Vibe coded with 💚 and ☕".
- Tone in current copy: direct, first person, casual-confident, impact stated with numbers.

## Evidence on Hand

All figures below come from the current site copy; do not inflate or add new ones without confirmation.

- **Amazon (2022–present, SWE II):** cross-marketplace listing across 20+ marketplaces; Product Type Reclassification preventing 10K+ monthly listing rejections; ~25% EC2 cost reduction via AWS Scaling Planner; GenAI coding-assistant adoption (Kiro, Cline); MSW local dev infra reclaiming ~10% of engineering time.
- **Yardi (2021, SWE):** Airbnb API integration for short-term leasing.
- **Education:** M.S. Information Studies, Trine University (12/2025); B.E. Computer Science, Cal Poly SLO (09/2021); A.S. Computer Science, Santa Monica College (06/2019).
- **Projects with usage proof:** Google Maps Route to GPX (maptogpx.com, 100+ users/day); Habit Reports (App Store & Google Play); Random Emoji Commit (npm, 500+ downloads); Minimalist Tab Closer (Chrome Web Store, 100+ active users); Bakery Voice Recognition System (featured in Chatbots Life); Search and Rescue web app (led a team of four).
- **Profiles:** GitHub `qaz6209031`, LinkedIn, LeetCode, Medium (kai-chin.medium.com), YouTube (@kaichinhuang3828), email.
- **Absent:** no testimonials, no headshot or project screenshots in the repo, no press beyond the Chatbots Life feature. Do not fabricate any.

## Product Principles

1. **Shipped beats described.** Lead with things that are live and used; every project should point to where it actually runs and show its real usage number when one exists.
2. **Serve both readers in one pass.** A recruiter should get level, impact, and contact within seconds; a peer should find depth (projects, stack, writing) without hunting.
3. **Numbers are evidence, not decoration.** Use only real, sourced figures, and keep them honest as they change.
4. **A person, not a résumé.** The personal interests and casual voice are part of the product and stay.
5. **Static and simple to maintain.** Changes must deploy by pushing to GitHub Pages and never disturb the analytics scoping.
