const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3001;
const pathToDb = "src/Database/user-data.json";
const app = express();

var corsOptions = {
	origin: "http://localhost:3000",
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
	let content;
	fs.readFile(pathToDb, (err, data) => {
		if (err) throw err;
		content = JSON.parse(data);
		res.json(content);
	});
});

app.post("/new-user", (req, res) => {
	let dataArray;
	fs.readFile(pathToDb, (err, data) => {
		if (err) throw err;
		dataArray = JSON.parse(data);
		dataArray.push(req.body);
		const jsonData = JSON.stringify(dataArray);
		fs.writeFile(pathToDb, jsonData, "utf8", () => {
			console.log("New User Added!");
		});
	});

	res.json("success");
});

app.get("/edit-user", (req, res) => {
	let content;
	fs.readFile(pathToDb, (err, data) => {
		if (err) throw err;
		content = JSON.parse(data);
		res.json(content.filter((row) => row.id === req.headers.id));
	});
});

app.put("/edit-user", (req, res) => {
	let content;
	fs.readFile(pathToDb, (err, data) => {
		if (err) throw err;
		content = JSON.parse(data);

		let dataArray = content.map((rows) => {
			if (rows.userId !== req.headers.id) return rows;
			else return req.body;
		});

		fs.writeFile(pathToDb, JSON.stringify(dataArray), "utf8", (err) => {
			console.log("User Updated");
		});
	});
	res.json("updated");
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
