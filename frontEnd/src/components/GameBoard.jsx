import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './GameBoard.css';

// Use environment variable for backend URL, fallback to localhost for development
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const socket = io(BACKEND_URL);

function GameBoard() {
    const [gameState, setGameState] = useState({
        board: Array(9).fill(null),
        currentPlayer: 'X',
        players: {},
        winner: null,
        isDraw: false
    });
    const [playerSymbol, setPlayerSymbol] = useState(null);
    const [roomId, setRoomId] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [isInGame, setIsInGame] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [isWaitingForOpponent, setIsWaitingForOpponent] = useState(false);

    useEffect(() => {
        socket.on('playerAssigned', ({ symbol, room }) => {
            setPlayerSymbol(symbol);
            setGameState(room);
            setIsInGame(true);
            if (!room.players.O) {
                setIsWaitingForOpponent(true);
                setStatusMessage('Waiting for opponent to join...');
            }
        });

        socket.on('gameStart', (room) => {
            setGameState(room);
            setIsWaitingForOpponent(false);
            setStatusMessage('Game started! Good luck!');
            setTimeout(() => setStatusMessage(''), 3000);
        });

        socket.on('gameUpdate', (room) => {
            setGameState(room);
        });

        socket.on('roomFull', () => {
            alert('Room is full! Please try a different room ID.');
        });

        socket.on('playerLeft', () => {
            setStatusMessage('Opponent left the game');
            setTimeout(() => {
                setIsInGame(false);
                setPlayerSymbol(null);
                setIsWaitingForOpponent(false);
            }, 2000);
        });

        return () => {
            socket.off('playerAssigned');
            socket.off('gameStart');
            socket.off('gameUpdate');
            socket.off('roomFull');
            socket.off('playerLeft');
        };
    }, []);

    const handleJoinGame = (e) => {
        e.preventDefault();
        if (roomId.trim() && playerName.trim()) {
            socket.emit('joinGame', { roomId, playerName });
        }
    };

    const handleCellClick = (index) => {
        if (
            gameState.board[index] === null &&
            gameState.currentPlayer === playerSymbol &&
            !gameState.winner &&
            !gameState.isDraw &&
            !isWaitingForOpponent
        ) {
            socket.emit('makeMove', { roomId, index });
        }
    };

    const handleReset = () => {
        socket.emit('resetGame', { roomId });
    };

    const getStatusText = () => {
        if (statusMessage) return statusMessage;
        if (isWaitingForOpponent) return 'Waiting for opponent...';
        if (gameState.isDraw) return "It's a draw!";
        if (gameState.winner) {
            return gameState.winner === playerSymbol ? 'You won! 🎉' : 'You lost! 😢';
        }
        if (gameState.currentPlayer === playerSymbol) {
            return 'Your turn';
        }
        return "Opponent's turn";
    };

    const getCellClass = (index) => {
        let classes = 'cell';
        if (gameState.board[index]) {
            classes += ` filled ${gameState.board[index].toLowerCase()}`;
        }
        if (
            !gameState.board[index] &&
            gameState.currentPlayer === playerSymbol &&
            !gameState.winner &&
            !gameState.isDraw &&
            !isWaitingForOpponent
        ) {
            classes += ' hoverable';
        }
        return classes;
    };

    if (!isInGame) {
        return (
            <div className="game-container fade-in">
                <div className="glass-card join-card">
                    <div className="logo-container mb-lg">
                        <div className="logo-icon">⚡</div>
                        <h1 className="game-title">TicTac Multiplayer</h1>
                        <p className="game-subtitle">Real-time Tic-Tac-Toe Battle</p>
                    </div>

                    <form onSubmit={handleJoinGame} className="join-form">
                        <div className="form-group mb-md">
                            <label htmlFor="playerName" className="form-label">Your Name</label>
                            <input
                                id="playerName"
                                type="text"
                                className="input"
                                placeholder="Enter your name"
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group mb-lg">
                            <label htmlFor="roomId" className="form-label">Room ID</label>
                            <input
                                id="roomId"
                                type="text"
                                className="input"
                                placeholder="Enter or create room ID"
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value)}
                                required
                            />
                            <p className="form-hint">Share this ID with your friend to play together</p>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">
                            Join Game
                        </button>
                    </form>

                    <div className="features mt-lg">
                        <div className="feature-item">
                            <span className="feature-icon">🎮</span>
                            <span className="feature-text">Real-time gameplay</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">🌐</span>
                            <span className="feature-text">Play with anyone</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">⚡</span>
                            <span className="feature-text">Lightning fast</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="game-container fade-in">
            <div className="glass-card game-card">
                <div className="game-layout">
                    {/* Left Side - Game Board */}
                    <div className="board-section">
                        <div className="board">
                            {gameState.board.map((cell, index) => (
                                <button
                                    key={index}
                                    className={getCellClass(index)}
                                    onClick={() => handleCellClick(index)}
                                    disabled={isWaitingForOpponent}
                                >
                                    {cell && <span className="cell-content scale-in">{cell}</span>}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Game Info & Controls */}
                    <div className="info-section">
                        <div className="game-header">
                            <h2 className="section-title">Players</h2>
                            <div className="player-info">
                                <div className={`player-badge ${playerSymbol === 'X' ? 'active' : ''}`}>
                                    <span className="player-symbol">X</span>
                                    <span className="player-name">{gameState.players.X?.name || 'Player 1'}</span>
                                </div>
                                <div className="vs-divider">VS</div>
                                <div className={`player-badge ${playerSymbol === 'O' ? 'active' : ''}`}>
                                    <span className="player-symbol">O</span>
                                    <span className="player-name">{gameState.players.O?.name || 'Waiting...'}</span>
                                </div>
                            </div>

                            <div className={`status-banner ${gameState.winner || gameState.isDraw ? 'game-over' : ''}`}>
                                {getStatusText()}
                            </div>
                        </div>

                        <div className="game-footer">
                            <button
                                className="btn btn-secondary btn-block"
                                onClick={handleReset}
                                disabled={isWaitingForOpponent}
                            >
                                New Game
                            </button>
                            <div className="room-info mt-md">
                                <span className="room-label">Room:</span>
                                <span className="room-id">{roomId}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameBoard;
