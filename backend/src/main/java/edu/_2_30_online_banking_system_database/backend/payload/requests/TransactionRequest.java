package edu._2_30_online_banking_system_database.backend.payload.requests;

import java.math.BigDecimal;

public record TransactionRequest(
    BigDecimal amount,
    Long fromAccountId,
    Long toAccountId,
    String type,
    String pin
) {}
