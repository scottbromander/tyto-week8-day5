$(document).ready(init);

function init() {
    console.log('DOM is tots Ready!!');

    $('.js-btn-deposit').on('click', onClickDeposit);
    $('.js-btn-withdraw').on('click', onClickWithdraw);

    // get balance and add to the DOM
    getBalance();

}

//
// EVENT HANDLERS
// ----------

function onClickDeposit(event) {
    const $depositField = $('.js-field-deposit');
    let depositAmount = $depositField.val();
    $depositField.val('');
    console.log('Deposit Amount: ', depositAmount);
    depositAmount = parseFloat(depositAmount);
    console.log('Deposit Amount: ', depositAmount);

    postDeposit(depositAmount);

}

function onClickWithdraw(event) {
    const $withdrawField = $('.js-field-withdraw');
    let withdrawAmount = $withdrawField.val();
    $withdrawField.val('');
    console.log('Withdraw Amount: ', withdrawAmount);
    withdrawAmount = parseFloat(withdrawAmount);
    console.log('Withdraw Amount: ', withdrawAmount);

    postWithdraw(withdrawAmount);

}

//
// API CALLS
// ----------

function getBalance() {
    $.ajax({
        method: 'GET',
        url: '/api/balance',
    })
    .then(function(response) {
        console.log('GET Response: ', response);
        render(response);
    })
    .catch(function(err) {
        console.log('GET Error: ', err);
    });
}

function postDeposit(deposit) {
    const data = {
        deposit: deposit,
    };
    console.log('POST Deposit: ', data);
    $.ajax({
        method: 'POST',
        url: '/api/deposit',
        data: data,
    })
    .then(function(response) {
        console.log('POST Response: ', response);
        getBalance();
    })
    .catch(function(err) {
        console.log('POST Error: ', err);
    });
}

function postWithdraw(withdraw) {
    const data = {
        amount: withdraw,
    };
    console.log('POST Withdraw: ', data);
    $.ajax({
        method: 'POST',
        url: '/api/withdraw',
        data: data,
    })
    .then(function(response) {
        console.log('POST Response: ', response);
        getBalance();
    })
    .catch(function(err) {
        console.log('POST Error: ', err);
    });
}

//
// VIEW UPDATE
// ----------

function render(accountInfo) {
    const $balance = $('.js-balance');

    $balance.empty();
    $balance.append(`
        $${accountInfo.balance}
    `)
}

