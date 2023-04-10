import express from "express";
import { PORT } from "./config.js";
import { pool } from "./db.js";

const app = express();

app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
});

app.use(express.json());

app.get("/api/quotes", async (req, res) => {
	const [rows] = await pool.query(`SELECT * FROM phrases`);
	const randomIndex = Math.floor(Math.random() * rows.length);
	const randomObject = rows[randomIndex];

	res.json(randomObject);
	console.log(randomObject);
});

app.listen(PORT);
console.log("Server listening in port: ", PORT);
