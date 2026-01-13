import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// GET /api/games - return all games
app.get("/api/games", (req, res) => {
  db.all("SELECT * FROM games ORDER BY gameID ASC", [], (err, rows) => {
    if (err) {
      console.error("Error fetching games:", err);
      return res.status(500).json({ error: "Failed to fetch games" });
    }
    res.json(rows);
  });
});

// POST /api/games - insert a new game
app.post("/api/games", (req, res) => {
  const {
      title,
      score1,
      score2,
      status,
      platform,
      start_date,
      finish_date,
      imageURL,
      comments,
      date_added,
  } = req.body;

  const sql = `
      INSERT INTO games (
          title,score1,score2,status,platform,start_date,finish_date,imageURL,comments,date_added
      ) VALUES (?,?,?,?,?,?,?,?,?,?)
  `;

  const params = [
      title,
      score1,
      score2,
      status,
      platform,
      start_date || "",
      finish_date || "",
      imageURL || "",
      comments || "",
      date_added,
  ];
    
  db.run(sql, params, function (err) {
    if (err) {
      console.error("Error inserting game:", err);
      return res.status(500).json({ error: "Failed to insert game" });
    }

    // this.lastID is the auto-generated gameID
    const newGame = {
      gameID: this.lastID,
      title,
      score1,
      score2,
      status,
      platform,
      start_date: start_date || "",
      finish_date: finish_date || "",
      imageURL: imageURL || "",
      comments: comments || "",
      date_added,
    };

    res.status(201).json(newGame);
  }
);
});

// DELETE /api/games/:id - delete a game by gameID
app.delete("/api/games/:id", (req, res) => {
  const id = req.params.id;

  db.run("DELETE FROM games WHERE gameID = ?", id, function (err) {
    if (err) {
      console.error("Error deleting game:", err);
      return res.status(500).json({ error: "Failed to delete game" });
    }

    if (this.changes === 0) {
      // no row with that id
      return res.status(404).json({ error: "Game not found" });
    }

    // deleted successfully
    res.status(204).end();
  });
});

// PUT /api/games/:id - update a game
app.put("/api/games/:id", (req, res) => {
  const id = req.params.id;

  const {
    title,
    score1,
    score2,
    status,
    platform,
    start_date,
    finish_date,
    imageURL,
    comments,
    date_added,
  } = req.body;

  const sql = `
    UPDATE games
    SET title = ?, score1 = ?, score2 = ?, status = ?, platform = ?,
        start_date = ?, finish_date = ?, imageURL = ?, comments = ?, date_added = ?
    WHERE gameID = ?
  `;

  const params = [
    title,
    score1,
    score2,
    status,
    platform,
    start_date || "",
    finish_date || "",
    imageURL || "",
    comments || "",
    date_added,
    id,
  ];

  db.run(sql, params, function (err) {
    if (err) {
      console.error("Error updating game:", err);
      return res.status(500).json({ error: "Failed to update game" });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Game not found" });
    }

    // Return the updated object
    res.json({
      gameID: Number(id),
      title,
      score1,
      score2,
      status,
      platform,
      start_date: start_date || "",
      finish_date: finish_date || "",
      imageURL: imageURL || "",
      comments,
      date_added,
    });
  });
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
