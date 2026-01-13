# TicTac Multiplayer 🎮

A real-time multiplayer Tic-Tac-Toe game built with **Socket.io** for the backend and **Vite (React)** for the frontend. Play with friends anywhere in the world!

![Game Preview](https://img.shields.io/badge/Status-Live-success)
![React](https://img.shields.io/badge/React-18.x-blue)
![Socket.io](https://img.shields.io/badge/Socket.io-4.x-green)

## ✨ Features

- 🎮 **Real-time Gameplay** - Instant move synchronization using WebSockets
- 🌐 **Play with Anyone** - Share a room ID to play with friends
- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 🎨 **Premium Design** - Modern glassmorphism UI with smooth animations
- 📱 **Responsive** - Works seamlessly on desktop and mobile devices
- 🔄 **Game Reset** - Start a new game anytime
- 👥 **Player Tracking** - See who's playing and whose turn it is

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd TickTack
   ```

2. **Install backend dependencies**
   ```bash
   cd backEnd
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontEnd
   npm install
   ```

### Running the Application

You need to run both the backend and frontend servers:

1. **Start the backend server** (Terminal 1)
   ```bash
   cd backEnd
   npm run dev
   ```
   The server will start on `http://localhost:3001`

2. **Start the frontend** (Terminal 2)
   ```bash
   cd frontEnd
   npm run dev
   ```
   The app will open at `http://localhost:5173`

## 🎯 How to Play

1. **Enter Your Name** - Type your player name
2. **Create/Join a Room** - Enter a room ID (create a new one or use an existing one)
3. **Share the Room ID** - Send the room ID to your friend
4. **Start Playing** - Once both players join, the game begins!
5. **Take Turns** - Click on empty cells to make your move
6. **Win or Draw** - First to get three in a row wins!
7. **Play Again** - Click "New Game" to reset the board

## 🏗️ Project Structure

```
TickTack/
├── backEnd/
│   ├── server.js          # Socket.io server with game logic
│   ├── package.json       # Backend dependencies
│   └── node_modules/
├── frontEnd/
│   ├── src/
│   │   ├── components/
│   │   │   ├── GameBoard.jsx    # Main game component
│   │   │   └── GameBoard.css    # Game styles
│   │   ├── App.jsx              # Root component
│   │   ├── App.css              # App styles
│   │   ├── index.css            # Global design system
│   │   └── main.jsx             # Entry point
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
└── README.md
```

## 🛠️ Technology Stack

### Backend
- **Express.js** - Web server framework
- **Socket.io** - Real-time bidirectional communication
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Socket.io Client** - WebSocket client
- **CSS3** - Modern styling with animations

## 🎨 Design System

The application features a premium design system with:

- **Dark Theme** - Easy on the eyes with vibrant accents
- **Glassmorphism** - Modern frosted glass effects
- **Gradient Accents** - Purple, pink, and cyan gradients
- **Smooth Animations** - Fade-in, scale, and pulse effects
- **Responsive Layout** - Mobile-first design approach
- **Custom Typography** - Inter font family

## 🔧 Configuration

### Backend Port
Default: `3001`

To change the port, modify `server.js`:
```javascript
const PORT = process.env.PORT || 3001;
```

### Frontend Socket Connection
The frontend connects to `http://localhost:3001` by default.

To change this, modify `GameBoard.jsx`:
```javascript
const socket = io('http://localhost:3001');
```

## 🎮 Game Logic

### Win Conditions
- Three in a row horizontally
- Three in a row vertically
- Three in a row diagonally

### Draw Condition
- All 9 cells filled with no winner

### Turn System
- Player X always starts
- Players alternate turns
- Only the current player can make a move

## 📝 API Events

### Client → Server
- `joinGame` - Join or create a game room
- `makeMove` - Make a move on the board
- `resetGame` - Reset the game board

### Server → Client
- `playerAssigned` - Assign player symbol (X or O)
- `gameStart` - Both players joined, game starts
- `gameUpdate` - Board state updated
- `roomFull` - Room already has 2 players
- `playerLeft` - Opponent disconnected

## 🐛 Troubleshooting

### Port Already in Use
If you get a port conflict error:
- Change the backend port in `server.js`
- Update the socket URL in `GameBoard.jsx`

### Connection Issues
- Ensure both backend and frontend are running
- Check that no firewall is blocking the connection
- Verify the socket URL matches the backend port

### Game Not Updating
- Refresh both browser windows
- Check the browser console for errors
- Ensure both players are in the same room

## 🚀 Deployment

### Backend
Deploy to services like:
- Heroku
- Railway
- Render
- DigitalOcean

### Frontend
Deploy to services like:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

**Important:** Update the socket connection URL in production!

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Built with ❤️ using Socket.io and Vite

---

**Enjoy playing TicTac Multiplayer!** 🎉
