# Business Nexus (Connect Entrepreneurs & Investors)

Business Nexus is a React + TypeScript web app (Vite) that provides dashboards, chat, and a **video calling section**. The current video calling feature is a **frontend mock UI** (no real WebRTC streaming yet).

---

## Live / Deployment
- See `vercel.json` for deployment configuration (if using Vercel).
- WebRTC real-time streaming is **not** implemented yet—this app is safe to run without camera/microphone permissions.

---

## Tech Stack
- React 18
- React Router
- TypeScript
- Tailwind CSS
- Vite
- ESLint (flat config)

---

## Features
- Auth pages (Login/Register/Forgot/Reset)
- Entrepreneur & Investor dashboards
- Messages/Chat
- Video Call UI (mock)
  - Start/End call buttons
  - Toggle video/audio
  - Call duration timer
  - Incoming call notification UI

---

## Prerequisites
- Node.js (LTS recommended)
- npm

---

## Getting Started

### 1) Install dependencies
```bash
npm install
```

### 2) Run dev server
```bash
npm run dev
```

Then open the local URL shown in the terminal (usually http://localhost:5173).

### 3) Build for production
```bash
npm run build
```

### 4) Preview production build
```bash
npm run preview
```

---

## Video Calling (Current State)
The video calling implementation is a **frontend-only mock UI**.

Route:
- `/videocall/:userId`

Key files:
- `src/context/VideoCallContext.tsx` (state + actions)
- `src/components/videocall/VideoCallModal.tsx` (main UI)
- `src/components/videocall/VideoCallControls.tsx` (toggle buttons + timer)
- `src/pages/videocall/VideoCallPage.tsx` (page)
- `src/hooks/useWebRTC.ts` (placeholder for real WebRTC)

Documentation:
- `VIDEO_CALLING_FEATURE.md`
- `WEBRTC_INTEGRATION_GUIDE.md`
- `ARCHITECTURE.md`

---

## Project Scripts
- `npm run dev` — start Vite dev server
- `npm run build` — build the app
- `npm run lint` — eslint
- `npm run preview` — preview production build

---

## Notes for GitHub Push / Collaboration
Commit your changes and push from the same repo folder that has the `.git` directory.

---

## Troubleshooting
- If the UI doesn’t load, check for import path errors and run:
  ```bash
  npm run lint
  npm run build
  ```
- For video call UI issues, open browser console errors.

---

## License
Add your project license if required.

