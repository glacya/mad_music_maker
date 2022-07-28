import express from 'express';
import mysql from 'mysql2';
import fs from 'fs';
import util from 'util';
import child_process from 'child_process';
import { hash_password, verify } from './encrypt.js';
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

// id for playtesting.
var playtest_id = 0;

// id for uploading.
var upload_id = 0;


app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "test.html"));
});

app.post("/api/login", (req, res) => {
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

app.post("/api/register", (req, res) => {
    const id = req.body.id;
    const pw = req.body.pw;
    debug(`POST /register\t${id}, ${pw}`);

    if (id !== undefined && pw !== undefined) {
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
                connection.query('insert into users(id, pw, salt) values(?, ?, ?)', [id, hashed_pw.hashed_pw, hashed_pw.salt], (error, rows, field) => {
                    if (error) {
                        // Query error again..
                        debug("Register failed due to query error 2");
                        debug(error.message);
                        res.status(400).send(error.message);
                    }
                    else {
                        debug(`User ${id}, successfully registered.`);
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
app.post('/api/audio_playtest', (req, res) => {
    debug("POST /audio_playtest");
    console.log(req.body);
    
    fs.writeFile(path.join(__dirname, `../audio/jsons/playtest${playtest_id}.json`), JSON.stringify(req.body), async (error) => {
        if (error) {
            console.log(`Writing playtest data to file playtest${playtest_id}.json failed.`);
            console.log(error);
            res.status(500).send("Internal server error. Please try later.");
        }
        else {
            // await exec("cd ../audio");
            process.chdir('../audio');
            const {stdout, stderr} = await exec(`cargo run playtest${playtest_id}`);
            if (stdout === "Success") {
                res.header({
                    "Content-Type": "audio/wav"
                }).sendFile(path.join(__dirname, `../audio/wavs/playtest${playtest_id}.wav`), (error) => {
                    if (error) {
                        console.log(`Sending file playtest${playtest_id}.wav failed.`);
                        console.log(error);
                    }
                    else {
                        console.log(`Sending file playtest${playtest_id}.wav succeeded.`);
                        playtest_id += 1;
                    }
                });
            }
            else {
                console.log(`Something went wrong while creating audio file from playtest${playtest_id}.json.`);
                res.status(500).send("Internal server error. Please try later.");
            }
            process.chdir('../server')
        }
    });
});

// Upload audio.
app.post('/api/audio_upload', (req, res) => {
    debug("POST /audio_upload");

    const author_id = req.body.author_id;
    const music_name = req.body.music_name;

    if (author_id === undefined || music_name === undefined) {
        console.log('Author id or Music name is not in request body.');
        res.status(400).send("Bad request. Please include both author_id and music_name field in your request body.");
    }
    else {
        fs.writeFile(path.join(__dirname, `../audio/jsons/${upload_id}.json`), JSON.stringify(req.body), (error) => {
            if (error) {
                console.log(`Writing audio data to file ${upload_id}.json failed.`);
                console.log(error);
                res.status(500).send("Internal server error. Please try later.");
            }
            else {
                connection.query('insert into musics(music_id, author_id, music_name) values (?, ?, ?)', [upload_id, author_id, music_name], async (error, rows, field) => {
                    if (error) {
                        console.log(`Query error.`);
                        console.log(error);
                        res.status(500).send("Internal server error. Please try later.");
                        fs.unlink(path.join(__dirname, `../audio/jsons/${upload_id}.json`));
                    }
                    else {
                        upload_id += 1;
                        console.log(`Success.`);
                        res.status(200).send("Upload success.");
                        process.chdir('../audio');
                        const {stdout, _} = await exec(`cargo run ${upload_id}`);
                        if (stdout === "Success") {
                            console.log("Ok, created wav file on storage.");
                        }
                        else {
                            console.log("Failed on creating wav file on storage...");
                        }
                        process.chdir("../server");
                    }
                });
    
                
            }
        });
    }
});

var temporary_map = new Map();

// Store temporary data.
app.post('/api/temporary', (req, res) => {
    const id = req.body.id;
    debug(`POST /temporary`);
    console.log(JSON.stringify(req.body));
    if (id === undefined) {
        res.status(400).send("You must include id.");
    }
    else {
        res.status(200).send("Saved temporary data.");
        temporary_map.set(id, JSON.stringify(req.body));
    }
});

app.get('/api/temporary/:id', (req, res) => {
    const id = req.params.id;
    debug(`GET /temporary/${id}`);
    if (id === undefined) {
        res.status(400).send("Undefined ID is not allowed");
    }
    else {
        const temp_data = temporary_map.get(id);
        if (temp_data === undefined) {
            res.status(400).send("Server does not have temporary data for this id.");
        }
        else {
            res.header({"Content-Type": "application/json"}).status(200).send(temp_data);
        }
    }
});

app.get('/api/audio_list/:id', (req, res) => {
    const id = req.params.id;
    debug(`GET /audio_list/${id}`);
    if (id === undefined) {
        res.status(400).send("Undefined ID is not allowed.");
    }
    else {
        connection.query('select * from musics where author_id=?', [id], (error, rows, field) => {
            if (error) {
                console.log("Something wrong while fetching audio_list.");
                console.log(error);
                res.status(500).send("Query Error");
            }
            else {
                res.header({"Content-Type": "application/json"}).status(200).send(JSON.stringify(rows));
            }
        })
    }
});

app.get('/api/audio/:id', (req, res) => {
    const filename = req.params.id;
    debug(`GET /audio/${filename}`);
    if (filename === undefined) {
        res.status(400).send("Undefined ID is not allowed.");
    }
    else {
        res.header({
            "Content-Type": "audio/wav"
        }).sendFile(path.join(__dirname, `../audio/wavs/${filename}`), (error) => {
            if (error) {
                console.log(`Sending file ${filename} failed.`);
                console.log(error);
            }
            else {
                console.log(`Sending file ${filename} succeeded.`);
                playtest_id += 1;
            }
        });
    }
})

app.listen(port, () => {
    console.log("<> Server start. Running on port " + port);
});