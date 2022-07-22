import express from 'express';
import mysql from 'mysql2';
import fs from 'fs';
import util from 'util';
import child_process from 'child_process';

// Execute shell command.
// example:
// const { stdout, stderr } = await exec('ls -a')
const exec = util.promisify(child_process.exec);

const port = process.env.port || 80;
const app = express();
const conf = JSON.parse(fs.readFileSync('conf.json'));

const connection = mysql.createConnection({
    host : conf.host,
    user : conf.user,
    password : conf.password,
    database : conf.database
});

app.get("/", (req, res) => {
    res.status(500).send("lul");
})

app.listen(port, () => {
    console.log("<> Server start. Running on port " + port);
});