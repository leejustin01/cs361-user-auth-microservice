import fetch from 'node-fetch';

const test = async (username, password) => {
    const response = await fetch('http://localhost:8081/' + username + '/' + password);
    if (response.status === 200) {
        console.log("Granted");
    } else if (response.status === 403) {
        console.log("Denied");
    }
}

const testCreate = async (username, password) => {
    const response = await fetch('http://localhost:8081/create/' + username + '/' + password);
    console.log(response.statusText);
}

//test('un1', 'pw2');
testCreate('un1', 'pw12321');