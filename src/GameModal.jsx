import { useEffect, useState } from 'react';

function GameModal({ game, onClose, onUpdateGame }) {
  if (!game) return null; //If nothing is selected, show nothing

  const [isEditing, setIsEditing] = useState(false);

  // local form state (editable fields)
  const [title, setTitle] = useState("");
  const [score1, setScore1] = useState("");
  const [score2, setScore2] = useState("");
  const [status, setStatus] = useState("");
  const [platform, setPlatform] = useState("");
  const [comments, setComments] = useState("");

  // When a new game is selected, load it into the form fields
  useEffect(() => {
    setIsEditing(false);
    setTitle(game.title || "");
    setScore1(game.score1 || "");
    setScore2(game.score2 || "");
    setStatus(game.status || "");
    setPlatform(game.platform || "");
    setComments(game.comments || "");
  }, [game]);

  function handleSave() {
    const confirmed = window.confirm("Save changes to this game?");
    if (!confirmed) return;

    const updatedGame = {
      ...game, // keeps gameID + fields you aren't editing
      title,
      score1,
      score2,
      status,
      platform,
      comments,
    };

    onUpdateGame(updatedGame);
    setIsEditing(false);
  }

  function handleScore2Change(e) {
    const value = e.target.value;
    setScore2(value);

    if (value === "0" || value === "100") {
        setScore1("");
    }
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button onClick={onClose}>Close</button>

        {!isEditing ? (
          <>
            <h2>{game.title}</h2>
            <p>Score: {game.score1 ? `${game.score1}` : ""} {game.score2}</p>
            <p>Status: {game.status}</p>
            <p>Platform: {game.platform}</p>
            <p>Start Date: {game.start_date}</p>
            <p>Finish Date: {game.finish_date}</p>
            <p>Comments: {game.comments}</p>
            <p>Date Added: {game.date_added}</p>

            <button onClick={() => setIsEditing(true)}>Edit</button>
          </>
        ) : (
          <>
            <h2>Edit Game</h2>

            <input
                type="text"
                placeholder="Game Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
            />

            <input
                type="text"
                placeholder="Platform (e.g. PS5)"
                value={platform}
                onChange={e => setPlatform(e.target.value)}
                required
            />

            <select value={status} onChange={e => setStatus(e.target.value)}>
                <option value="Backlog">Backlog</option>
                <option value="Currently Playing">Currently Playing</option>
                <option value="Played">Played</option>
                <option value="Dropped">Dropped</option>
            </select>

            <select value={score1} onChange={e => setScore1(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Mid">Mid</option>
                <option value="High">High</option>
            </select>

            <select value={score2} onChange={handleScore2Change}>
                <option value="0">0</option>
                <option value="10s">10s</option>
                <option value="20s">20s</option>
                <option value="30s">30s</option>
                <option value="40s">40s</option>
                <option value="50s">50s</option>
                <option value="60s">60s</option>
                <option value="70s">70s</option>
                <option value="80s">80s</option>
                <option value="90s">90s</option>
                <option value="100">100</option>
            </select>

            <input
                type="text"
                placeholder="Comments"
                value={comments}
                onChange={e => setComments(e.target.value)}
                required
            />

            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        )}

      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0, left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const modalStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  minWidth: "300px"
};

export default GameModal;
