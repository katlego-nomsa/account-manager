BEGIN Banking System


// ======================================
// FUNCTION: Check if account exists
// ======================================

FUNCTION accountExists(accountNumber)

    CHECK bank records for accountNumber

    IF accountNumber exists THEN
        RETURN TRUE
    ELSE
        RETURN FALSE
    END IF

END FUNCTION


// ======================================
// FUNCTION: Sign Up
// ======================================

FUNCTION signUp()

    DISPLAY "Enter your bank account number"
    INPUT accountNumber

    IF accountExists(accountNumber) = FALSE THEN

        DISPLAY "Account Not Found"
        RETURN

    END IF


    // Get information from bank

    RETRIEVE user's information from bank

    GET:
        name
        surname
        email
        phoneNumber
        accountInformation


    DISPLAY "Enter your ID number"
    INPUT idNumber

    CHECK ID number against bank records

    IF idNumber does not match THEN

        DISPLAY "Registration Failed"
        RETURN

    END IF


    DISPLAY user's bank information

    DISPLAY "Is this information correct?"
    DISPLAY "1. Yes"
    DISPLAY "2. No"

    INPUT confirmation

    IF confirmation = 2 THEN

        DISPLAY "Registration Cancelled"
        RETURN

    END IF


    // Create PIN

    DISPLAY "Create your PIN"
    INPUT pin

    DISPLAY "Enter your PIN again"
    INPUT confirmPin

    WHILE pin != confirmPin DO

        DISPLAY "PINs Do Not Match"

        DISPLAY "Enter your PIN again"
        INPUT confirmPin

    END WHILE


    SAVE PIN to the user's account

    DISPLAY "Registration Successful"

END FUNCTION


// ======================================
// FUNCTION: Login
// ======================================

FUNCTION login()

    DISPLAY "Enter your bank account number"
    INPUT accountNumber

    IF accountExists(accountNumber) = FALSE THEN

        DISPLAY "Account Not Found"
        RETURN FALSE

    END IF


    DISPLAY "Enter your PIN"
    INPUT pin

    CHECK PIN against account records

    IF PIN is incorrect THEN

        DISPLAY "Access Denied"
        RETURN FALSE

    END IF


    DISPLAY "Login Successful"

    RETURN TRUE

END FUNCTION


// ======================================
// FUNCTION: Check Balance
// ======================================

FUNCTION checkBalance(account)

    RETURN account.balance

END FUNCTION


// ======================================
// FUNCTION: Record Transaction
// ======================================

FUNCTION recordTransaction(account, type, amount, status, reason)

    CREATE transaction

    transaction.type = type
    transaction.amount = amount
    transaction.dateTime = current date and time
    transaction.status = status

    IF reason exists THEN
        transaction.reason = reason
    END IF

    SAVE transaction to transaction history

END FUNCTION


// ======================================
// FUNCTION: Calculate Average Transaction
// ======================================

FUNCTION calculateAverageTransaction(account)

    GET user's previous transaction amounts

    IF there are no previous transactions THEN

        RETURN 0

    END IF

    total = 0
    transactionCount = 0

    FOR each transaction in transaction history

        IF transaction was successful THEN

            total = total + transaction.amount
            transactionCount = transactionCount + 1

        END IF

    END FOR

    average = total / transactionCount

    RETURN average

END FUNCTION


// ======================================
// FUNCTION: Check Rapid Withdrawals
// ======================================

FUNCTION checkRapidWithdrawals(account)

    currentTime = current date and time

    COUNT successful withdrawals
    made within the last 10 seconds

    IF withdrawalCount > 3 THEN

        RETURN FALSE

    ELSE

        RETURN TRUE

    END IF

END FUNCTION


// ======================================
// FUNCTION: Check Unusual Spending
// ======================================

FUNCTION checkUnusualSpending(account, amount)

    averageAmount = calculateAverageTransaction(account)

    IF averageAmount = 0 THEN

        RETURN TRUE

    END IF


    IF amount > (5 * averageAmount) THEN

        RETURN FALSE

    ELSE

        RETURN TRUE

    END IF

END FUNCTION


// ======================================
// FUNCTION: Deposit Money
// ======================================

