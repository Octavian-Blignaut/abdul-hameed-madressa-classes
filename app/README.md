# Student App (PWA v1)
Read-only companion app: schedule, notices, lessons. No login, no tracking; progress stored on-device only.

## Update content
Edit `data/schedule.json`, `data/notices.json`, `data/lessons.json`, commit & push — live on redeploy. Notices auto-hide after `expires`.

## Run locally
`python3 -m http.server 8000` from repo root → http://localhost:8000/app/
(Service worker/PWA install requires http://localhost or HTTPS.)

## Later
Quizzes/progress (v1.1), accounts/admin, Play Store via Capacitor — see `../docs/2026-11-27-student-app-plan.md`.
