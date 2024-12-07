package edu._2_30_online_banking_system_database.backend.payload;

import java.sql.Date;

public record AccountDto(
    Long id,
    Double balance,
    Date createdDate,
    Long customerId,
    String type
) {}