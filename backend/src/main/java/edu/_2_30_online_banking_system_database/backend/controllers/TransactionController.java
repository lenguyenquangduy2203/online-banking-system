package edu._2_30_online_banking_system_database.backend.controllers;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu._2_30_online_banking_system_database.backend.exceptions.UnimplementedException;
import edu._2_30_online_banking_system_database.backend.payload.TransactionDto;
import edu._2_30_online_banking_system_database.backend.payload.requests.TransactionRequest;
import edu._2_30_online_banking_system_database.backend.payload.responses.ApiResponse;
import edu._2_30_online_banking_system_database.backend.services.TransactionService;
import jakarta.mail.AuthenticationFailedException;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "/api/transactions")
@AllArgsConstructor
public class TransactionController {
    private TransactionService transactionService;

    @PostMapping("")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<TransactionDto>> makeTransaction(@RequestBody TransactionRequest request) {
        TransactionDto transaction;
        try {
            transaction = transactionService.makeTransaction(request);
        } catch (IllegalArgumentException | AuthenticationFailedException e) {
            throw new UnimplementedException("Haven't implement exception for this.");
        }
        return new ResponseEntity<>(
            new ApiResponse<>(
                "success",
                "your transaction is made",
                LocalDateTime.now(),
                transaction
            ),
            HttpStatus.CREATED
        );
    }
}
