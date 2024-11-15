package edu._2_30_online_banking_system_database.backend.payload.responses;

import java.time.LocalDateTime;

public record ApiResponse<T>(
    String status,
    String message,
    LocalDateTime timestamp,
    T data
) {}
