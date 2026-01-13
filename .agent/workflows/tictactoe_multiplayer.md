---
description: Set up a multiplayer Tic-Tac-Toe game with Vite front‑end and Socket.io back‑end
---

## Overview
We will create a simple Tic‑Tac‑Toe game that supports two players over the network using **Socket.io** for real‑time communication and **Vite** (React template) for a fast, modern front‑end.

## Steps
1. **Initialize backend**
   ```bash
   cd backEnd
   npm init -y
   ```
2. **Install backend dependencies**
   ```bash
   npm install express socket.io cors
   ```
3. **Create server file** (`backEnd/server.js`)
   - Set up an Express server with CORS.
   - Attach a Socket.io server.
   - Manage game rooms and broadcast moves.
4. **Initialize frontend with Vite (React)**
   ```bash
   cd ..
   npx -y create-vite@latest frontEnd --template react
   ```
5. **Install frontend dependencies**
   ```bash
   cd frontEnd
   npm install socket.io-client
   ```
6. **Create Tic‑Tac‑Toe React component** (`frontEnd/src/components/GameBoard.jsx`)
   - Render a 3×3 grid.
   - Connect to the Socket.io server.
   - Handle player turns, send/receive moves, and display the game status.
7. **Add dev scripts**
   - In `backEnd/package.json` add `"dev": "node server.js"`.
   - In `frontEnd/package.json` ensure `"dev": "vite"` (already present).
8. **Run the application**
   - Start backend: `cd backEnd && npm run dev`
   - Start frontend: `cd frontEnd && npm run dev`
   - Open two browser windows to `http://localhost:5173` and play!

## // turbo-all
All steps that involve `npm` commands are safe to auto‑run.
