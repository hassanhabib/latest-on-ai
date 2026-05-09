# lateston.ai

An opinionated engineering review of AI news, written for busy software engineers and hobbyists who need signal, not noise. Every post follows the same five-section review format and ends with a single action: **Adopt**, **Experiment**, **Watch**, or **Ignore**.

The site is framed by [The Standard](https://github.com/hassanhabib/The-Standard) and the Tri-Nature AI Agent Framework.

## Stack

- [Astro](https://astro.build) (static, with content collections)
- TypeScript, strict mode
- MDX for posts
- Tailwind CSS via the official Astro integration
- Shiki for syntax highlighting (dual `github-light` / `github-dark`)
- Hosted on Cloudflare Pages

## Requirements

- Node version pinned in `.nvmrc` (current LTS)
- npm

## Development

```bash
nvm use            # picks up the version in .nvmrc
npm install
npm run dev        # http://localhost:4321
```

| Command            | What it does                              |
| ------------------ | ----------------------------------------- |
| `npm run dev`      | Start the local dev server.               |
| `npm run build`    | Build static site to `dist/`.             |
| `npm run preview`  | Preview the built site locally.           |
| `npm run check`    | Run `astro check` (TypeScript + content). |

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `dist`
- Node version: matches `.nvmrc`

No server runtime, no environment variables required for the foundation.

## Writing a review

1. Copy `src/content/reviews/_template.mdx` to a new file:

   ```bash
   cp src/content/reviews/_template.mdx src/content/reviews/your-slug.mdx
   ```

2. Fill in the frontmatter. All fields except `updatedAt` and `tags` are required:

   ```yaml
   ---
   title: "..."
   verdict: "One bold one-line verdict, max ~140 chars."
   action: adopt | experiment | watch | ignore
   depth: quick | deep
   publishedAt: 2026-01-01
   stack: ["Python", "LangChain"]
   sources:
     - label: "Primary source"
       url: "https://example.com"
   description: "1-2 sentence summary for cards and SEO."
   draft: true
   tags: []
   ---
   ```

3. Keep the **five-section format**, in this order:

   - **0. The Signal** — what happened, plain English, primary sources.
   - **1. The Analysis** — what it actually is once you strip the marketing.
   - **2. The Test** — runnable verification, or what you'd need to verify it.
   - **3. The Standard Take** — the framework view, practical not theoretical.
   - **4. What to do with this** — concrete action guidance tied to the `action` tag.

   Each section is rendered with the `<SectionHeading number={n} title="..." />` component imported at the top of the MDX file. The convention is enforced by the template, not by schema validation, so be deliberate.

4. Set `draft: false` when ready to publish. Drafts are hidden in production builds and from the RSS feed.

## What is intentionally not here

This is the foundation. The following are explicitly out of scope and will be added later:

- Newsletter, comments, search, tag pages, author pages, analytics, sitemap, image optimization beyond Astro defaults, weekly digest page.

## Layout

```
src/
├── content/
│   ├── config.ts             # collection schema
│   └── reviews/
│       ├── _template.mdx     # copy this to start a new review
│       └── *.mdx
├── components/                # ReviewCard, VerdictBanner, ActionTag, etc.
├── layouts/                   # BaseLayout, ReviewLayout
├── pages/                     # /, /about, /reviews/, /reviews/[slug], /rss.xml
└── styles/global.css
```
