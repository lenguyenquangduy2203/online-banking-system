package edu._2_30_online_banking_system_database.backend.services;

import edu._2_30_online_banking_system_database.backend.payload.TransactionDto;
import edu._2_30_online_banking_system_database.backend.payload.requests.TransactionRequest;
import jakarta.mail.AuthenticationFailedException;

public interface TransactionService {
    TransactionDto makeTransaction(TransactionRequest request) throws IllegalArgumentException, AuthenticationFailedException;
}
