---
name: ui-shots
description: Turns a UI screenshot, a live web page or a Figma frame into a polished presentation shot delivered as SVG only — the screen placed in a device or frame on a background with a shadow, at an exact size, with frames, text and annotations as editable vector layers — and can drop it straight into a portfolio case or Figma. Also turns HTML illustrations, diagrams and UI mocks into editable SVG. Use whenever the user asks to "додай зображення до кейсу", "додай шот", "оформи інтерфейс", "зроби мокап", "зроби гарний скрін", "make a Dribbble/Behance shot", "put this screen in a mockup / device", "make a cover for the case", or gives a URL / Figma link / screenshot and wants it to look presentable, even if they don't say "mockup".
---

# UI Shots

Make a presentation shot out of an interface: take the screen (screenshot, URL or Figma),
pick a style from the library, render it at the right size, check it, deliver it as **SVG**.

## Output: SVG only

Every deliverable is an `.svg` file. Never hand the user a PNG or JPG.
- `compose.cjs` always writes SVG (an `--out` ending in `.png` is rewritten to `.svg`).
  Backgrounds, device frames, shadows, labels, callouts and annotation cards are vector
  layers; text stays `<text>`; the screenshots themselves are embedded as images.
- Illustrations, diagrams and UI mocks you build in HTML go through `html2svg.cjs`, which
  keeps every box, text line and inline icon as its own layer.
- Imported into Figma (`upload_assets` with `image/svg+xml`, or drag and drop) the SVG
  becomes editable frames and text, so the user can keep working on it.
- A PNG is only a check for you: pass `--preview` to see what you made. Don't deliver it,
  don't link it in a case, don't upload it to Figma.
- Case pages show the SVG with `<Figure src="./images/<slug>/<name>.svg" …/>`; browsers
  render it like any image.

Talk to the user in their language (usually Ukrainian). File names, captions in MDX and
code stay in English.

## What's in this skill

| Path | What it is | When to read |
|---|---|---|
| `references/library.md` | The style library: 25 presets in five groups (sections, web, mobile, dashboards, tables), every preset, what it looks like, which reference it came from, when to use it, and how to pick one | Step 3, every time |
| `references/sources.md` | Getting the screen and the target size from a URL, a Figma link, a site template or a file | Steps 1–2 |
| `references/options.md` | Every compose option with examples | When a preset needs tuning |
| `scripts/compose.cjs` | The renderer (Playwright + HTML/CSS), writes SVG | Step 4 |
| `scripts/html2svg.cjs` | Any self-contained HTML (illustration, diagram, UI mock) → layered SVG | Illustrations |
| `scripts/dom2svg.js` | The DOM → SVG serializer both scripts use | When output looks off |
| `scripts/capture.cjs` | Screenshot of a URL or one element of it | Step 1, URL input |
| `scripts/measure.cjs` | Sizes of the image slots on a page | Step 2, size from a site |
| `presets/*.json` | Ready styles; `presets/previews/` shows each one | Step 3 |
| `examples/` | The user's original reference shots, if they uploaded any | When you need to see a reference |

Scripts need only Node and Playwright (`require('playwright')`), which are preinstalled in
cloud sessions. Run them with `node <skill-dir>/scripts/<name>.cjs`.

## The one hard rule: screens are never cut

**Every screen in a shot is shown whole**: all four edges visible inside the canvas, nothing
cut at the bottom, nothing hidden inside its frame, no zoom into a corner, no `clip` of the
source. The user reads a cut-off screen as a mistake, not a style.

- `compose.cjs` checks this on every render and **refuses to save** a shot where any screen
  runs off the canvas, is cut inside its frame, or was clipped. It prints `NOT SAVED` with
  the reason. Fix the composition; don't work around the check.
- Pass `--allow-crop` (or `"allowCrop": true` in a job) **only when the user explicitly asked
  for a crop**: "крупний план", "close-up", "обріж", "стіна з екранів", "тільки цей блок",
  or named a cropping preset. Say in your report that the shot is cropped on purpose.
