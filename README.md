# Havana Landing — Marketing + Web App Bridge

Frontend-only integration of the [Havana marketing website](https://github.com/hayys3849/Havana-marketing-website) and the [Havana Android app](https://github.com/AroneHaha/havana-proj-android) converted to a web experience.

## Structure

| Path | Purpose |
|------|---------|
| `marketing-webpage/` | Next.js marketing site (unchanged core UI) |
| `marketing-webpage/app/app/` | Converted Android web application (`/app`) |
| `marketing-webpage/components/bridge/` | Product-card modal + mock Google picker |
| `android/` | Reference Android source (not required to run the site) |

## User flow

1. Landing page — browse products (UI unchanged).
2. Click a product card → modal with two options only.
3. **Continue to Web App using Google** → mock account picker → `/app` home (in-memory session).
4. **Download Mobile App** → existing `/download` page.

## Web app screens (mirrors `MainActivity` / `HavanaApp`)

Login → Signup → Home → Product Details → Cart → Checkout → Map Picker → Order Confirmation → Orders → Order Details → Profile

- No backend, APIs, OAuth, or persistent storage.
- Cart, orders, and profile exist in memory for the session only.

## Run locally

```bash
cd marketing-webpage
npm install
npm run dev
```

- Marketing: http://localhost:3000  
- Web app (direct): http://localhost:3000/app  
- After mock Google: http://localhost:3000/app?from=google-mock → redirects to home

## Rules followed

- Marketing layout, styling, and animations were not redesigned.
- Only new marketing UI: product-entry modal system (+ mock Google overlay).
- No real authentication or user data persistence.