FUNCTION depositMoney(account)

    DISPLAY "Enter deposit amount"
    INPUT amount

    IF amount <= 0 THEN

        DISPLAY "Invalid Amount"
        RETURN

    END IF


    account.balance = account.balance + amount

    recordTransaction(
        account,
        "Deposit",
        amount,
        "Successful",
        NONE
    )

    DISPLAY "Deposit Successful"
    DISPLAY "Updated Balance: " + account.balance

END FUNCTION


// ======================================
// FUNCTION: Withdraw Money
// ======================================

FUNCTION withdrawMoney(account)

    DISPLAY "Enter withdrawal amount"
    INPUT amount


    // Check balance

    IF amount > account.balance THEN

        DISPLAY "Insufficient Funds"

        recordTransaction(
            account,
            "Withdrawal",
            amount,
            "Blocked",
            "Insufficient Funds"
        )

        RETURN

    END IF


    // Check rapid withdrawals

    IF checkRapidWithdrawals(account) = FALSE THEN

        DISPLAY "Transaction Blocked — Too Many Withdrawals"

        recordTransaction(
            account,
            "Withdrawal",
            amount,
            "Blocked",
            "Too Many Withdrawals"
        )

        RETURN

    END IF


    // Check unusual spending

    IF checkUnusualSpending(account, amount) = FALSE THEN

        DISPLAY "Transaction Blocked — Suspicious Activity"

        recordTransaction(
            account,
            "Withdrawal",
            amount,
            "Blocked",
            "Suspicious Activity"
        )

        RETURN

    END IF


    // Approve withdrawal

    account.balance = account.balance - amount

    recordTransaction(
        account,
        "Withdrawal",
        amount,
        "Successful",
        NONE
    )

    DISPLAY "Withdrawal Successful"
    DISPLAY "Updated Balance: " + account.balance

END FUNCTION


// ======================================
// FUNCTION: Transfer Money
// ======================================

FUNCTION transferMoney(senderAccount)

    DISPLAY "Enter recipient account number"
    INPUT recipientAccountNumber


    // Check recipient

    IF accountExists(recipientAccountNumber) = FALSE THEN

        DISPLAY "Recipient Account Not Found"

        RETURN

    END IF


    GET recipientAccount


    DISPLAY "Enter transfer amount"
    INPUT amount


    // Check sender balance

    IF amount > senderAccount.balance THEN

        DISPLAY "Insufficient Funds"

        recordTransaction(
            senderAccount,
            "Transfer",
            amount,
            "Blocked",
            "Insufficient Funds"
        )

        RETURN

    END IF


    // Check unusual spending

    IF checkUnusualSpending(senderAccount, amount) = FALSE THEN

        DISPLAY "Transaction Blocked — Suspicious Activity"

        recordTransaction(
            senderAccount,
            "Transfer",
            amount,
            "Blocked",
            "Suspicious Activity"
        )

        RETURN

    END IF


    // Approve transfer

    senderAccount.balance =
        senderAccount.balance - amount

    recipientAccount.balance =
        recipientAccount.balance + amount


    recordTransaction(
        senderAccount,
        "Transfer",
        amount,
        "Successful",
        NONE
    )


    DISPLAY "Transfer Successful"
    DISPLAY "Updated Balance: " + senderAccount.balance

END FUNCTION


// ======================================
// MAIN PROGRAM
// ======================================

FUNCTION main()

    DISPLAY "Did you open an account?"
    DISPLAY "1. Yes"
    DISPLAY "2. No"

    INPUT choice


    IF choice = 2 THEN

        signUp()

        // After successful registration
        // user can go to Login

        IF login() = FALSE THEN
            RETURN
        END IF


    ELSE IF choice = 1 THEN

        IF login() = FALSE THEN
            RETURN
        END IF

    ELSE

        DISPLAY "Invalid Choice"
        RETURN

    END IF


    // ==================================
    // TRANSACTION MENU
    // ==================================

    DISPLAY "Choose a transaction:"
    DISPLAY "1. Deposit"
    DISPLAY "2. Withdrawal"
    DISPLAY "3. Transfer"

    INPUT transactionChoice


    IF transactionChoice = 1 THEN

        depositMoney(currentAccount)


    ELSE IF transactionChoice = 2 THEN

        withdrawMoney(currentAccount)


    ELSE IF transactionChoice = 3 THEN

        transferMoney(currentAccount)


    ELSE

        DISPLAY "Invalid Transaction Choice"

    END IF

END FUNCTION


CALL main()


END Banking System
