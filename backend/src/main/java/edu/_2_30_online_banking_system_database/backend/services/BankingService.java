package edu._2_30_online_banking_system_database.backend.services;

import edu._2_30_online_banking_system_database.backend.models.EAccountType;
import edu._2_30_online_banking_system_database.backend.payload.AccountDto;
import edu._2_30_online_banking_system_database.backend.payload.CustomerDto;

public interface BankingService {
    CustomerDto getUserInfoByEmail(String email);
    AccountDto createAccountForUser(Long userId, EAccountType type, String pin);
}
