# Style library

29 presets in six groups, plus one reference-only style. Each one comes from a real reference shot the user
picked (the originals are in `examples/` where available). The **case family: lavender** group is
the user's own work and is the default for portfolio case images. Previews on test content are in
`presets/previews/<name>.png`: they show the composition, not how a real product will look.
When you need the precise feel, open the original in `examples/`.

## How to pick

1. **Find the group** by what the content is: a web page or landing, a mobile app, a
   dashboard, a table or list, or a single section or component.
2. **Narrow it** by how many screens you have and by the mood (light, dark, bold accent).
3. **Check the brand colour.** `auto-*` colours come from the screenshots. If the brand colour
   only shows up in small details (buttons, checkboxes, chips), or charts would hijack the
   detection, pass `--accent "#hex"`. The script warns when it can't find a clear colour.

### Quick table

✂ = crops screens: only when the user asks for a crop, close-up or wall.

| Content | Screens | Mood | Preset |
|---|---|---|---|
| **Section / component** | 1 | bold colour | `glass-glow` |
| | 1 | dark | `dark-stack` |
| **Web page / landing** | 1 page | calm, warm | `muted-card` |
| | 1 hero | bold, poster | `charcoal-card` |
| | 1 long page | — | `page-columns` ✂ |
| | 2 pages | light | `overlap-pages` ✂ |
| | 2 pages | dynamic | `perspective-pages` ✂ |
| | 5–9 sections | breadth | `section-wall` ✂ |
| **Mobile app** | 2–3 | "real phone" | `iphone-trio` (phone screens only) |
| | 1 hero | playful | `phone-scene` (phone screens only) |
| | 3 | dark + accent | `dark-aurora` |
| | 3 (1 hero) | dynamic | `tilted-pair` ✂ |
| | 3–6 | light overview | `iso-slabs` ✂ / `tilted-masonry` ✂ |
| | 4–9 small | bold accent | `accent-grid` |
| **Dashboard / web app** | 1 whole | light | `dash-float` |
| | 1 | "runs in the browser" | `browser-clean` |
| | 1 detail area | dark, premium | `macbook-closeup` ✂ |
| | 5–9 screens + fragments | system | `fragment-wall` ✂ |
| | ready-made board / UI kit | — | `kit-flat` |
| **Table / list** | 1 + one interaction | detail | `table-callout` |
| | 1 + dropdown / editor | detail | `card-closeup` ✂ |
| | 1 | bold brand | `brand-solid` |
| | desktop + mobile | responsive | `responsive-pair` |
| | many tables | design system | `iso-wall` ✂ |
| **Case family: lavender** (default for case images) | 1 screen | product | `tablet-float` |
| | 1 fragment + 2–4 notes | explain | `annotated-fragment` |
| | 2–4 fragments | compare | `fragment-collage` |
| | 1 control | detail | `focus-closeup` (deliberate crop) |
| | 1 hero, real-life | cover | photo mockup (Figma only) |

### Rules of thumb
- **Inside one case, keep one family**: the same background rule, radius and shadow on every
  image. The cover may be the loud version of that family (wall, masonry, tilt), but inner
  images stay calm: `muted-card`, `dash-float`, `browser-clean`, `glass-glow`. Different cases
  and standalone Dribbble shots can differ.
- **Layout rules** (see SKILL.md): crop only at the canvas edge, never the top-left corner, inner padding smaller than outer spacing. **Screens are never cut** (see SKILL.md). Presets marked ✂ / "crops" run screens off the
  canvas or cut them inside the frame; `compose.cjs` refuses to save them unless the user
  asked for a crop and you pass `--allow-crop`. `iphone-trio` and `phone-scene` only work
  with phone-shaped screenshots; a desktop screen in a phone frame is cut.
- **Case images must be readable on a phone.** One or two whole screens per image, and a
  `callout` (`table-callout`) for the detail, instead of close-ups or `clip`.
- **Overview → detail.** For a series, pair a wide shot with the same whole screen plus a `callout` of the detail.
- **Separate shots** (Dribbble, social): don't repeat the previous shot's preset if a good
  alternative exists.
- Things that look bad everywhere: a background the same colour as the screen's edge, more
  than 6 screens in one row, and a long page squeezed whole into 4:3 (crop or split it).
