import express from "express";
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webbolt'
}).promise();

app.get('/tablets', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tablets');
        res.status(200).json(rows);
    } catch (error) {
        console.error(`Error retrieving tablets: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Tabletek listázása lapozással, kereséssel, rendezéssel
app.get('/pagetablets', async (req, res) => {
    try {
        const { page = 1, limit = 10, sortBy = 'name', order = 'asc', search = '' } = req.query;

        const offset = (page - 1) * limit;
        const sortOrder = order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

        const [rows] = await db.query(
            `SELECT * FROM tablets 
         WHERE name LIKE ? 
         ORDER BY ?? ${sortOrder} 
         LIMIT ? OFFSET ?`,
            [`%${search}%`, sortBy, parseInt(limit), parseInt(offset)]
        );

        const [countResult] = await db.query(
            `SELECT COUNT(*) AS total FROM tablets WHERE name LIKE ?`,
            [`%${search}%`]
        );

        res.status(200).json({
            tablets: rows,
            total: countResult[0].total,
            page: parseInt(page),
            limit: parseInt(limit),
        });
    } catch (error) {
        console.error('Error fetching tablets:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.get('/tablet/:id', async (req, res) => {
    try {
        const tabletId = parseInt(req.params.id);
        const [rows] = await db.query('SELECT * FROM tablets WHERE id = ?', [tabletId]);
        if (rows.length === 1) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ error: 'Tablet not found' });
        }
    } catch (error) {
        console.error(`Error retrieving tablet: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/tablets/expensive', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tablets ORDER BY price DESC LIMIT 3');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching expensive tablets:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/tablets/cheap', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tablets ORDER BY price ASC LIMIT 3');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching cheap tablets:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/tablets/popular', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tablets ORDER BY popularity DESC LIMIT 1');
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ error: "No popular tablet found" });
        }
    } catch (error) {
        console.error('Error fetching popular tablet:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post('/tablets', async (req, res) => {
    try {
        const { name, os, cpuSpeed, cores, screenSize, resolution, ram, price } = req.body;

        // Validációs ellenőrzések
        if (!name || !os || !cpuSpeed || !cores || !screenSize || !resolution || !ram || !price) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (isNaN(cpuSpeed) || isNaN(cores) || isNaN(price)) {
            return res.status(400).json({ error: "CPU speed, cores, and price must be numbers" });
        }

        const [result] = await db.query(
            'INSERT INTO tablets (name, os, cpuSpeed, cores, screenSize, resolution, ram, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [name, os, cpuSpeed, cores, screenSize, resolution, ram, price]
        );

        res.status(201).json({ message: 'Tablet successfully added!', tabletId: result.insertId });
    } catch (error) {
        console.error(`Error adding tablet: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete('/tablets/:id', async (req, res) => {
    try {
        const tabletId = parseInt(req.params.id);
        const [result] = await db.query('DELETE FROM tablets WHERE id = ?', [tabletId]);

        if (result.affectedRows === 0) {
            res.status(404).json({ error: "Tablet not found" });
        } else {
            res.status(200).json({ message: "Tablet successfully removed" });
        }
    } catch (error) {
        console.error(`Error deleting tablet: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put('/tablets/:id', async (req, res) => {
    try {
        const tabletId = parseInt(req.params.id);
        const { name, os, cpuSpeed, cores, screenSize, resolution, ram, price } = req.body;

        if (!name || !os || !cpuSpeed || !cores || !screenSize || !resolution || !ram || !price) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (isNaN(cpuSpeed) || isNaN(cores) || isNaN(price)) {
            return res.status(400).json({ error: "CPU speed, cores, and price must be numbers" });
        }

        const [result] = await db.query(
            'UPDATE tablets SET name = ?, os = ?, cpuSpeed = ?, cores = ?, screenSize = ?, resolution = ?, ram = ?, price = ? WHERE id = ?',
            [name, os, cpuSpeed, cores, screenSize, resolution, ram, price, tabletId]
        );

        if (result.affectedRows === 0) {
            res.status(404).json({ error: "Tablet not found" });
        } else {
            res.status(200).json({ message: "Tablet successfully updated" });
        }
    } catch (error) {
        console.error(`Error updating tablet: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});