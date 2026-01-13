import GameCard from './GameCard';

function GameList({ games, onSelectGame, onDeleteGame }) {
    return (
        <div className="game-list">
            {/* Header row */}
            <div className="game-list-header">
                <span>#</span>
                <span>Image</span>
                <span>Game Title</span>
                <span>Score</span>
                <span>Status</span>
                <span>Platform</span>
            </div>

            {/* Data rows */}
            {games.map((game, index) => (
                <div key={game.gameID}>
                    <GameCard  
                        game={game} 
                        index={index+1}
                        onSelectGame={onSelectGame}
                        onDeleteGame={onDeleteGame}
                    />
                </div>
            ))}
        </div>
    );
}

export default GameList;