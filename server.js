const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'anshum1234',
    database: 'ludo_junction',
    port: 3306
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get(`/register`, async (req, res) => {
    try {
        const connection = await pool.getConnection();
        
        const email = req.query.email;
        const otp = Math.floor(100000 + Math.random() * 900000);

        await connection.query('CALL register(?, ?)', [email, otp]);

        connection.release();

        res.status(200).json({ otp: otp });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get(`/login`, async (req, res) => {
    try {
        const connection = await pool.getConnection();
        
        const email = req.query.email;
        const otp = Math.floor(100000 + Math.random() * 900000);

        await connection.query('CALL login(?, ?)', [email, otp]);

        connection.release();

        res.status(200).json({ otp: otp });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

const port = 3003;
app.listen(port, () => {
    console.log(`Your server is listening at ${port}`);
});
