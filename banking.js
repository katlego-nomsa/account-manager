// ==========================================
// BANKING SYSTEM
// ==========================================


// ==========================================
// ACCOUNT DATA
// ==========================================

let accounts = [
    {
        accountNumber: "1001",
        name: "Alice",
        surname: "Smith",
        email: "alice@email.com",
        phoneNumber: "0711111111",
        idNumber: "9001010000000",
        pin: "1234",
        balance: 5000,
        transactions: []
    },

    {
        accountNumber: "1002",
        name: "Bob",
        surname: "Jones",
        email: "bob@email.com",
        phoneNumber: "0722222222",
        idNumber: "9002020000000",
        pin: "5678",
        balance: 3000,
        transactions: []
    }
];


// ==========================================
// FUNCTION 1: CHECK BALANCE
// ==========================================

function checkBalance(account) {

    return account.balance;
}


// ==========================================
// FUNCTION 2: RECORD TRANSACTION
// ==========================================

function recordTransaction(account, type, amount, status, reason) {

    let transaction = {

        type: type,
        amount: amount,
        dateTime: new Date(),
        status: status,
        reason: reason
    };

    account.transactions.push(transaction);
}


// ==========================================
// FUNCTION 3: CALCULATE AVERAGE TRANSACTION
// ==========================================

function calculateAverageTransaction(account) {

    let total = 0;
    let transactionCount = 0;

    for (let i = 0; i < account.transactions.length; i++) {

        let transaction = account.transactions[i];

        if (transaction.status === "Successful") {

            total = total + transaction.amount;
            transactionCount++;
        }
    }

    if (transactionCount === 0) {

        return 0;
    }

    return total / transactionCount;
}


// ==========================================
// FUNCTION 4: CHECK RAPID WITHDRAWALS
// ==========================================

function checkRapidWithdrawals(account) {

    let currentTime = new Date();
    let withdrawalCount = 0;

    for (let i = 0; i < account.transactions.length; i++) {

        let transaction = account.transactions[i];

        if (
            transaction.type === "Withdrawal" &&
            transaction.status === "Successful"
        ) {

            let timeDifference =
                (currentTime - transaction.dateTime) / 1000;

            if (timeDifference <= 10) {

                withdrawalCount++;
            }
        }
    }

    if (withdrawalCount > 3) {

        return false;
    }

    return true;
}


// ==========================================
// FUNCTION 5: CHECK UNUSUAL SPENDING
// ==========================================

function checkUnusualSpending(account, amount) {

    let averageAmount =
        calculateAverageTransaction(account);

    // If there are no previous transactions
    if (averageAmount === 0) {

        return true;
    }

    if (amount > (5 * averageAmount)) {

        return false;
    }

    return true;
}


// ==========================================
// FUNCTION 6: DEPOSIT MONEY
// ==========================================

function depositMoney(account) {

    let amount = Number(
        prompt("Enter deposit amount:")
    );

    if (amount <= 0 || isNaN(amount)) {

        console.log("Invalid Amount");
        return;
    }

    account.balance =
        account.balance + amount;

    recordTransaction(
        account,
        "Deposit",
        amount,
        "Successful",
        null
    );

    console.log("Deposit Successful");

    console.log(
        "Updated Balance: R" +
        checkBalance(account)
    );
}


// ==========================================
// FUNCTION 7: WITHDRAW MONEY
// ==========================================

function withdrawMoney(account) {

    let amount = Number(
        prompt("Enter withdrawal amount:")
    );


    // Check balance

    if (amount > checkBalance(account)) {

        console.log("Insufficient Funds");

        recordTransaction(
            account,
            "Withdrawal",
            amount,
            "Blocked",
            "Insufficient Funds"
        );

        return;
    }


    // Check rapid withdrawals

    if (!checkRapidWithdrawals(account)) {

        console.log(
            "Transaction Blocked — Too Many Withdrawals"
        );

        recordTransaction(
            account,
            "Withdrawal",
            amount,
            "Blocked",
            "Too Many Withdrawals"
        );

        return;
    }


    // Check unusual spending

    if (!checkUnusualSpending(account, amount)) {

        console.log(
            "Transaction Blocked — Suspicious Activity"
        );

        recordTransaction(
            account,
            "Withdrawal",
            amount,
            "Blocked",
            "Suspicious Activity"
        );

        return;
    }


    // Approve withdrawal

    account.balance =
        account.balance - amount;

    recordTransaction(
        account,
        "Withdrawal",
        amount,
        "Successful",
        null
    );

    console.log("Withdrawal Successful");

    console.log(
        "Updated Balance: R" +
        checkBalance(account)
    );
}


// ==========================================
// FUNCTION 8: TRANSFER MONEY
// ==========================================

