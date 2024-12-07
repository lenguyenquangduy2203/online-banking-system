package edu._2_30_online_banking_system_database.backend.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import edu._2_30_online_banking_system_database.backend.models.Account;
import edu._2_30_online_banking_system_database.backend.models.Customer;
import edu._2_30_online_banking_system_database.backend.models.ERole;
import edu._2_30_online_banking_system_database.backend.payload.AccountDto;
import edu._2_30_online_banking_system_database.backend.payload.ApiKeyDto;
import edu._2_30_online_banking_system_database.backend.payload.CustomerDto;
import edu._2_30_online_banking_system_database.backend.payload.TransactionDto;
import edu._2_30_online_banking_system_database.backend.payload.responses.AdminDashboardResponse;
import edu._2_30_online_banking_system_database.backend.payload.responses.UserDashboardResponse;
import edu._2_30_online_banking_system_database.backend.repositories.AccountRepository;
import edu._2_30_online_banking_system_database.backend.services.DashboardService;
import edu._2_30_online_banking_system_database.backend.services.TransactionService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DashboardServiceImpl implements DashboardService {
    private TransactionService transactionService;
    private AccountRepository accountRepository;

    @Override
    public UserDashboardResponse getUserDashboardData(Customer user, ApiKeyDto apiKey) {
        List<AccountDto> censoredAccounts = new ArrayList<>();
        List<Account> accounts = accountRepository.findAllByCustomer(user);
        CustomerDto censoredUser = new CustomerDto(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getRegisDate(),
            user.getIsActive(),
            ERole.ROLE_USER.toString()
        );
        List<TransactionDto> latestTransactions = transactionService
            .getTransactionPageOrderByDescCreatedDate(user.getId(), 0, 1);
        for (Account account : accounts) {
            censoredAccounts.add(new AccountDto(
                account.getId(),
                account.getBalance(),
                account.getCreatedDate(),
                user.getId(),
                account.getType().getName().toString()
            ));
        }
        return new UserDashboardResponse(censoredUser, apiKey, latestTransactions, censoredAccounts);
    }

    @Override
    public AdminDashboardResponse getAdminDashboardData(Customer admin, ApiKeyDto apiKey) {
        CustomerDto censoredAdmin = new CustomerDto(
            admin.getId(),
            admin.getName(),
            admin.getEmail(),
            admin.getRegisDate(),
            admin.getIsActive(),
            ERole.ROLE_ADMIN.toString()
        );
        List<TransactionDto> censoredTransactions = transactionService
            .getTransactionPageOrderByDescCreatedDate(0, 10);
        return new AdminDashboardResponse(censoredAdmin, apiKey, censoredTransactions);
    }
}