- Presets marked **crops** in `references/library.md` (walls, masonry, perspective, overlap,
  close-ups, desktop screens in phones) need that permission. Default to the whole-screen
  presets: `tablet-float`, `annotated-fragment`, `fragment-collage`, `dash-float`, `muted-card`, `browser-clean`, `glass-glow`, `brand-solid`,
  `charcoal-card`, `dark-stack`, `dark-aurora`, `kit-flat`, `responsive-pair`, `accent-grid`,
  `table-callout`, or `layout: row`/`grid` with `fit: contain`.
- Need a detail to be readable? Keep the whole screen and lift the detail out with
  `callout`. Too many screens for one image? Use fewer, or split into two images.
- One exception is built in: `focus-closeup` (the user's own reference) crops on purpose
  and blurs everything but the control, so it may be used without asking when an image
  is about one control.

## Workflow

### 1. Get the screen
Work out what the source is and get an image of it (a PNG screenshot is fine as **input**). Details are in `references/sources.md`.
- **File** the user attached or named: use it as is.
- **URL**: `capture.cjs`. Desktop at 1440 wide by default, `--mobile` for phone screens,
  `--selector` for one section, `--hide` for cookie banners and chat widgets.
- **Figma link to a design**: export the node through the Figma tools. If you can't get a
  file out of them, ask the user to export the frame at 2x and attach it.

Before going on, look at the screenshot. A shot shows one idea. If the shot is about one
section of a long page, capture that section on its own (`capture.cjs --selector`, or export
that frame from Figma) so it is a whole screen of its own. Don't cut it out with `clip`.

### 2. Decide the output size
In priority order:
1. **The user named a size** ("1600×1200", "для Dribbble", "квадрат"): use it. Common
   sizes: Dribbble 1600×1200 (4:3), Behance module 1920×1080 or 1400 wide, Instagram
   1080×1350, LinkedIn 1200×627, square 1600×1600.
2. **A Figma link points at a target slot** (an empty frame or a placeholder in a case layout):
   take that node's width and height as the size (SVG scales without loss).
3. **A site template** (e.g. a case page): measure the image slot with `measure.cjs` and
   use that size.
4. **A case MDX** without other hints: 1600×1200 (4:3), the same for every image of the case,
   unless the case already has images of another size. Then match those.
5. Otherwise: 1600×1200.

If a Figma link could be either the source or the target slot, look at the node: a filled
design is the source, an empty frame or rectangle inside a page layout is the target. If
it's still unclear, ask once.

### 3. Pick the style
Read `references/library.md` and choose a preset from the content (web page, section, mobile
screens, dark UI, many small screens), the number of screens and the product's colours.
That file has the selection rules. In short:
- **Portfolio case images: use the case family "lavender" by default** (`tablet-float`,
  `annotated-fragment`, `fragment-collage`, `focus-closeup`). These come from the user's own
  images, so match them unless the user asks for something else.
- **Within one case, keep one style family**: the same background tone, frame and shadow
  on every image. Vary only the composition. A reviewer reads consistency as craft.
- **Separate shots** (Dribbble, social, a cover): choose freely and don't repeat the
  previous shot's preset if there is a good alternative.
- Prefer `auto-*` colours so the background and shadow come from the product itself. If you
  know the brand colour (Figma variables, CSS, the logo), or the script warns that it found
  none, pass `--accent "#hex"`.
- **Case images are evidence.** Every image must be readable on a phone *and* show whole
  screens. One or two screens per image; show the detail with `callout` (`table-callout`)
  on top of the whole screen. Walls, masonry and close-ups crop screens: only on request.

Tell the user in one line which style you picked and why ("взяла glass-glow: одна яскрава
секція, тінь підхопить помаранчевий бренду"). If they asked for something specific, do
that instead.

### 4. Render
```bash
node <skill-dir>/scripts/compose.cjs --input shot.png --preset glass-glow \
  --size 1600x1200 --out out/hero.svg --preview
```
`--preview` also writes `out/hero.preview.png` for your check only.

An illustration, diagram or UI mock built as HTML:
```bash
node <skill-dir>/scripts/html2svg.cjs --input diagram.html --out out/diagram.svg \
  --size 954x537 --preview out/diagram.preview.png
```
Build such HTML with real elements (divs, text, inline `<svg>` icons), set `html, body` to
the exact size, embed images as data URIs. Avoid CSS masks and 3D transforms: the
converter drops masks and flattens 3D, and says so in a warning.
Several screens: repeat `--input`. Several shots at once: write a jobs JSON and pass
`--batch jobs.json` (one browser for all). Any preset option can be overridden from the
command line (`--background auto-soft --shadow soft`). The script prints the colours it
picked, so you can mention or reuse them.

### 5. Check it, then fix it
Open the preview PNG and look at it as the viewer will (the SVG renders the same; if a warning says something was dropped or approximated, check that spot). Fix and re-render if you see any of these:
- Any screen is cut off (the script refuses to save these, but check walls you were allowed
  to crop too). Use `fit: contain`, a row or grid layout, fewer screens, or two images.
- The key part of the UI is too small to read. Use fewer screens per image, or `callout`
  to lift that part out over the whole screen.
- The background fights with the UI (same colour as the screen edges, or too loud next to a
  busy screen). Try another `auto-*` value or a neutral.
- Text inside the image would be unreadable on a phone (for case images). Split into two
  images, or add a `callout` of the key part. Don't crop the screen.
- Real names, emails, money or logos under NDA are visible. Blur them with `redact`.
- The detail that matters (a selected row, a dropdown, a status chip) is lost in the whole
  screen. Lift it out with `callout` (`zoom` + `focus` crops the screen: only on request).

At most 2–3 rounds. If it's still not right, show the best version and say what you'd change.

### 6. Deliver
- **Standalone shot**: save the `.svg` where the user asked, or next to the source, and send
  it to the user (SendUserFile if available). Only the SVG.
- **Into a case** ("додай зображення до кейсу"): find the case MDX (`src/content/cases/<slug>.mdx`
  or `drafts/<slug>.mdx`). Save the SVG as `images/<slug>/<short-name>.svg` next to it (the
  case template uses `./images/<slug>/…`). Then either replace the matching
  `<Figure src="[TODO: file]" …/>` or add a new `<Figure src="./images/<slug>/<name>.svg"
  caption="…" />` where it belongs. A caption says what the image shows and why it
  matters. If the case frontmatter has `nda: true`, check for sensitive data before saving.
- **Into Figma**: upload the SVG with `upload_assets` (`image/svg+xml`); it lands as editable
  layers. Name and place the new frame next to the slot it is for.
- Name files by content: `cover.svg`, `onboarding-flow.svg`, `dashboard-before-after.svg`.

Report in 2–3 lines: the file path(s), the size and preset, and anything you weren't sure
about.

## Adding to the library
When the user sends new reference shots ("ось ще приклади", or just a batch of images with
a word like "мобілка", "дашборди", "таблиці"), for each one:
1. Describe it the way `references/library.md` does: background, frame, shadow,
   composition, layout, and what content it suits.
2. If an existing preset already covers it, add the reference to that preset's entry.
   Otherwise create a new `presets/<name>.json` with a `$description`. If the renderer
   can't do it yet (a new frame type, a new layout), extend `scripts/page.html` and document
   the option in `references/options.md`.
3. Render a preview to `presets/previews/<name>.png` (internal, for the library only) and compare it with the reference
   side by side. Tune until the feel matches, not the pixels.
4. Add the entry and its selection rule to `references/library.md`.

Save the originals to `examples/<preset>-<n>.<ext>`. Images attached to a chat message are
usually saved on disk (the message shows a source path). If they aren't, describe the
reference in the library entry and ask the user to upload the original to `examples/`.
