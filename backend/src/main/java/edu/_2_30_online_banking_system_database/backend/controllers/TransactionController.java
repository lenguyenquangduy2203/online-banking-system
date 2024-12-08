package edu._2_30_online_banking_system_database.backend.controllers;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu._2_30_online_banking_system_database.backend.exceptions.UnimplementedException;
import edu._2_30_online_banking_system_database.backend.payload.TransactionDetails;
import edu._2_30_online_banking_system_database.backend.payload.TransactionDto;
import edu._2_30_online_banking_system_database.backend.payload.requests.TransactionRequest;
import edu._2_30_online_banking_system_database.backend.payload.responses.ApiResponse;
import edu._2_30_online_banking_system_database.backend.services.TransactionService;
import jakarta.mail.AuthenticationFailedException;
import lombok.AllArgsConstructor;

@RestController
@CrossOrigin
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

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<TransactionDto>>> getPageOfTransactions(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        List<TransactionDto> transactions = transactionService
            .getTransactionPageOrderByDescCreatedDate(page, size);
        return new ResponseEntity<>(
            new ApiResponse<>(
                "success",
                "page "+page+" of size "+size+" is retrieved",
                LocalDateTime.now(),
                transactions
            ),
            HttpStatus.OK
        );
    }

    @GetMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<TransactionDetails>> getDetails(@PathVariable Long id) {
        TransactionDetails details = transactionService.getTransactionDetails(id);
        return new ResponseEntity<>(
            new ApiResponse<>(
                "found",
                "details for specified transaction is found",
                LocalDateTime.now(),
                details
            ),
            HttpStatus.FOUND
        );
    }
}
