package edu._2_30_online_banking_system_database.backend.payload.responses;

import java.util.List;

import edu._2_30_online_banking_system_database.backend.payload.ApiKeyDto;
import edu._2_30_online_banking_system_database.backend.payload.CustomerDto;
import edu._2_30_online_banking_system_database.backend.payload.TransactionDto;

public record AdminDashboardResponse(
    CustomerDto admin,
    ApiKeyDto apiKey,
    List<TransactionDto> transactions
) {}
