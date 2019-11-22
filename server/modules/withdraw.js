function withdraw(account, amount) {
    if (account.balance >= amount) {
        account.balance -= amount;
        return {message: `${amount} removed from the account.`};
    } else {
        return {message: 'Not enough funds'};
    }
}

module.exports = withdraw;