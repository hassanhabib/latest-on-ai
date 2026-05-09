# lateston.ai — Foundation Build Spec

You are scaffolding the foundation of a publication called **lateston.ai**. Read this entire brief before writing any code. Build exactly what is specified — no extra features, no scope creep. Your job is the foundation, not the full site.

## What this site is

**lateston.ai** is an opinionated engineering review of AI news, written for busy software engineers and hobbyists who need signal, not noise. Every post follows a fixed five-section review format and ends with a clear action: Adopt, Experiment, Watch, or Ignore. The site is framed by *The Standard* (github.com/hassanhabib/The-Standard) and the Tri-Nature AI Agent Framework — readers should feel a consistent worldview across posts.

The medium is part of the message: the site itself must feel like a craft object built by an engineer who cares. Fast, clean, no dark patterns, no popups, no cookie banners beyond legal minimum.

## Tech stack — non-negotiable

- **Framework:** Astro (latest stable), TypeScript strict mode
- **Content:** MDX in a `content/reviews/` collection with typed frontmatter
- **Styling:** Tailwind CSS via the official Astro integration, with a small custom theme layer for typography and color tokens
- **Syntax highlighting:** Shiki (Astro built-in), with both light and dark themes
- **Hosting target:** Cloudflare Pages (build command and output config must be Pages-compatible)
- **Package manager:** npm
- **Node version:** pin via `.nvmrc` to current LTS

Do not add a CMS, database, auth, comments system, analytics, or newsletter integration in this foundation pass. Those come later.

## Repository structure

Create exactly this layout. Do not add directories that aren't listed.

```
lateston-ai/
├── .nvmrc
├── .gitignore
├── .editorconfig
├── README.md
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── public/
│   ├── favicon.svg
│   └── robots.txt
└── src/
    ├── content/
    │   ├── config.ts
    │   └── reviews/
    │       ├── _template.mdx
    │       └── hello-world.mdx
    ├── components/
    │   ├── ReviewCard.astro
    │   ├── VerdictBanner.astro
    │   ├── ActionTag.astro
    │   ├── StackTag.astro
    │   ├── SectionHeading.astro
    │   ├── ReadingTime.astro
    │   └── ThemeToggle.astro
    ├── layouts/
    │   ├── BaseLayout.astro
    │   └── ReviewLayout.astro
    ├── pages/
    │   ├── index.astro
    │   ├── about.astro
    │   ├── reviews/
    │   │   ├── index.astro
    │   │   └── [slug].astro
    │   └── rss.xml.ts
    └── styles/
        └── global.css
```

## Content model — `src/content/config.ts`

Define one collection: `reviews`. Frontmatter schema, all required unless marked optional:

```ts
{
  title: string,                                    // The post title
  verdict: string,                                  // One-line bold verdict (max ~140 chars)
  action: 'adopt' | 'experiment' | 'watch' | 'ignore',
  depth: 'quick' | 'deep',                          // ~600 vs ~2000 words
  publishedAt: Date,
  updatedAt: Date | undefined,                      // optional
  stack: string[],                                  // e.g. ['Python', 'LangChain', 'Local', 'GPU optional']
  sources: { label: string, url: string }[],        // primary sources only
  description: string,                              // 1-2 sentences for SEO + cards
  draft: boolean,                                   // default false
  tags: string[]                                    // optional taxonomy
}
```

Posts must use the **five-section format**, enforced by convention (not validation) via the `_template.mdx` file. The five sections, in order:

0. **The Signal** — what happened, plain English, primary sources only
1. **The Analysis** — what it actually is, stripped of marketing
2. **The Test** — runnable verification, or "What you'd need to verify it" if not testable
3. **The Standard Take** — the framework view, practical not theoretical
4. **What to do with this** — concrete action guidance tied to the `action` frontmatter

`_template.mdx` should include all five section headings as `<SectionHeading>` components with placeholder prose so a writer can copy it and start filling in.

## Pages

### `/` (homepage)
- Site name and tagline at top: **lateston on .ai** with subtitle *"Engineering reviews of the latest in AI, through The Standard."*
- Filter bar: four pill buttons for Adopt / Experiment / Watch / Ignore that filter the list client-side (use a tiny vanilla JS handler — no React, no Alpine).
- Reverse-chronological list of `ReviewCard` components showing: verdict (prominent), title, action tag, depth tag, stack tags, reading time, published date.
- Footer with: GitHub link (placeholder `#`), RSS link, About link, copyright with current year.

### `/reviews/` (index)
- Same as homepage list but without the hero. Just the filter + list. This is the canonical archive.

### `/reviews/[slug]` (single review)
- Uses `ReviewLayout`.
- Top of page, in this order: title → verdict (large, bold, set apart) → metadata row (action tag, depth tag, stack tags, reading time, published date, updated date if present) → sources block (collapsible or always-visible list of primary source links) → article body.
- Article body renders MDX with the five `SectionHeading` components.
- Bottom: prev/next review navigation by date.