function transferMoney(senderAccount) {

    let recipientAccountNumber =
        prompt("Enter recipient account number:");

    let recipientAccount = null;


    // Find recipient account

    for (let i = 0; i < accounts.length; i++) {

        if (
            accounts[i].accountNumber ===
            recipientAccountNumber
        ) {

            recipientAccount = accounts[i];
            break;
        }
    }


    // Check recipient

    if (recipientAccount === null) {

        console.log(
            "Recipient Account Not Found"
        );

        return;
    }


    let amount = Number(
        prompt("Enter transfer amount:")
    );


    // Check sender balance

    if (amount > checkBalance(senderAccount)) {

        console.log("Insufficient Funds");

        recordTransaction(
            senderAccount,
            "Transfer",
            amount,
            "Blocked",
            "Insufficient Funds"
        );

        return;
    }


    // Check unusual spending

    if (
        !checkUnusualSpending(
            senderAccount,
            amount
        )
    ) {

        console.log(
            "Transaction Blocked — Suspicious Activity"
        );

        recordTransaction(
            senderAccount,
            "Transfer",
            amount,
            "Blocked",
            "Suspicious Activity"
        );

        return;
    }


    // Approve transfer

    senderAccount.balance =
        senderAccount.balance - amount;

    recipientAccount.balance =
        recipientAccount.balance + amount;


    // Record sender transaction

    recordTransaction(
        senderAccount,
        "Transfer",
        amount,
        "Successful",
        null
    );


    // Record recipient transaction

    recordTransaction(
        recipientAccount,
        "Transfer Received",
        amount,
        "Successful",
        null
    );


    console.log("Transfer Successful");

    console.log(
        "Updated Balance: R" +
        checkBalance(senderAccount)
    );
}


// ==========================================
// FUNCTION 9: MAIN
// ==========================================

function main() {

    console.log("================================");
    console.log("       BANKING SYSTEM");
    console.log("================================");


    // ======================================
    // START
    // ======================================

    let choice = Number(
        prompt(
            "Did you open an account?\n" +
            "1. Yes\n" +
            "2. No"
        )
    );


    // ======================================
    // SIGN UP
    // ======================================

    if (choice === 2) {

        let accountNumber =
            prompt(
                "Enter your bank account number:"
            );

        let currentAccount = null;


        // Find account

        for (let i = 0; i < accounts.length; i++) {

            if (
                accounts[i].accountNumber ===
                accountNumber
            ) {

                currentAccount = accounts[i];
                break;
            }
        }


        if (currentAccount === null) {

            console.log("Account Not Found");
            return;
        }


        // Retrieve bank information

        console.log(
            "Account information found."
        );

        console.log(
            "Name: " +
            currentAccount.name
        );

        console.log(
            "Surname: " +
            currentAccount.surname
        );

        console.log(
            "Email: " +
            currentAccount.email
        );

        console.log(
            "Phone: " +
            currentAccount.phoneNumber
        );


        // ID verification

        let idNumber =
            prompt("Enter your ID number:");


        if (
            currentAccount.idNumber !==
            idNumber
        ) {

            console.log(
                "Registration Failed"
            );

            return;
        }


        // Confirm information

        let confirmation = Number(
            prompt(
                "Is this information correct?\n" +
                "1. Yes\n" +
                "2. No"
            )
        );


        if (confirmation === 2) {

            console.log(
                "Registration Cancelled"
            );

            return;
        }


        // Create PIN

        let pin =
            prompt("Create your PIN:");

        let confirmPin =
            prompt("Enter your PIN again:");


        while (pin !== confirmPin) {

            console.log(
                "PINs Do Not Match"
            );

            confirmPin =
                prompt(
                    "Enter your PIN again:"
                );
        }


        currentAccount.pin = pin;

        console.log(
            "Registration Successful"
        );
    }


    // ======================================
    // LOGIN
    // ======================================

    let accountNumber =
        prompt(
            "Enter your bank account number:"
        );

    let currentAccount = null;


    for (let i = 0; i < accounts.length; i++) {

        if (
            accounts[i].accountNumber ===
            accountNumber
        ) {

            currentAccount = accounts[i];
            break;
        }
    }


    if (currentAccount === null) {

        console.log(
            "Account Not Found"
        );

        return;
    }


    let pin =
        prompt("Enter your PIN:");


    if (currentAccount.pin !== pin) {

        console.log(
            "Access Denied"
        );

        return;
    }


    console.log(
        "Login Successful"
    );


    // ======================================
    // TRANSACTION MENU
    // ======================================

    console.log(
        "Welcome " +
        currentAccount.name
    );

    console.log(
        "Current Balance: R" +
        checkBalance(currentAccount)
    );


    let transactionChoice = Number(
        prompt(
            "Choose a transaction:\n" +
            "1. Deposit\n" +
            "2. Withdrawal\n" +
            "3. Transfer"
        )
    );


    if (transactionChoice === 1) {

        depositMoney(currentAccount);

    }
    else if (transactionChoice === 2) {

        withdrawMoney(currentAccount);

    }
    else if (transactionChoice === 3) {

        transferMoney(currentAccount);

    }
    else {

        console.log(
            "Invalid Transaction Choice"
        );
    }
}


// ==========================================
// START PROGRAM
// ==========================================

main();
