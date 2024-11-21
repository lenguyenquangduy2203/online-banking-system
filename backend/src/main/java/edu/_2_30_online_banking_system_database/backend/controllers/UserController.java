package edu._2_30_online_banking_system_database.backend.controllers;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu._2_30_online_banking_system_database.backend.exceptions.InvalidAccountTypeException;
import edu._2_30_online_banking_system_database.backend.models.EAccountType;
import edu._2_30_online_banking_system_database.backend.payload.AccountDto;
import edu._2_30_online_banking_system_database.backend.payload.requests.LoginDto;
import edu._2_30_online_banking_system_database.backend.payload.responses.ApiResponse;
import edu._2_30_online_banking_system_database.backend.services.CustomerService;
import edu._2_30_online_banking_system_database.backend.services.UserAccountService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "/api/users")
@AllArgsConstructor
public class UserController {
    private CustomerService customerService;
    private UserAccountService userAccountService;

    @PostMapping("/{id}/accounts")
    public ResponseEntity<ApiResponse<AccountDto>> openAccount(
        @PathVariable Long id, @RequestBody Map<String, String> payload
    ) {
        String email = payload.get("email");
        String password = payload.get("password");
        LoginDto loginDto = new LoginDto(email, password);
        customerService.signIn(loginDto);
        String pin = payload.get("pin");
        String accountType = payload.get("type").toUpperCase();
        try {
            AccountDto savedAccount = userAccountService
                .createAccountForUser(id, EAccountType.valueOf(accountType), pin);   
            return new ResponseEntity<>(
                new ApiResponse<>(
                    "created",
                    "your account has been created",
                    LocalDateTime.now(),
                    savedAccount
                ),
                HttpStatus.CREATED
            );  
        } catch (IllegalArgumentException e) {
            throw new InvalidAccountTypeException("Account type: "+accountType+" is not exist.");
        }
    }
}
