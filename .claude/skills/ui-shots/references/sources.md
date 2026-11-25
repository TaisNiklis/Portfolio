# Sources and sizes

## Screenshot of a URL
```bash
node scripts/capture.cjs --url https://site.com --out src/home.png            # 1440x900 viewport @2x
node scripts/capture.cjs --url https://site.com --out src/full.png --full     # whole page
node scripts/capture.cjs --url https://site.com --out src/hero.png --selector "section.hero"
node scripts/capture.cjs --url https://app.com --out src/m.png --mobile      # 390x844 phone
node scripts/capture.cjs --url https://site.com --out src/x.png --hide "#cookie, .intercom-launcher"
```
- `--dark` sets `prefers-color-scheme: dark`. `--wait 2000` helps for slow animations.
- Pages behind a login can't be captured this way. Ask the user for a screenshot.
- If the session's network blocks the host, say so and ask for a screenshot instead of
  guessing what the page looks like.

## Figma as the source
A link like `figma.com/design/<fileKey>/<name>?node-id=12-345` gives fileKey and nodeId
(`12-345` → `12:345`). Follow the Figma server's own rules (create a session first).
- `get_metadata` gives the node's name, type and size. Use it to tell a design from an
  empty slot.
- To get pixels, export the node (`download_assets`, or `get_screenshot` if that is what's
  available) at 2x and save it as a PNG.
- If the Figma tools aren't connected or can't write a file, ask the user to export the
  frame (Export → PNG → 2x) and attach it. Don't recreate the design from the code context.

## Figma as the target size
If the link points to an image slot in a layout (an empty frame or rectangle, often named
like "image", "cover", "mockup"), read its width and height with `get_metadata` and render
`--size <w>x<h> --scale 2`. The user then drops the PNG into that slot. Say which node you
measured.

## Site template as the target size
For "make it fit my case page":
```bash
node scripts/measure.cjs --url https://portfolio.com/cases/some-case --selector "article img, figure"
```
It prints the CSS size of each image slot at a 1440 viewport. Pick the slot the image is for
(cover vs. inline), then render at that size with `--scale 2`. If the template is local
(an Astro/Next project), you can also read the width from the component's CSS, e.g. a
`max-width` on the article column with an aspect-ratio on `<Figure>`.

## Sizes cheat sheet
| Target | Size |
|---|---|
| Dribbble shot | 1600×1200 (4:3), 2x of 800×600 |
| Behance project module | 1400 wide (any height), or 1920×1080 |
| Case cover / inline, no other hint | 1600×1200 |
| Instagram post | 1080×1350 |
| LinkedIn / OG image | 1200×627 / 1200×630 |
| Square | 1600×1600 |

`--size` is the visible size and `--scale 2` doubles the pixels for retina. Use scale 1 when
the user gives an exact pixel size, and scale 2 when the size came from CSS or Figma.
