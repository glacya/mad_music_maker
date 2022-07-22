import express from 'express';
import mysql from 'mysql2';
import fs from 'fs';
import util from 'util';
import child_process from 'child_process';
import { hash_password, verify } from './login/encrypt.js';
import path from 'path';

const __dirname = path.resolve();

// Execute shell command.
// example:
// const { stdout, stderr } = await exec('ls -a')
const exec = util.promisify(child_process.exec);

// Wrapper of console.log() function with time.
const debug = function(str) {
    var time = new Date();
    var t = time.toLocaleString();
    console.log(t + ": " + str);
}

const port = process.env.port || 443;
const app = express();
const conf = JSON.parse(fs.readFileSync('conf.json'));

app.use(express.json());

const connection = mysql.createConnection({
    host : conf.host,
    user : conf.user,
    password : conf.password,
    database : conf.database
});

connection.connect();

app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "test.html"));
});

app.post("/login", (req, res) => {
    const id = req.body.id;
    const pw = req.body.pw;

    debug(`POST /login\t${id}, ${pw}`);
    if (id != undefined && pw != undefined) {
        connection.query('select pw, salt from users where id=?', [id], async (error, rows, field) => {
            if (error) {
                // Query error.
                debug("Login failed due to query error.");
                debug(error.message);
                res.status(400).send(error.message);
            }
            else if (rows.length == 0) {
                debug("There is no such user, or password is incorrect.");
                res.status(400).send("There is no such user, or password is incorrect.");
            }
            else {
                const user_info = rows[0];
                if (await verify(pw, user_info.salt, user_info.pw)) {
                    debug("Login success.");
                    res.status(200).send("Login succeeded.");
                }
                else {
                    debug("There is no such user, or password is incorrect.");
                    res.status(400).send("There is no such user, or password is incorrect.");
                }
            }
        });
    }
    else {
        res.status(400).send("Bad request body; you must include id and pw.");
    }
});

app.post("/register", (req, res) => {
    const id = req.body.id;
    const pw = req.body.pw;
    const username = req.body.username;
    debug(`POST /register\t${id}, ${pw}, ${username}`);

    if (id !== undefined && pw !== undefined && username !== undefined) {
        connection.query('select id from users where id=?', [id], async (error, rows, field) => {
            if (error) {
                // Query error.
                debug("Register failed due to query error 1");
                debug(error.message);
                res.status(400).send(error.message);
            }
            else if (rows.length > 0) {
                debug(`User ID ${id} already exists.`);
                res.status(400).send("The ID already exists.");
            }
            else {
                debug("OK, you can use this id..");
                const hashed_pw = await hash_password(pw);
                connection.query('insert into users(id, pw, username, salt) values(?, ?, ?, ?)', [id, hashed_pw.hashed_pw, username, hashed_pw.salt], (error, rows, field) => {
                    if (error) {
                        // Query error again..
                        debug("Register failed due to query error 2");
                        debug(error.message);
                        res.status(400).send(error.message);
                    }
                    else {
                        debug(`User ${id}, ${username} successfully registered.`);
                        // Redirect to login page.
                        res.status(200).send("Register succeeded.");
                    }
                })
            }
        })
    }
    else {
        res.status(400).send("Bad request body; you must include id, pw, and username.");
    }
});

// Send audio for playtesting.
app.post('/audio_playtest', (req, res) => {
    debug("POST /audio_playtest");
    // TODO
});

// Upload audio.
app.post('/audio_upload', (req, res) => {
    debug("POST /audio_upload");
    // TODO
});

app.listen(port, () => {
    console.log("<> Server start. Running on port " + port);
});