### `/about` 
A short page (one screen) explaining: who writes this, the five-section format, what each action tag means, and a one-line link to The Standard. Write the prose yourself in plain, declarative sentences. No marketing language. No emojis. No em dashes. First-person singular voice ("I write this site...").

### `/rss.xml`
Standard RSS 2.0 feed of the latest 30 published reviews. Include verdict in the description.

## Components — behavior spec

- **ReviewCard:** Displays one review in list views. Verdict is the most visually prominent element after the title. Whole card is clickable.
- **VerdictBanner:** Renders the verdict prominently on the review page. Visually distinct (border-left accent, slightly larger type).
- **ActionTag:** Small pill. Four variants with distinct colors (Adopt = green, Experiment = blue, Watch = amber, Ignore = neutral gray). Color tokens defined in Tailwind theme — do not hardcode hex in components.
- **StackTag:** Small monospace pill, neutral color, rendered as a list.
- **SectionHeading:** Numbered section header (0–4) used inside MDX. Renders as `<h2>` with a small numeric prefix.
- **ReadingTime:** Computes reading time from the rendered post content (200 wpm). If frontmatter includes a code-run estimate later, accept an optional `runMinutes` prop and display as `"6 min read · 15 min if you run the code"`.
- **ThemeToggle:** Light/dark/system. Persists to `localStorage`. Avoid FOUC — set the theme class on `<html>` via an inline script in `<head>` before paint.

## Design system — get this right, it's the brand

These are not suggestions, they are requirements. The reading experience is the product.

**Typography**
- Body font: a high-quality serif. Use **Source Serif 4** (Google Fonts) self-hosted via `@fontsource-variable/source-serif-4`.
- UI font: **Inter** (variable) for nav, tags, metadata.
- Code font: **JetBrains Mono** (variable) for all code blocks and inline code.
- Body size: 19px base, line-height 1.65.
- Max prose width: 680px.

**Color tokens** (define in `tailwind.config.mjs` under `theme.extend.colors`)
- Light mode: warm off-white background (`#FAFAF7`), near-black text (`#171717`), single accent (`#1B4FCE` — a confident editorial blue).
- Dark mode: deep neutral background (`#0E0E10`), warm off-white text (`#ECECEA`), accent lifted slightly for contrast (`#5B82E8`).
- Action colors: `adopt: emerald-600/400`, `experiment: blue-600/400`, `watch: amber-600/400`, `ignore: neutral-500/400` (light/dark pairs).

**Layout**
- Header: site wordmark left, About / Reviews / RSS / Theme toggle right. Sticky on scroll, with a subtle bottom border that appears only after scroll.
- All pages use the same vertical rhythm: 8px base unit.
- No animations beyond a 150ms color transition on links and the theme toggle. No scroll-triggered effects. No fades.

**Code blocks**
- Shiki configured with `github-light` and `github-dark` themes.
- Language label in the top-right of each block.
- Copy button in the top-right (plain, no icon library — use an inline SVG).

## Quality bar

- TypeScript strict mode, no `any` types in committed code.
- All components have explicit prop types.
- Lighthouse targets on the deployed site: Performance 100, Accessibility 100, Best Practices 100, SEO 100. Build with this in mind: no layout shift, semantic HTML, alt text on every image, proper heading hierarchy.
- No unused dependencies in `package.json`.
- `README.md` contains: project description, dev commands, how to write a new review (point at `_template.mdx`), and the five-section convention.

## Sample content

Create one real sample post at `src/content/reviews/hello-world.mdx`:
- Title: *"Hello World: What This Site Is For"*
- A short manifesto post that uses the five-section format to review the site itself.
  - Section 0: "The Signal" — a new AI publication launched.
  - Section 1: "The Analysis" — what it actually is (an opinionated engineering review).
  - Section 2: "The Test" — you're reading it. Here's what to look for.
  - Section 3: "The Standard Take" — applied to the site itself.
  - Section 4: "What to do with this" — subscribe via RSS, read one review, decide.
- Action: `experiment`. Depth: `quick`. Stack: `['Meta']`.

This serves as the live example of the format and gives the site something to render on day one.

## Out of scope for this pass

Do **not** build any of the following — they will be added later:
- Newsletter signup or email integration
- Comments
- Search
- Tag pages or taxonomy browsing
- Author pages (single-author site for now)
- Analytics
- Image optimization pipeline beyond Astro defaults
- Sitemap (will add with the SEO pass)
- A "this week, in 5 minutes" digest page

## Deliverables

When finished, the project should:
1. Run with `npm install && npm run dev` and serve at `localhost:4321`
2. Build with `npm run build` to a clean `dist/` directory
3. Render the homepage, the sample post, the about page, and the RSS feed correctly
4. Pass `npm run astro check` with zero errors
5. Have a `README.md` that a new contributor can follow to write their first review

Ship the foundation. Nothing more, nothing less.