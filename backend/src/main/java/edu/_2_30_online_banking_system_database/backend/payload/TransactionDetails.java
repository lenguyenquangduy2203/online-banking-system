package edu._2_30_online_banking_system_database.backend.payload;

public record TransactionDetails(
    CustomerDto transactionMaker,
    AccountDetails fromAccount,
    AccountDetails toAccount
) {}
