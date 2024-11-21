package edu._2_30_online_banking_system_database.backend.payload.requests;

public record TransactionRequest(
    Double amount,
    Long fromAccountId,
    Long toAccountId,
    String type,
    String pin
) {}
