package edu._2_30_online_banking_system_database.backend.services;

import edu._2_30_online_banking_system_database.backend.payload.CustomerDto;

public interface BankingService {
    CustomerDto getUserInfoByEmail(String email);
}
