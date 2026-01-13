import { useEffect, useState } from 'react';
import '../App.css';
import GameList from './GameList.jsx';
import GameModal from  './GameModal.jsx';
import GameForm from './GameForm.jsx';


//Holds main data (list), holds UI state (sorting, filtering), decide which components appear, pass data down to
//child components
function App() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //Load games from backend on first render
  useEffect(() => {
    async function fetchGames() {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:4000/api/games");
        if (!res.ok) throw new Error("Failed to fetch games");
        const data = await res.json();
        setGames(data);
      } catch (err) {
        console.error(err);
        setError("Could not load games from server.");
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  async function handleAddGame(newGame) {
    try {
      const res = await fetch("http://localhost:4000/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGame),
      });

      if (!res.ok) throw new Error("Failed to save game");

      const savedGame = await res.json();
      setGames(prev => [...prev, savedGame]);
    } catch (err) {
      console.error(err);
      setError("Could not save game to server.");
    }
  }

  async function handleDeleteGame(id) {
    try {
      setError("");

      const res = await fetch(`http://localhost:4000/api/games/${id}`, {
        method: "DELETE",
      });

      console.log("DELETE status:", res.status);
      const bodyText = await res.text().catch(() => "");
      console.log("DELETE response body:", bodyText);

      if (!res.ok && res.status !== 204) {
        throw new Error(`Failed to delete game (status ${res.status})`);
      }

      setGames(prev => prev.filter(g => Number(g.gameID) !== Number(id)));
      if (selectedGame && selectedGame.gameID === id) {
        setSelectedGame(null);
      }
    } catch (err) {
      console.error("handleDeleteGame error:", err);
      setError("Could not delete game.");
    }
  }

  // UPDATE
  async function handleUpdateGame(updatedGame) {
    try {
      const res = await fetch(
        `http://localhost:4000/api/games/${updatedGame.gameID}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedGame),
        }
      );

      if (!res.ok) throw new Error("Failed to update game");

      const saved = await res.json();
      setGames(prev =>
        prev.map(g => (g.gameID === saved.gameID ? saved : g))
      );
      setSelectedGame(saved);
    } catch (err) {
      console.error(err);
      setError("Could not update game.");
    }
  }

  if (loading) return <div>Loading games…</div>;

  return (
    <div>
      <h1>My Games Library</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <GameForm onAddGame={handleAddGame} />

      <GameList games={games} onSelectGame={setSelectedGame} onDeleteGame={handleDeleteGame}/>

      <GameModal 
        game={selectedGame}
        onUpdateGame={handleUpdateGame}
        onClose={() => setSelectedGame(null)}
      />
    </div>
  )
}

export default App;
