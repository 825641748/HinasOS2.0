const express = require('express');
const CMD = require("./base/cmd.js");
const app = express();
// 用于解析JSON格式的请求体
app.use(express.json());

app.use(express.static('public')); // 用于提供静态文件的公共目录

app.get('/terminal', (req, res) => {
	res.sendFile(__dirname + '/public/terminal.html');
});

app.post('/terminal/exec', (req, res) => {
	const {
		command
	} = req.body;

	CMD(command).then(result => {
		res.header('Content-Type', 'application/json; charset=utf-8');
		res.send(result);
	})
});

app.listen(3000, () => {
	console.log('Terminal server is running on port 3000');
});