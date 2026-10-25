# SmartFind – Client

React + TypeScript + Vite client for the SmartFind lost & found system.

## Local development

```bash
npm install
cp .env.example .env   # set VITE_API_URL to your server, e.g. http://localhost:3000/api
npm run dev
```

| Script            | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start the dev server                |
| `npm run build`   | Type-check and build into `dist/`   |
| `npm run preview` | Serve the production build locally  |
| `npm run lint`    | Run ESLint                          |

## Environment variables

| Name           | Description                                              |
| -------------- | -------------------------------------------------------- |
| `VITE_API_URL` | Base URL of the server API, including `/api` at the end  |

`VITE_*` variables are embedded into the bundle **at build time** – after changing one, rebuild / redeploy.

## Deploying to Render (Static Site)

1. Push this repository to GitHub/GitLab and create a new **Static Site** in Render.
2. Settings:
   - **Build Command:** `npm ci && npm run build`
   - **Publish Directory:** `dist`
3. Environment variables:
   - `VITE_API_URL` = `https://<your-server>.onrender.com/api`
   - `NODE_VERSION` = `22`
4. **Redirects/Rewrites** (required for client-side routing, otherwise refreshing a page returns 404):
   - Source: `/*` → Destination: `/index.html` → Action: **Rewrite**
5. On the server, allow the client's Render URL in the CORS configuration.

> On Render's free plan the server sleeps when idle, so the first request may take 30–50 seconds.
