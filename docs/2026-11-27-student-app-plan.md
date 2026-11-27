# Student App — Plan

> Goal: companion app to the website — schedule, notice board, learning. Web first (PWA), Play Store later via wrap. No login/data collection in v1.

## Decisions (2026-11-27)
- MVP: read-only, no student accounts
- Content: `data/*.json` in repo, edited manually, redeploy to update
- Learning: structured lessons by grade (Qur'an, Arabic, duas, salah guide)
- Play Store: PWA wrapped with Capacitor/TWA — one codebase

## Architecture
- Same repo, `app/` folder. Stack: Vite + vanilla JS (or lightweight Preact if complexity grows — decide at build), `styles.css` reuses site greens/gold.
- PWA: `manifest.json` + service worker (offline cache of lessons/notices), installable.
- Data: `data/schedule.json`, `data/notices.json`, `data/lessons.json`. App fetches JSON, renders. No backend, no DB, no POPIA burden (no personal data).
- Hosting: GitHub Pages (same as site, subpath `/app/`).

## Data shapes
```json
// schedule.json: [{ "grade":"Grade 1-3", "day":"Saturday", "time":"09:00-11:00", "subject":"Qur'an & Arabic", "teacher":"TBC", "venue":"TBC" }]
// notices.json: [{ "id":"2026-01", "date":"2026-11-27", "title":"Enrolment open", "body":"...", "priority":"normal|important", "expires":"2026-12-31" }]
// lessons.json: [{ "id":"arabic-alphabet", "grade":"Grade 1-3", "subject":"Arabic", "title":"The Arabic Alphabet", "order":1, "body":"markdown/html", "audio":null }]
```

## Screens (v1)
1. **Home** — today/next class, latest notice, quick links
2. **Schedule** — timetable by grade filter
3. **Notices** — board, important pinned, expired hidden
4. **Learn** — subjects → lessons by grade, lesson reader, salah guide, duas
5. **About** — contact/enrol link back to website

## Roadmap
| Phase | Deliverable | Est. |
|---|---|---|
| 1. PWA MVP | 5 screens, JSON data, offline, install prompt, linked from website | 1–2 wks build |
| 2. Content | Seed real timetable, notices, ~10–15 starter lessons (needs client input) | With client |
| 3. v1.1 | On-device progress (localStorage ticks), quizzes/flashcards | Later |
| 4. Accounts phase | Firebase/Auth + teacher admin panel — only if needed | Separate spec |
| 5. Play Store | Capacitor wrap, icons/splash, Google Play account ($25 once-off), privacy policy page, POPIA/children's data review, closed test → production | 2–4 wks incl. review |

## Still needed from client
Real timetable, venue, teacher names, fees, term dates, lesson content/curriculum, logo, contact/WhatsApp number. Play Store: developer account holder, app name confirmation ("Abdul Hameed Madressa"?).

## Risks / notes
- JSON editing isn't teacher-friendly long-term → Phase 4 admin is the fix; Google Sheet is fallback.
- Play Store targets children/education → stricter Families policy; read-only/no-ads/no-tracking v1 simplifies approval.
- Apple App Store out of scope (PWA works on iOS via Safari "Add to Home Screen").

## Next step
Approve plan → build Phase 1 scaffold in `app/`.
