# Compose options

Precedence: built-in defaults < preset (`--preset name`) < job / command-line options.
Sizes given as fractions (≤ 1) are relative to the canvas' shorter side (padding, gap) or to
the device width (radius), unless noted.

## Input and output
| Option | Default | Meaning |
|---|---|---|
| `input` | — | Screenshot path. Repeat `--input` or pass a list for several screens |
| `out` | — | Output PNG path (folders are created) |
| `size` | `1600x1200` | Canvas size `WxH` |
| `scale` | 1 | Pixel multiplier (2 = retina) |
| `clip` | — | ✂ Crop the source first (needs `allowCrop`): `{"x":0,"y":0,"w":1,"h":0.35}`, px or fractions of the source |
| `redact` | — | Blur regions for NDA: `[{"x":0.1,"y":0.2,"w":0.3,"h":0.05}]`, measured on the clipped image |
| `callout` | — | Lift a detail out, enlarged: `{"x":0,"y":0.3,"w":1,"h":0.25,"scale":1.12,"dx":-0.03,"dy":0,"screen":0}`. A list for several |
| `allowCrop` | false | `--allow-crop`. Without it, a shot where any screen runs off the canvas, is cut inside its frame or was clipped is **not saved**. Only when the user asked for a crop |
| `logo` | — | Brand mark in a corner: a path, or `{"src":"logo.svg","position":"bottom-left","height":0.035}` |

## Layout
| Option | Default | Meaning |
|---|---|---|
| `layout` | `row` | `row`: side by side. `grid`: columns of tiles. `masonry`: rotated columns that overflow. `overlap`: pages behind each other |
| `fit` | `contain` | Row only. `contain`: whole screenshot visible. `crop`: fills the area, cuts the bottom. `bleed`: anchored at the top and runs off the bottom edge |
| `crop` | `top` | Which part of a tall screenshot shows: `top`, `center`, `bottom` or 0..1. A list sets one value per screenshot |
| `padding` | 0.08 | Space around the content |
| `gap` | 0.04 | Space between screens |
| `stagger` | 0 | Row: shift every other screen up or down (fraction of height) |
| `fan` | 0 | Row: rotate screens like a fan. A number means max degrees at the ends; a list sets one per screen |
| `widths` | — | Row: relative widths, e.g. `[0.72, 0.28]` for desktop + mobile |
| `labels` | — | Row: a tag above each screen, e.g. `["Desktop","Mobile"]`, `["Before","After"]` |
| `align` | `center` | Row: `top`, `center`, `bottom` |
| `columns` | 3 | Grid/masonry columns |
| `colOffset` | preset | Grid/masonry: vertical shift per column in cell heights |
| `cellWidth` | 0.3 | Masonry: cell width as a fraction of canvas width |
| `cellAspect` | first image | Grid/masonry/overlap: tile width/height for card/glass/browser |
| `flow` | `columns` | Grid/masonry: `columns` (shifted up/down) or `rows` (shifted sideways, brick wall) |
| `repeat` | true | Masonry: repeat screens to fill the frame; `false` shows each once |
| `perColumn` | — | Masonry with `repeat:false`: screens per column, e.g. `[1, 2]` |
| `overlap` | `{dx:.4, dy:-.12, fade:.5}` | Overlap: shift of each next page (fractions of W/H) and fade of back pages |
| `zoom` / `focus` / `anchor` | 1 / centre / centre | ✂ Close-up (needs `allowCrop`): scale everything by `zoom` so point `focus` [0..1 of the composition] lands at `anchor` [0..1 of the canvas] |
| `rotate` | 0 (masonry −18) | Rotate the whole group, degrees |
| `tilt` | — | 3D tilt `{"rx":12,"ry":-18,"rz":4}` |
| `maxDeviceWidth` | — | Row: cap one screen's width |

## Frame
| Option | Default | Meaning |
|---|---|---|
| `device` | `browser` | `none`, `card`, `glass`, `browser`, `browser-dark`, `iphone`, `ipad`, `ipad-landscape`, `macbook` |
| `radius` | per device | Corner radius, px or fraction of device width |
| `border` | — | CSS border for card/browser |
| `url` | — | Address-bar text for `browser` |
| `frameColor` | per device | Body colour of phone, tablet or laptop, or a metal: `silver`, `titanium`, `graphite`, `rose`, `gold`, `midnight` (band + side buttons) |
| `island` | true | iPhone dynamic island |
| `stack` | 0 | 1–3 cards peeking out above (card/glass/browser, row layout) |
| `depth` / `depthColor` | 0 | Slab thickness of a card (px, or a fraction of width) and its edge colour |

## Colour and light
| Option | Default | Meaning |
|---|---|---|
| `background` | `#F2F2F0` | Any CSS background (colour, gradient), or `auto`, `auto-light`, `auto-soft`, `auto-muted`, `auto-accent`, `auto-dark`, `auto-aurora` |
| `bgImage` | — | Image file behind everything |
| `pattern` | — | Background pattern: `hex`, `dots`, `grid`, or `{"type":"hex","size":0.08,"opacity":0.4,"color":"#fff"}` |
| `grain` | 0 | Film grain 0–0.15 |
| `shadow` | `medium` | `none`, `soft`, `medium`, `deep`, `float`, `glow`, or a CSS box-shadow |
| `shadowColor` | `#0B0B14` | Shadow tint, or `auto` (from the accent; with `glow` it is the accent itself) |
| `accent` | detected | Brand colour (hex) that all `auto-*` colours are built from |
| `darkBg` | auto | Force dark styling for glass, stack and labels |

The `auto-*` colours come from the screenshots: the **average** colour and the dominant
saturated **accent**.
- `auto-light`: near-neutral light with a hint of the accent.
- `auto-soft`: a pastel of the accent.
- `auto-muted`: an earthy mid-tone of the page's own colour.
- `auto-accent`: the accent itself, loud.
- `auto-dark`: tinted near-black.
- `auto-aurora`: near-black with a glow of the accent rising from the bottom.

The accent is detected from saturated pixels. If the brand colour only appears in tiny
details (checkboxes, chips), or charts dominate, detection picks the wrong colour or none.
The script then prints a warning. Pass `--accent "#hex"`.

## Batch file
```json
[
  { "input": ["cover1.png", "cover2.png", "cover3.png"], "preset": "tilted-masonry", "out": "images/case/cover.png" },
  { "input": ["dash.png"], "preset": "muted-card", "device": "browser", "url": "app.acme.com", "out": "images/case/dashboard.png" }
]
```
Run it with `node scripts/compose.cjs --batch jobs.json --size 1600x1200`. Options on the
command line apply to every job unless the job sets its own.
