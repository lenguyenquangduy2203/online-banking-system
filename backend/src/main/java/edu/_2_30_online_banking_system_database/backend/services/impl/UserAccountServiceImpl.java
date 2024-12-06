package edu._2_30_online_banking_system_database.backend.services.impl;

import java.sql.Date;
import java.time.LocalDateTime;
import java.math.BigDecimal;

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
        
        // Kiểm tra và mã hóa pin
        if (Boolean.TRUE.equals(pinService.isValidPin(pin))) {
            encodedPin = pinService.encodePin(pin); // Mã hóa pin nếu hợp lệ
        } else {
            throw new InvalidPinException("Pin must contains 4 to 6 digits.");
        }
    
        // Lấy loại tài khoản
        AccountType accountType = accountTypeRepository.findByName(type)
            .orElseThrow(() -> new InvalidAccountTypeException("Account type is not exist."));
        
        // Lấy thông tin khách hàng
        Customer user = customerRepository.findById(userId)
            .orElseThrow(() -> new UsernameNotFoundException("Cannot find user with id: " + userId));
        
    
        Account account = Account.builder()
            .balance(new BigDecimal("50000"))
            .createdDate(new java.sql.Timestamp(System.currentTimeMillis()).toLocalDateTime())
            .pin(encodedPin)
            .customer(user)
            .type(accountType)
            .build();
        
        // Lưu tài khoản vào DB
        Account savedAccount = accountRepository.save(account);
    
        // Trả về DTO
        return new AccountDto(
            savedAccount.getId(),
            savedAccount.getBalance(),
            savedAccount.getCreatedDate().toLocalDate(),
            savedAccount.getCustomer().getId(),
            savedAccount.getType().getName().toString()
        );
    }
    
}
