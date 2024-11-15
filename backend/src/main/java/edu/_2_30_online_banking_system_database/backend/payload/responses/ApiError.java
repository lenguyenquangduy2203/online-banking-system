package edu._2_30_online_banking_system_database.backend.payload.responses;

public record ApiError(
    Integer code,
    String details
) {}
