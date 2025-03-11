const express = require('express');
const fs = require('fs').promises;

const app = express();
const PORT = 8081;

const loadLogins = async () => {
    const data = await fs.readFile('logins.json', 'utf-8');
    return JSON.parse(data);
};

const checkLogin = async (username, password) => {
    const logins = await loadLogins();
    for (login of logins) {
        if (login.username === username && login.password === password) {
            return true;
        }
    }
    return false;
}

const addLogin = async (login) => {
    let logins = await loadLogins();
    for (l of logins) {
        if (l.username === login.username) return false;
    }
    logins.push(login);
    await fs.writeFile('logins.json', JSON.stringify(logins), (err) => {
        if (err) {
            console.log('Error writing to file:', err);
            return false;
        }
    });

    return true;
}

app.get('/:username/:password', async (req, res) => {
    const username = req.params.username;
    const password = req.params.password;

    if (await checkLogin(username, password)) {
        res.status(200).send('Access Granted');
        return;
    }
    res.status(403).send('Access Denied');
});

app.get('/create/:username/:password', async (req, res) => {
    const username = req.params.username;
    const password = req.params.password;

    const login = { "username": username, "password": password };

    const status = await addLogin(login);

    if (status) {
        res.status(200).send('Success');
        return;
    }
    res.status(400).send('Error adding login');
});

app.listen(PORT, () => {
    console.log(`User authentication microservice listening on ${PORT}...`);
});