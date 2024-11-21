package edu._2_30_online_banking_system_database.backend.payload;

import java.sql.Date;

public record TransactionDto(
    Long id,
    Double amount,
    Date createdDate,
    Long fromAccountId,
    Long toAccountId,
    String type
) {}
