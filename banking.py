Start

The system asks: “Did you open an account?”
If the user selects No
The system takes the user to Sign Up.
If the user selects Yes
The system takes the user to Login.
2. Sign Up
The user enters their bank account number.
The system checks whether the account exists.
If the account does not exist:
Display “Account Not Found.”
Allow the user to try again.
If the account exists:
The system retrieves the user's information from the bank.
The retrieved information includes:
Name
Surname
Email address
Phone number
Account information
The user enters their ID number.
The system checks the ID number against the bank's records.
If the ID number does not match:
Display “Registration Failed.”
Allow the user to try again.
If the ID number matches:
Display the user's bank information.
The user checks and confirms that the information is correct.
If the information is incorrect:
Allow the user to cancel the registration.
If the information is correct:
The user creates a PIN.
The user enters the PIN again to confirm it.
If the PINs do not match:
Display “PINs Do Not Match.”
Ask the user to enter the PIN again.
If the PINs match:
Display “Registration Successful.”
Take the user to the Login screen.
3. Login
The user enters their bank account number.
The system checks whether the account exists.
If the account does not exist:
Display “Account Not Found.”
Allow the user to try again.
If the account exists:
Ask the user to enter their PIN.
The system checks whether the PIN is correct.
If the PIN is incorrect:
Display “Access Denied.”
Allow the user to try again.
If the PIN is correct:
Log the user in.
this options pop up: user chooses one
 Deposit
 Withdrawal
 Transfer

2. Deposit Money
Allow the user to select Deposit.
Ask the user to enter the amount.
Check that the amount is valid.
Add the amount to the user's account balance.
Record the deposit in the transaction history.
Save the date and time of the transaction.
Display the updated account balance.

3. Withdraw Money
Allow the user to select Withdrawal.
Ask the user to enter the withdrawal amount.
Check whether the user has enough money.
If the user does not have enough money, block the transaction.
Display “Insufficient Funds.”
If the user has enough money, check the rapid-withdrawal rule.
Count the user's withdrawals made within the last 10 seconds.
If the user has made more than 3 withdrawals within 10 seconds, block the withdrawal.
Display “Transaction Blocked — Too Many Withdrawals.”
If the rapid-withdrawal rule is not triggered, check the unusual-spending rule.
Compare the withdrawal amount with the user's average transaction amount.
If the withdrawal amount is 5 times larger than the user's average transaction amount, block the withdrawal.
Display “Transaction Blocked — Suspicious Activity.”
If all checks pass, subtract the withdrawal amount from the account balance.
Record the withdrawal.
Save the date and time.
Display the updated account balance.

4. Transfer Money
Allow the user to select Transfer.
Ask the user to enter the recipient's account number.
Check whether the recipient's account exists.
If the recipient's account does not exist, block the transfer.
Display “Recipient Account Not Found.”
If the recipient exists, ask the user to enter the transfer amount.
Check whether the sender has enough money.
If the sender does not have enough money, block the transfer.
Display “Insufficient Funds.”
If the sender has enough money, check the unusual-spending rule.
Compare the transfer amount with the sender's average transaction amount.
If the transfer amount is 5 times larger than the sender's average transaction amount, block the transfer.
Display “Transaction Blocked — Suspicious Activity.”
If all checks pass, subtract the amount from the sender's account.
Add the amount to the recipient's account.
Update both account balances.
Record the transfer.
Save the date and time.
Display “Transfer Successful.”
END
