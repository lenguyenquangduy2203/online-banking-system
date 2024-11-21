package edu._2_30_online_banking_system_database.backend.services;

import java.util.List;

import edu._2_30_online_banking_system_database.backend.payload.TransactionDto;
import edu._2_30_online_banking_system_database.backend.payload.requests.TransactionRequest;
import jakarta.mail.AuthenticationFailedException;

public interface TransactionService {
    TransactionDto makeTransaction(TransactionRequest request) throws IllegalArgumentException, AuthenticationFailedException;
    List<TransactionDto> getTransactionPageOrderByDescCreatedDate(Long customerId, int page, int size);
}
