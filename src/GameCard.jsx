function GameCard({ game, onSelectGame, index, onDeleteGame }) {
    return (
        <div className="game-card-row">
            {/* index / # */}
            <span>{index}</span>

            {/* image */}
            <span>No Image</span>

            {/* title – when clicked, open modal */}
            <span onClick={() => onSelectGame(game)}>
                {game.title}
            </span>

            {/* score, status, platform */}
            <span>{game.score1} {game.score2}</span>
            <span>{game.status}</span>
            <span>{game.platform}</span>

            {/* DELETE BUTTON */}
            <button
                onClick={() => {
                    const confirmed = window.confirm(
                    "Are you sure you want to delete this game?"
                    );
                    if (confirmed) onDeleteGame(game.gameID);
                }}
                >
                Delete
            </button>
        </div>
    );
}

export default GameCard;