- Use realistic devices (`iphone-trio`, `macbook-closeup`, `phone-scene`) when the device is
  part of the story. Otherwise bare screens and cards look cleaner.

---

## Sections and components

### glass-glow
**Ref:** orange "Let's Get In Touch" banner.
**Looks like:** one wide component in a thin frosted-glass bezel with a large radius, on a
neutral light grey, with a soft glow in the UI's brand colour underneath.
**Use for:** a single hero, banner, pricing block, CTA or modal with a strong colour. On a grey
UI the glow turns into a dirty shadow, so switch to `shadow: soft`.
**Tune:** `clip` the section out of a full page. `background: auto-light` for a tinted neutral.

### dark-stack
**Ref:** "Shape Your Digital Fortune Today".
**Looks like:** a dark card with a hairline border, two narrower cards peeking out above it,
on near-black, with a deep shadow.
**Use for:** dark-mode components and sections. Fintech, AI and dev tools.
**Tune:** `stack: 1` for a quieter look. `background: auto-dark` for a tinted black.

## Web pages and landings

### muted-card
**Ref:** "Your all-in-one Travel App" on beige.
**Looks like:** the page as a flat card filling about 85% of the width, cut at the bottom, on an
earthy tone taken from the page (`auto-muted`). No shadow.
**Use for:** landing pages, long pages, before/after. The calm default for inner case images.
**Tune:** `auto-soft` for a pastel background, `shadow: soft`, or `device: browser` + `url`.

### charcoal-card
**Ref:** ".COINBASE" finance hero.
**Looks like:** a big white card with a large radius on flat charcoal. No shadow, poster-like.
**Use for:** a bold hero with a strong headline. The original adds 3D objects breaking out of
the card. That needs a separate render (pass it as `bgImage` or skip it).

### page-columns · crops (only on request)
**Ref:** "Socrates" AI document tool landing.
**Looks like:** one long page cut into two tall columns. The left one sits lower and the right
one starts above the frame. Flat cards on a muted tone.
**Use for:** a long landing page in one shot. Pass the same screenshot twice with
`crop: [0, 0.55]` so each column shows a different part.

### overlap-pages · crops (only on request)
**Ref:** "Pockit" pink fintech landing.
**Looks like:** the main page in front, lower left, running off the bottom. A second page sits
behind it, up and to the right, fading toward the bottom. Very light background, soft shadow.
**Use for:** a landing plus an inner page, or two parts of one site. The first input goes in front.

### perspective-pages · crops (only on request)
**Ref:** "Pathpro" sport tracker.
**Looks like:** pages turned in 3D perspective, a big one in front and a second behind on the
right, on light grey with a medium shadow.
**Use for:** landings with a strong photo or hero plus one supporting screen. It is dynamic and
editorial.

### section-wall · crops (only on request)
**Ref:** "Studio" marketing agency.
**Looks like:** the site's sections as rounded cards in brick-shifted rows, running off every
edge, with small gaps on black. The first input sits in the middle.
**Use for:** showing the breadth of a site in one shot (a cover). Capture 5–9 sections with
`capture.cjs --selector`.

## Mobile apps

### iphone-trio · phone-shaped screenshots only (a desktop screen gets cut)
**Ref:** dark fintech app with yellow accent.
**Looks like:** three realistic iPhones (silver metal band, side buttons), the middle one lower,
slightly fanned, on a pale tint of the accent, with a medium shadow.
**Use for:** 2–3 key screens when "this is a real app" matters. Charts in the screens can
mislead colour detection, so pass `accent`.
**Tune:** `frameColor`: silver, titanium, graphite, rose, gold, midnight. `fan: 0` keeps them
straight.

### phone-scene · phone-shaped screenshots only (a desktop screen gets cut)
**Ref:** "Kawaii Bank" virtual card (3D render).
**Looks like:** one large phone in a rose frame in front of a patterned pastel backdrop.
**Use for:** a single hero screen of a playful consumer app, or a cover. The original is a 3D
scene: pass `bgImage` with a real backdrop. The hex pattern on a gradient is the fallback.

### dark-aurora
**Ref:** "brighter" retirement planner.
**Looks like:** three bare dark screens with rounded corners, the middle one lower, on
near-black with a glow of the accent rising from the bottom.
**Use for:** dark-mode mobile UI with one strong accent.

