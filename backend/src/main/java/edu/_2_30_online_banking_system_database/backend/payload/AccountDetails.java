package edu._2_30_online_banking_system_database.backend.payload;

import java.time.LocalDateTime;

public record AccountDetails(
    Long id,
    LocalDateTime createdDate,
    Long customerId,
    String type
) {}