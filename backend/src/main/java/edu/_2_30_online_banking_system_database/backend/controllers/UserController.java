package edu._2_30_online_banking_system_database.backend.controllers;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu._2_30_online_banking_system_database.backend.payload.CustomerDto;
import edu._2_30_online_banking_system_database.backend.payload.responses.ApiResponse;
import edu._2_30_online_banking_system_database.backend.services.BankingService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "/api/users")
@AllArgsConstructor
public class UserController {
    private BankingService bankingService;

    @GetMapping("/{email}")
    public ResponseEntity<ApiResponse<CustomerDto>> getUserInfo(@PathVariable String email) {
        CustomerDto user = bankingService.getUserInfoByEmail(email);
        return new ResponseEntity<>(
            new ApiResponse<>(
                "success",
                "customer is found",
                LocalDateTime.now(),
                user
            ),
            HttpStatus.OK
        );
    }
}
