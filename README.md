# LinkAuth Portal — Frontend

Next.js frontend with LinkedIn OAuth login and Redux state management.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **Redux Toolkit** — Auth state management
- **react-redux** — React bindings for Redux

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── auth-success/
│   │   │   └── page.jsx        # Parses user from URL, stores in Redux, redirects home
│   │   ├── login/
│   │   │   └── page.jsx        # Login page with LinkedIn button
│   │   ├── globals.css         # Global styles + Tailwind
│   │   ├── layout.jsx          # Root layout with StoreProvider
│   │   ├── page.jsx            # Home page
│   │   └── StoreProvider.jsx   # Wraps app with Redux Provider
│   ├── components/
│   │   └── UserSection.jsx     # Shows login button or user profile card
│   └── store/
│       ├── authSlice.js        # Redux slice — setUser / clearUser
│       └── index.js            # Redux store config
├── .env.local                  # Environment variables (not committed)
├── next.config.mjs
└── package.json
```

## Setup

```bash
npm install
```

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5001
```

## Run

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

## Auth Flow

```
1. User visits / — sees "Log in" button
2. Clicks "Log in" → goes to /login
3. Clicks "Continue with LinkedIn"
4. Redirected to backend /auth/linkedin
5. Backend handles OAuth with LinkedIn
6. LinkedIn redirects back to backend callback
7. Backend redirects to /auth-success?user=<encoded-json>
8. auth-success page parses user, dispatches setUser to Redux
9. Redirects to / — profile card shown
10. User clicks "Log out" → clearUser dispatched → back to login button
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — shows login button or profile card |
| `/login` | LinkedIn login button |
| `/auth-success` | Handles OAuth callback, stores user in Redux |

## Redux State

```js
// state.auth
{
  user: null | {
    name: "John Doe",
    email: "john@example.com",
    picture: "https://..."
  }
}
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_BACKEND_URL` | Backend base URL (no trailing slash) |

## Deployment (Vercel)

- Connect GitHub repo to Vercel
- Set environment variable: `NEXT_PUBLIC_BACKEND_URL=https://linkauth-portal-backend.onrender.com`
- Deploy automatically on push to `main`

Live URL: `https://link-auth-portal-frontend.vercel.app`
