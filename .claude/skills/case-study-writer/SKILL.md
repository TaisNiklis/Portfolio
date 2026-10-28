---
name: case-study-writer
description: Turns raw project material (notes, briefs, Behance text, screenshots, metrics) into a product-design case study for Taisiia Silkina's portfolio, written in English as an MDX file with frontmatter. Use when the user asks to write, rewrite or review a case study or portfolio case ("кейс", "case study", "portfolio case", "переписати кейс з Behance", "оформити кейс"), or to check what material a case still needs.
---

# Case Study Writer (v0.2, draft)

Turn raw material about a project into a product case study that a hiring manager at a
remote B2B SaaS / AI company can scan in 30 seconds and read in 4–6 minutes.

- Talk to the user in **their language** (usually Ukrainian). Write the case itself in **English**.
- **Never invent** facts, numbers, quotes, team sizes or outcomes. Missing data becomes a
  `[TODO: …]` placeholder plus a question to the user.

## Reference files

Read these before drafting. They hold the actual rules:

| File | When |
|---|---|
| `references/hiring-signals.md` | Step 3: what reviewers look for, the author's profile and target roles |
| `references/structure.md` | Step 4: the 13 sections, their length and example phrasing |
| `references/rules.md` | Steps 4–5: metrics and NDA, visuals, writing style, banned filler phrases |
| `checklists/raw-material.md` | Step 2: what material a case needs. You can also hand it to the user |
| `checklists/quality.md` | Step 5: final self-review |
| `templates/case-study.mdx` | Step 6: output skeleton with frontmatter |
| `examples/connected-campaign-lifecycle-ai-platform.mdx` | Steps 4–5: a finished case to match in depth, tone and length |

## Workflow

### 1. Intake
Collect everything the user gives: text, notes, Behance copy, links, screenshots, numbers.
Work out which case it is. The known set (from `references/hiring-signals.md`):
AI assistant adoption, complex B2B logic, design system, website redesign, AI design pipeline,
or a side project. If it's a new one, name it in one line.

### 2. Gap check
Compare the material against `checklists/raw-material.md`. Ask **at most 5** questions in
one message, ordered by impact:
1. Her personal role and decisions (what *she* did vs. the team).
2. Alternatives considered and why they were rejected.
3. Metrics or proxy evidence, and where they come from.
4. Constraints (time, budget, tech, client).
5. Feedback or quotes.

If the user wants a draft right away, skip waiting and go on with `[TODO]` placeholders.

### 3. Angle
Pick the **1–2 skills** this case proves (AI product design / complex B2B logic / design
systems / conversion & growth / AI-assisted workflow / leadership). Then write **3 title
options**, each stating an outcome, not a project name. Let the user pick, or pick the
strongest and say why.

### 4. Draft
Write the case using `templates/case-study.mdx` and `references/structure.md`.
- Follow `references/rules.md` for metrics, NDA, visuals and wording.
- Put the evidence for the chosen angle in sections 6–8. That is where a senior reviewer
  decides.
- Mark every image slot as `<Figure src="[TODO: file]" caption="…" />` with a caption that
  says what the image shows and why it matters.
- Target 800–1500 words.
- Write the **"AI in my process"** callout only from what the user has confirmed about her
  own AI use. Don't infer it from files or logs. If unconfirmed, leave a `[TODO]` and ask.

### 5. Self-review
Run `checklists/quality.md` against the draft. Report the result to the user as a short list:
✅ passed, ⚠️ weak (with a concrete fix), ❌ missing.

### 6. Output
Give the user:
1. The MDX file. When working in the portfolio repo, save it as
   `src/content/cases/<slug>.mdx` if that folder exists, otherwise as `drafts/<slug>.mdx`.
2. An **image shot list** as a table: file name, what to export from Figma, and the caption.
   Images go in `images/<slug>/`.
3. The **open TODOs** with the questions that would close them.

Frontmatter: `order` is a **number** for sorting on the site. `project` is the user's internal
project name (e.g. "AIMarketingService"). Ask for both if missing.

### Plain-text mode
When the user wants to paste the case into a design (Figma, Behance, a slide), give the same
case as **plain text** with no Markdown:
- a header block of `Label: value` lines, then each metric as `value — label (source: …)`;
- sections separated by `---`, headings as plain lines, bullets as `•`;
- each image as `[Image: file.png]` with its caption on the next line.

After the text, list the **bold key phrases** separately (one per section), so she can
highlight them in the layout.

## Iteration
When the user answers questions or sends edits, update the same file. Don't start over.
Re-run step 5 after major changes.
