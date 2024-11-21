package edu._2_30_online_banking_system_database.backend.payload;

import java.sql.Timestamp;

public record TransactionDto(
    Long id,
    Double amount,
    Timestamp createdDate,
    Long fromAccountId,
    Long toAccountId,
    String type
) {}
