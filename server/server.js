const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const withdraw = require('./modules/withdraw');

app.use(express.static('server/public'));
// These make req.body available!
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const account = {
    name: 'Phillip Thatcher',
    account_number: 12345,
    balance: 1000
}

app.get('/api/balance', (req, res) => {
    const objectToSendDown = {
        balance: account.balance
    }

    res.send(objectToSendDown);
});

app.post('/api/deposit', (req, res) => {
    const deposit = parseFloat(req.body.deposit);

    if (deposit) {
        account.balance += deposit;
        res.send(201);
    } else {
        res.send(500);
    }
});

app.post('/api/withdraw', (req, res) => {
    const amount = parseFloat(req.body.amount);
    if (amount) {
        res.send(withdraw(account, amount)); // res.send({message: 'x'});
    } else {
        res.sendStatus(500);
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})