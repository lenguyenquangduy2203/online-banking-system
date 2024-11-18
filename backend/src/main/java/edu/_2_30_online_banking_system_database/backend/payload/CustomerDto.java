package edu._2_30_online_banking_system_database.backend.payload;

import java.sql.Date;

public record CustomerDto(
    Long id,
    String name,
    String email,
    Date regisDate,
    Boolean isActive,
    String role
) {}
