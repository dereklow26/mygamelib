import sqlite3 from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//DB file is created at server/games.db
const dbPath = path.join(__dirname, "games.db");
const db = new sqlite3.Database(dbPath);

//Create table if it doesn't exist yet
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS games (
            gameID INTEGER PRIMARY KEY AUTOINCREMENT,
            title VARCHAR,
            score1 VARCHAR,
            score2 VARCHAR,
            status VARCHAR,
            platform VARCHAR,
            start_date VARCHAR,
            finish_date VARCHAR,
            imageURL VARCHAR,
            comments VARCHAR,
            date_added VARCHAR
        )
    `);

    //Seed only if table is empty
    db.get("SELECT COUNT(*) AS count FROM games", (err,row) => {
        if (err) {
            console.error("Error checking games count: ", err);
            return;
        }

        if (row.count === 0) {
            console.log("Seeding initial games...");
            const stmt = db.prepare(`
                INSERT INTO games (
                title,score1,score2,status,platform,start_date,finish_date,imageURL,comments,date_added
                ) VALUES (?,?,?,?,?,?,?,?,?,?)
            `);

            stmt.run(
                "Pokemon Ultra Sun",
                "High",
                "80s",
                "Played",
                "Nintendo 3DS",
                "",
                "",
                "",
                "My first console game",
                "2024-12-29"
            );

            stmt.run(
                "Batman Arkham Asylum",
                "High",
                "70s",
                "Played",
                "PS4",
                "",
                "",
                "",
                "Start to a great franchise",
                "2024-12-29"
            );

            stmt.finalize();
        }
    })
})

export default db;