### tilted-pair · crops (only on request)
**Ref:** "Solidity Swap" DeFi.
**Looks like:** large bare screens in two rotated columns, one hero on the left and two on the
right (the top one cut by the frame), on a pastel tint of the accent. Each screen appears once.
**Use for:** 3 screens where one is the hero. The first input is the hero.

### iso-slabs · crops (only on request)
**Ref:** "Get Loans in Minutes" light fintech.
**Looks like:** white screens with visible thickness (`depth`) in a 3D-tilted masonry that runs
off the edges, on very light cool grey.
**Use for:** a light mobile UI overview with 3–5 screens. It feels airy and premium.

### tilted-masonry · crops (only on request)
**Ref:** "freud UI Kit".
**Looks like:** bare rounded phone screens in three rotated columns running off every edge, on
cool grey with a soft shadow. Screens repeat to fill the frame.
**Use for:** a cover or overview of a mobile app with 3–6 screens.

### accent-grid
**Ref:** "Enode Pro" watch screens.
**Looks like:** bare rounded tiles in a 3-column grid with stepped column offsets, on a loud
solid accent. No shadow.
**Use for:** 4–9 small screens (watch, widgets, stat cards, cropped mobile screens).

## Dashboards and web apps

### dash-float
**Ref:** "DoDo" learning platform.
**Looks like:** the whole dashboard as a floating card with soft corners on a muted tone from
the UI, soft shadow, generous padding.
**Use for:** a light dashboard shown whole, as the overview image of a case.

### browser-clean
**Ref:** "Taskflow" messaging SaaS.
**Looks like:** a Safari-like window (traffic lights, sidebar and back/forward icons, an address
bar with a lock) on a very light cool tint, soft shadow.
**Use for:** SaaS screens where "it runs in the browser" matters. A calm default for web-app
case images. Set `url`.

### macbook-closeup · crops (only on request)
**Ref:** "Team management" dark dashboard.
**Looks like:** a close-up of a MacBook's top-right corner. The laptop runs off the left and
bottom edges, on a very dark textured background.
**Use for:** dark dashboards where one area should be readable and the device should still read
as real. Move `focus` and `anchor` to frame another corner.

### fragment-wall · crops (only on request)
**Ref:** "workwise" project management.
**Looks like:** screens and fragments (dashboard, sidebar, widgets, kanban) in brick-shifted rows
on very light grey with even gaps.
**Use for:** a whole product system at once, as a cover. Feed 5–9 screens and fragments.

### kit-flat
**Ref:** "Campfire" dark UI kit bento.
**Looks like:** the export placed flat on its own background colour, with no frame or shadow.
**Use for:** exports that are already a composition: UI kits, bento boards, style sheets.

## Tables and lists

### table-callout
**Ref:** "Transactions" bulk selection.
**Looks like:** a table card with a strip of rows lifted out, enlarged, with a deep shadow,
sticking out past the card's left edge, on a deep navy (the original uses a night-sky photo:
`bgImage`).
**Use for:** one interaction inside a big table (selection, inline edit, status change). Set
`callout {y, h}` to the rows to lift (fractions of the screenshot).

### card-closeup · crops (only on request)
**Ref:** ticket table with a column editor.
**Looks like:** a zoomed-in top-right corner of a web-app card, cut by the left and bottom
edges, on neutral grey.
**Use for:** a dropdown, column editor or filter shown big and readable. Move `focus` to the
interesting corner.

### brand-solid
**Ref:** "Lemon Squeezy" discounts.
**Looks like:** a full app screen as a card with small corners, on a flat solid brand colour,
deep shadow, an optional `logo` in a corner.
**Use for:** a single app screen of a product with a strong brand colour. Usually needs
`accent`, because tables rarely show much brand colour.

### responsive-pair
**Ref:** desktop / mobile dark GPU marketplace.
**Looks like:** the desktop and mobile versions side by side, flat with no frames, each with a
small mono tag above it. Dark background.
**Use for:** responsive design, before/after (`labels: ["Before", "After"]`), or variants. Adjust
`widths`.

### iso-wall · crops (only on request)
**Ref:** Untitled UI table family.
**Looks like:** many table cards in an isometric 3D wall that runs off every edge, white cards
with soft shadows on near-white.
**Use for:** a family of tables or list views from a design system, as a cover.

