import { useState } from "react";

function GameForm({ onAddGame }) {
    const [title, setTitle] = useState("");
    const [score1, setScore1] = useState("Low");
    const [score2, setScore2] = useState("0");
    const [status, setStatus] = useState("Backlog");
    const [platform, setPlatform] = useState("");
    const [comments, setComments] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to add this game?"
        );
        
        if (!confirmed) return;

        const newGame = {
            title,
            score1,
            score2,
            status,
            platform,
            start_date: "",
            finish_date: "",
            imageURL: "",
            comments,
            date_added: new Date().toISOString().slice(0,10), //"YYYY-MM-DD"
        };
        
        onAddGame(newGame);

        setTitle("");
        setPlatform("");
        setStatus("Backlog");
        setScore1("Low");
        setScore2("0");
        setComments("");
    }

    function handleScore2Change(e) {
        const value = e.target.value;
        setScore2(value);

        if (value === "0" || value === "100") {
            setScore1("");
        }
    }

    return (
        <form className="game-form" onSubmit={handleSubmit}>
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

            <button type="submit">Add Game</button>
        </form>
    )
}

export default GameForm;
