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

app.get('/:username/:password', async (req, res) => {
    const username = req.params.username;
    const password = req.params.password;

    if (await checkLogin(username, password)) {
        res.status(200).send('Access Granted');
        return;
    }
    res.status(403).send('Access Denied');
});



app.listen(PORT, () => {
    console.log(`User authentication microservice listening on ${PORT}...`);
});