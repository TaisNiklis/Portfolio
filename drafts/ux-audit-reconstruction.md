# UX audit — reconstruction from the board screenshots

Source: screenshots and sticky notes on the project FigJam board (24 sections, ~65 unique screens reviewed).
Items marked **[board]** are the 17 issues documented on the board during the project.
All other items come from a re-review of the same screenshots and were **not** part of the original audit document.

Severity: Blocker · Critical · High · Medium · Low

## Summary

| Group | Total | Blocker | Critical | High | Medium | Low |
|---|---|---|---|---|---|---|
| Usability heuristics | 26 | 1 | 2 | 8 | 13 | 2 |
| Visual hierarchy & layout | 22 | – | – | 6 | 11 | 5 |
| Consistency | 14 | – | – | 2 | 6 | 6 |
| **Total** | **62** | **1** | **2** | **16** | **30** | **13** |

Of these, 17 are **[board]** items and 45 are new.

---

## 1. Usability heuristics (26)

### Visibility of system status (5)
1. **[board] Medium** — Competitive Analysis: "Preparing AI Insights…" has no time estimate or progress.
2. **[board] Medium** — Audience Personas: no progress feedback during "Re-generate".
3. **[board] Medium** — Cookieless Targeting: loading spinner lives only inside the "Get results" button; scrolling up hides it.
4. **Medium** — Home shows "Start where you left off: Planner Agent, Today 16:50", while the chat says "You have no chat history".
5. **Medium** — Empty data blocks render as full sections (No trend data, 0 creatives, a table header with no rows, 0.0% paid positions) without saying why or what to do.

### Match between system and the real world (6)
6. **High** — AI suggestions look irrelevant: suggested competitors for a Ukrainian retailer include .ru, .pl, .de and US stores; "organic competitors" include an airline-tracking site. This undermines trust in the research.
7. **Medium** — AI output contradicts the input: the persona brief says "28", the result says "30-year-old, 25–34"; generated keywords are glued together ("accountrecovery", "hiddenfees").
8. **Medium** — Jargon with no explanation: Accountability score, Attention score B+, Eff. IVT, SE keywords, "seed", A+ badges.
9. **Medium** — Number formats that can't be read: "1,346,438.07M" requests; "Avails (Requests)" shown in dollars.
10. **Low** — System identifiers shown to users: "Company_Demo_Clean", "Hello, demo_clean!".
11. **Low** — Planning form labels don't match their content: "Budget type" holds a currency; "Frequency per month" for a 2-week campaign; ZIP example "0039" for the US.

### User control and freedom (3)
12. **[board] Critical** — Competitive Analysis: switching to another section wipes the results.
13. **[board] Critical** — Cookieless Targeting: refreshing the page wipes the results.
14. **[board] High** — AI Audience Segments: the input is locked during a search; no way to cancel or edit.

### Error prevention (5)
15. **[board] Medium** — Login: after toggling the login type back and forth, the Sign in button and inputs stay inactive.
16. **[board] High** — Audience Personas: no character limit shown upfront; the user finds out only after "Run analysis".
17. **[board] Medium** — AI Audience Segments: search runs on an empty input and returns an error.
18. **High** — Advanced Planning: an invalid ZIP is accepted in the field; the error appears only after submit, at the bottom, while the field sits in a collapsed panel.
19. **Medium** — Delete plan dialog doesn't name the plan or explain what is lost; delete and edit are icon-only.

### Recognition rather than recall (1)
20. **High** — AI chat opens empty: no example prompts or quick actions, so users must already know what to ask.

### Flexibility and efficiency (1)
21. **[board] High** — AI Audience Segments: no export for selected segments, although rows can be selected.

### Help users recover from errors (2)
22. **[board] Blocker** — Cookieless Targeting: "Save" fails with a generic "Unexpected error".
23. **High** — Audience Personas: the validation error appears in Ukrainian ("розмір має бути між 0 та 1000") in an English UI, as a raw technical message, shown twice.

### Help and documentation (2)
24. **Medium** — Locked AI agents show a lock icon with no reason and no way to unlock.
25. **Medium** — Help is hidden behind unlabeled "?" and headset icons; the FAQ is a long generic list, not tied to the current page.

### Privacy and trust (1)
26. **High** — Cookieless Targeting list shows other users' email addresses, including personal ones, to a client account.

---

## 2. Visual hierarchy & layout (22)

