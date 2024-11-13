package edu._2_30_online_banking_system_database.backend.config;

import java.sql.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import edu._2_30_online_banking_system_database.backend.models.AccountType;
import edu._2_30_online_banking_system_database.backend.models.Customer;
import edu._2_30_online_banking_system_database.backend.models.EAccountType;
import edu._2_30_online_banking_system_database.backend.models.ERole;
import edu._2_30_online_banking_system_database.backend.models.ETransactionType;
import edu._2_30_online_banking_system_database.backend.models.Role;
import edu._2_30_online_banking_system_database.backend.models.TransactionType;
import edu._2_30_online_banking_system_database.backend.repositories.AccountTypeRepository;
import edu._2_30_online_banking_system_database.backend.repositories.CustomerRepository;
import edu._2_30_online_banking_system_database.backend.repositories.RoleRepository;
import edu._2_30_online_banking_system_database.backend.repositories.TransactionTypeRepository;
import lombok.AllArgsConstructor;

@Configuration
@AllArgsConstructor
public class DataInitializer {
    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);
    private PasswordEncoder passwordEncoder;
    
    @Bean
    CommandLineRunner initData(
        AccountTypeRepository accountTypeRepository,
        RoleRepository roleRepository,
        TransactionTypeRepository transactionTypeRepository,
        CustomerRepository customerRepository
    ) {
        return args -> {
            AccountType transactionAccountType = new AccountType();
            transactionAccountType.setName(EAccountType.TRANSACTION);
            transactionAccountType = accountTypeRepository.save(transactionAccountType);
            
            AccountType savingAccountType = new AccountType();
            savingAccountType.setName(EAccountType.SAVING);
            savingAccountType = accountTypeRepository.save(transactionAccountType);
            
            AccountType emergencyAccountType = new AccountType();
            emergencyAccountType.setName(EAccountType.EMERGENCY);
            emergencyAccountType = accountTypeRepository.save(transactionAccountType);

            Role userRole = new Role();
            userRole.setName(ERole.ROLE_USER);
            userRole = roleRepository.save(userRole);

            Role adminRole = new Role();
            adminRole.setName(ERole.ROLE_ADMIN);
            adminRole = roleRepository.save(userRole);

            TransactionType depositTransactionType = new TransactionType();
            depositTransactionType.setName(ETransactionType.DEPOSIT);
            depositTransactionType = transactionTypeRepository.save(depositTransactionType);

            TransactionType withdrawalTransactionType = new TransactionType();
            withdrawalTransactionType.setName(ETransactionType.WITHDRAWAL);
            withdrawalTransactionType = transactionTypeRepository.save(depositTransactionType);

            TransactionType transferTransactionType = new TransactionType();
            transferTransactionType.setName(ETransactionType.TRANSFER);
            transferTransactionType = transactionTypeRepository.save(depositTransactionType);

            Customer admin = Customer.builder()
                .name("Admin")
                .email("fmail@fakemail.com")
                .password(passwordEncoder.encode("123456789"))
                .regisDate(new Date(System.currentTimeMillis()))
                .isActive(true)
                .role(adminRole)
                .build();
            admin = customerRepository.save(admin);

            logger.info("Initial data loaded successfully");
        };
    }

}
