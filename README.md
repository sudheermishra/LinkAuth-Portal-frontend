# (Frontend)

Next.js app with LinkedIn sign-in and Redux auth state.

## Stack

- **Next.js 16** (App Router) · **React 19** · **Tailwind CSS 4** · **Redux Toolkit**

## Setup

```bash
npm install
```

Create a `.env` (or `.env.local`) with:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5001
```

The backend must be running (e.g. on port 5001) for LinkedIn login.

## Run

| Command      | Description        |
| ------------ | ------------------- |
| `npm run dev` | Dev server (default port 3000) |
| `npm run build` | Production build   |
| `npm run start` | Run production build |

## Auth flow

1. **Login** — User goes to `/login` and clicks “Continue with LinkedIn”. They are sent to the backend at `{BACKEND_URL}/auth/linkedin`.
2. **Callback** — Backend completes LinkedIn OAuth and redirects to `http://localhost:3000/auth-success?user=<encoded-user>`.
3. **Auth success** — The app parses `user` from the URL, saves it in Redux (`auth.user`), then redirects to `/`.
4. **Home** — If `auth.user` is set, the home page shows profile and a “Log out” button; otherwise it shows “Log in”.
5. **Logout** — Clears `auth.user` in Redux. No persistence: a full page reload resets auth.

## Project structure

- `src/app/` — Routes: `page.jsx` (home), `login/`, `auth-success/`, `layout.jsx`, `StoreProvider.jsx`
- `src/components/` — `UserSection.jsx` (home content: login link or user card + logout)
- `src/store/` — Redux: `index.js` (store), `authSlice.js` (user state, `setUser` / `clearUser`)

## Backend expectations

- **GET** `{BACKEND_URL}/auth/linkedin` — Redirects to LinkedIn, then back to backend callback (e.g. `/auth/linkedin/callback`), then redirects to frontend `http://localhost:3000/auth-success?user=<url-encoded-json>` with the user object in the `user` query param.