### Information architecture (3)
27. **High** — Reports live in two places: MMM, Path to Conversion and Brand Study are in the sidebar **and** as tabs inside a campaign. Campaigns sit under "Optimization & Reporting".
28. **High** — "Create new" on Campaigns opens three planner options; "Advanced Planner" takes the user out of Campaigns into a separate section.
29. **Medium** — Home empty state: "0" and "$0" with no next step; the main button is "All Campaigns", which leads to an empty list.

### Layout and overlap (7)
30. **[board] High** — Sidebar overflows on 13" laptops; Brand Study and Users fall out of view.
31. **[board] High** — Home quick-action cards are cut off below the fold on smaller screens.
32. **[board] High** — Cookieless Targeting: text overlaps and bleeds out of the input summary cards.
33. **High** — The floating "AI Agent" tab covers content on every screen (cards, form fields, the email field) and collides with the sticky "Submit for Human Review" button.
34. **Medium** — On long pages the sidebar background ends mid-page and items detach from it.
35. **Medium** — Scroll inside scroll: three scrollable tables on Segments, "Scroll for more" tables, horizontal-scroll tables in Cookieless and Path to Conversion.
36. **[board] Medium** — Advanced Planning: header, breadcrumb and back link stack up and push content down.

### Priority of actions and content (5)
37. **[board] Medium** — Advanced Planning: Submit, Save and Download sit at the very bottom of a long page.
38. **Medium** — Home: the AI Agent block with grey placeholder tiles ("P", "A", "C") dominates; agents repeat in "Elevate, in few clicks" (Audience Personas appears twice).
39. **Medium** — Personas: 20+ filter chips, excluded values shown as pink strike-through text.
40. **Low** — Campaign dashboard: a "Your Best Campaign Yet" banner takes the prime spot above KPIs.
41. **Low** — Two primary buttons compete on one screen (Settings: "Change Password" and "Save changes"; Login: gradient "Sign in" and solid "Continue with Google").

### Readability (7)
42. **[board] Medium** — Personas: placeholder contrast 1.83:1 (WCAG AA needs 4.5:1).
43. **Medium** — Low contrast elsewhere: text over the dark forecast gradient, tiny KPI delta chips, greyed locked cards, micro table labels.
44. **Medium** — Labels truncated despite free space: sidebar items, campaign dates and description, audience names, chips ("Not a pare…").
45. **Medium** — Charts for single values: pie at 100% female, donut at 100% single, bar at 100% full-time, one-channel breakdown; rainbow colours that encode nothing.
46. **Low** — Chart labels overlap on the positioning map and axes.
47. **Low** — Duplicate headings: "Start where you left off" twice; "Settings" twice while the top bar title is empty.
48. **Low** — AI chat: narrow message column with a large empty area; two exits (back arrow and "Exit").

---

## 3. Consistency (14)

### Terminology (3)
49. **High** — One feature, many names: Competitive / Competitive Analysis / Competitive Analysis Agent; Audience Segments / AI Audience Segments / AI Audience Search; Advanced Planning / Advanced Planner / Planner Agent / Planning AI Agent / AI Planner.
50. **Medium** — Spelling variants: Marketing Mix Modelling / Media Mix Modeling / Marketing Mix Modeling; company name written three ways.
51. **Low** — Typos: "New Taregting", "for you campaign", "Advertisers Website".

### Components and patterns (8)
52. **High** — Three AI entry points with different names and looks: floating "AI Agent" tab, "Start Chat" button, "AI Assistant (BETA)" tab in reporting.
53. **Medium** — Action labels differ for the same action: Run analysis / Run Analysis / Search / Get results; Create new / Create New / Create Plan; Change Password / Change password.
54. **Medium** — The same "Input Audience Description" field is multi-line in Personas and single-line in Segments, where pasted text loses its line breaks.
55. **Medium** — Two forms for the same campaign data behave differently (Advanced Planning vs Submit Campaign Brief: single vs multi-select goal, currency dropdown vs $ icon).
56. **Medium** — Colour semantics: "Finished" status in red; red delta chips for both good and bad changes.
57. **Medium** — Visual style drifts: AI agent cards look different on empty vs populated Home; charts use off-palette yellow, orange and black.
58. **Low** — Back navigation differs: back link + breadcrumb, arrow only, or none.
59. **Low** — Collapsible sections in Advanced Planning: some have chevrons, some don't; the first tactic panel has no title.

### States and formats (3)
60. **Low** — Empty states differ: illustration + CTA, illustration without CTA, or a generic "No data" icon.
61. **Low** — Date and number formats differ: 2026-06-17 / 01 Jan 2026 / Nov 01 2025; $80.0k / 100,000; "2 500k".
62. **Low** — Empty values shown as "---", "-" or blank.