---

## Case family: lavender (the user's own references)

The user made these for the HR-platform case and wants them used as references. They share one
system: flat lavender background `#DFDEFB`, white cards with soft shadows, purple accent only on
actions and connectors, rounded image corners, no frames except the dark tablet bezel. **Use this
family by default for portfolio case images**, and keep all images of one case inside it.
Originals: `examples/<preset>-<n>.png`.

### tablet-float
**Ref:** talent timesheet, talent payments (`tablet-float-1.png`, `tablet-float-2.png`).
**Looks like:** one whole web-app screen in a thin dark tablet bezel (about 11 px at 954 wide) that
takes the screenshot's own proportions, centred on flat lavender with a soft shadow.
**Use for:** the main screen of a section: tables, dashboards, lists. The calm default.
**Tune:** `padding` for size. In the originals the bezel touches the bottom edge; here it stays
whole.

### annotated-fragment
**Ref:** onboarding checklist with Veriff, DocuSeal and Time Doctor cards (`annotated-fragment-1.png`).
**Looks like:** one UI fragment in the middle (the checklist card, exported on its own) with white
annotation cards around it: an icon in a pale accent square, a bold title, one or two lines. Each
card is joined to its row by a dashed accent curve that ends in a hollow dot.
**Use for:** where things plug in: integrations, rules, states, who does what.
**Tune:** export the fragment itself (a Figma frame or `capture.cjs --selector`), not the whole
screen, so the rows are big. Set `annotations` per job: `[{title, text, icon, x, y, w, to:[fx, fy]}]`,
cards may overlap the fragment's edge. Icons: id, sign, clock, check, lock, doc, wallet, user,
bell, star.

### fragment-collage
**Ref:** payout method forms (`fragment-collage-1.png`).
**Looks like:** several fragments (method cards, an account field, two drawers) placed by hand,
slightly overlapping, white cards with soft shadows on lavender. Reads as "the parts of one flow".
**Use for:** comparing variants of one form, or showing the parts of a step.
**Tune:** `layout: "free"` with `positions: [{x, y, w}]` (fractions of the canvas, later inputs on
top). Export each fragment on its own. In the original the drawers run off the bottom edge; keep
them whole unless the user asks.

### focus-closeup · crops (only on request)
**Ref:** document version history (`focus-closeup-1.png`).
**Looks like:** a close-up of one control (toolbar and its dropdown) on a white card; the control
stays sharp and the rest of the screen is blurred, on lavender.
**Use for:** one small interaction the caption is about: a dropdown, a menu, a version list.
**Tune:** `focusBlur: {x, y, w, h}` = the control on the screenshot; `focus` = the control's centre
in the composition, `zoom` about 1.8–2.2. It cuts the top-left of the screen, so use it only when
the user asks for a close-up (`--allow-crop`).

### photo mockup (reference only)
**Ref:** a tablet held in two hands, cut out, on lavender (`photo-mockup-1.png`, the case cover).
**Looks like:** a photo of hands holding a tablet with the screen in perspective, the photo running
off the right edge, flat lavender behind.
**Use for:** a cover or hero that should feel real.
**How:** the renderer can't place a screen into a photo. Make it in Figma with a mockup plugin or
photo template, blur logos under NDA, and use the export as is. Offer this to the user instead of
faking it with a device frame.

## Building blocks for new presets
- **Frames** (`device`): `none`, `card`, `glass`, `browser`, `browser-dark`, `iphone`, `ipad`,
  `ipad-landscape`, `macbook`. Metal `frameColor`: silver, titanium, graphite, rose, gold,
  midnight.
- **Layouts:** `row` (with `widths`, `labels`, `stagger`, `fan`), `grid`, `masonry` (`flow`:
  columns or rows, `repeat`, `perColumn`), `overlap`, `free` (`positions`).
- **Effects:** `stack`, `depth`, `tilt`, `rotate`, `zoom` + `focus`, `callout`, `annotations`,
  `focusBlur`, `glow`, `grain`, `pattern`, `logo`.
- **Colours:** `auto`, `auto-light`, `auto-soft`, `auto-muted`, `auto-accent`, `auto-dark`,
  `auto-aurora`, plus `accent` to set the brand colour.

See `references/options.md` for every option.
