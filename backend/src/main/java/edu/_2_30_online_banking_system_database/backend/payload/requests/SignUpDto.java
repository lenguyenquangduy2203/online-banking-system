package edu._2_30_online_banking_system_database.backend.payload.requests;

public record SignUpDto(
    String name,
    String email,
    String password
) {}
