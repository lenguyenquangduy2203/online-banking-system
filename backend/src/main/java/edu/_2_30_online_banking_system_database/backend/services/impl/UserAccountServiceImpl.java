package edu._2_30_online_banking_system_database.backend.services.impl;

import java.sql.Date;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import edu._2_30_online_banking_system_database.backend.exceptions.InvalidAccountTypeException;
import edu._2_30_online_banking_system_database.backend.exceptions.InvalidPinException;
import edu._2_30_online_banking_system_database.backend.models.Account;
import edu._2_30_online_banking_system_database.backend.models.AccountType;
import edu._2_30_online_banking_system_database.backend.models.Customer;
import edu._2_30_online_banking_system_database.backend.models.EAccountType;
import edu._2_30_online_banking_system_database.backend.payload.AccountDto;
import edu._2_30_online_banking_system_database.backend.repositories.AccountRepository;
import edu._2_30_online_banking_system_database.backend.repositories.AccountTypeRepository;
import edu._2_30_online_banking_system_database.backend.repositories.CustomerRepository;
import edu._2_30_online_banking_system_database.backend.services.PinService;
import edu._2_30_online_banking_system_database.backend.services.UserAccountService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserAccountServiceImpl implements UserAccountService {
    private AccountTypeRepository accountTypeRepository;
    private AccountRepository accountRepository;
    private CustomerRepository customerRepository;
    private PinService pinService;

    @Override
    public AccountDto createAccountForUser(Long userId, EAccountType type, String pin) {
        String encodedPin;
        if (Boolean.TRUE.equals(pinService.isValidPin(pin))) {
            encodedPin = pinService.encodePin(pin);
        } else {
            throw new InvalidPinException("Pin must contains 4 to 6 digits.");
        }
        AccountType accountType = accountTypeRepository.findByName(type)
            .orElseThrow(() -> new InvalidAccountTypeException("Account type is not exist."));
        Customer user = customerRepository.findById(userId)
            .orElseThrow(() -> new UsernameNotFoundException("Cannot find user with id: " + userId));
        Account account = Account.builder()
                                .balance(0.0)
                                .createdDate(new Date(System.currentTimeMillis()))
                                .pin(encodedPin)
                                .customer(user)
                                .type(accountType)
                                .build();
        Account savedAccount = accountRepository.save(account);
        return new AccountDto(
            savedAccount.getId(),
            savedAccount.getBalance(),
            savedAccount.getCreatedDate(),
            savedAccount.getCustomer().getId(),
            savedAccount.getType().getName().toString()
        );
    }
    
}
