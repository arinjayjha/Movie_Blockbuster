const alert = require('alert');
const mongoose = require('mongoose');
const express = require('express');
var bodyParser = require('body-parser');
const { exec } = require('child_process');
const app = express();
app.use(express.json());
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

mongoose.connect('mongodb+srv://arinjayjh12:40SvXy9HtySbgunU@cluster0.yliez4n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => console.log("Error Connecting to Database"))
db.once('open', () => console.log("Connected to Database"));

const sch = new mongoose.Schema({ email: String, username: String, password: String });
const UserData = mongoose.model("UserData", sch);

var DATA = '';

app.put('/putRequest', async (req, res) => {
	var data = {
		"email": req.body.email,
		"username": req.body.username,
		"password": req.body.password
	}
	DATA = new UserData(data);
	output = await DATA.save();
	res.send("/putData");
});

app.put('/checkRequest', (req, res) => {
	var val = {
		"username": req.body.username,
		"password": req.body.password
	}

	UserData.find({ "username": val.username }).then(data => {
		const validate = data[0];

		if (validate)
			if (validate.password != val.password) {
				invalidPassword();
			}
			else {
				successfulLogin();
			}
		else {
			invalidUsername();
		}
	}).catch((err) => {
		console.log(err);
	})
});

function invalidPassword() {
	alert('Invalid Password!');
}

function invalidUsername() {
	alert('Invalid Username');
}

async function successfulLogin() {
	exec('start public/home.html');
}

app.listen(9000, () => {
	console.log("Connected to Server");
});