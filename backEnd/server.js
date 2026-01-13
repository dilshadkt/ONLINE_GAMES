const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://online-games-neon.vercel.app",
    methods: ["GET", "POST"]
  }
});

// Store active game rooms
const gameRooms = new Map();

// Game state structure
function createGameState() {
  return {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    players: {},
    winner: null,
    isDraw: false
  };
}

// Check for winner
function checkWinner(board) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  // Check for draw
  if (board.every(cell => cell !== null)) {
    return 'draw';
  }

  return null;
}

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join or create a game room
  socket.on('joinGame', ({ roomId, playerName }) => {
    let room = gameRooms.get(roomId);

    if (!room) {
      // Create new room
      room = createGameState();
      room.players.X = { id: socket.id, name: playerName };
      gameRooms.set(roomId, room);
      socket.join(roomId);
      socket.emit('playerAssigned', { symbol: 'X', room });
      console.log(`Room ${roomId} created by ${playerName}`);
    } else if (!room.players.O) {
      // Join existing room as player O
      room.players.O = { id: socket.id, name: playerName };
      socket.join(roomId);
      socket.emit('playerAssigned', { symbol: 'O', room });
      io.to(roomId).emit('gameStart', room);
      console.log(`${playerName} joined room ${roomId}`);
    } else {
      // Room is full
      socket.emit('roomFull');
      console.log(`Room ${roomId} is full`);
    }
  });

  // Handle player moves
  socket.on('makeMove', ({ roomId, index }) => {
    const room = gameRooms.get(roomId);
    if (!room) return;

    // Validate move
    const playerSymbol = room.players.X?.id === socket.id ? 'X' : 'O';
    if (room.currentPlayer !== playerSymbol || room.board[index] !== null) {
      return;
    }

    // Make the move
    room.board[index] = playerSymbol;

    // Check for winner
    const result = checkWinner(room.board);
    if (result === 'draw') {
      room.isDraw = true;
    } else if (result) {
      room.winner = result;
    }

    // Switch player
    room.currentPlayer = room.currentPlayer === 'X' ? 'O' : 'X';

    // Broadcast updated game state
    io.to(roomId).emit('gameUpdate', room);
  });

  // Reset game
  socket.on('resetGame', ({ roomId }) => {
    const room = gameRooms.get(roomId);
    if (!room) return;

    room.board = Array(9).fill(null);
    room.currentPlayer = 'X';
    room.winner = null;
    room.isDraw = false;

    io.to(roomId).emit('gameUpdate', room);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);

    // Remove player from any rooms
    for (let [roomId, room] of gameRooms.entries()) {
      if (room.players.X?.id === socket.id || room.players.O?.id === socket.id) {
        io.to(roomId).emit('playerLeft');
        gameRooms.delete(roomId);
        console.log(`Room ${roomId} deleted`);
      }
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
