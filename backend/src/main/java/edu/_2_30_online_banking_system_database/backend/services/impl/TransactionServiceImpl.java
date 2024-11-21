package edu._2_30_online_banking_system_database.backend.services.impl;

import java.sql.Date;

import org.springframework.stereotype.Service;

import edu._2_30_online_banking_system_database.backend.exceptions.InvalidPinException;
import edu._2_30_online_banking_system_database.backend.exceptions.UnimplementedException;
import edu._2_30_online_banking_system_database.backend.models.Account;
import edu._2_30_online_banking_system_database.backend.models.ETransactionType;
import edu._2_30_online_banking_system_database.backend.models.Transaction;
import edu._2_30_online_banking_system_database.backend.models.TransactionType;
import edu._2_30_online_banking_system_database.backend.payload.TransactionDto;
import edu._2_30_online_banking_system_database.backend.payload.requests.TransactionRequest;
import edu._2_30_online_banking_system_database.backend.repositories.AccountRepository;
import edu._2_30_online_banking_system_database.backend.repositories.TransactionRepository;
import edu._2_30_online_banking_system_database.backend.repositories.TransactionTypeRepository;
import edu._2_30_online_banking_system_database.backend.services.PinService;
import edu._2_30_online_banking_system_database.backend.services.TransactionService;
import jakarta.mail.AuthenticationFailedException;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TransactionServiceImpl implements TransactionService {
    private TransactionTypeRepository transactionTypeRepository;
    private AccountRepository accountRepository;
    private TransactionRepository transactionRepository;
    private PinService pinService;

    @Override
    public TransactionDto makeTransaction(TransactionRequest request) throws IllegalArgumentException, AuthenticationFailedException {
        if (Boolean.FALSE.equals(pinService.isValidPin(request.pin()))) {
            throw new InvalidPinException("The pin must consist of 4 to 6 digits.");
        }
        ETransactionType type = ETransactionType.valueOf(request.type().toUpperCase());
        TransactionType transactionType = transactionTypeRepository.findByName(type)
            .orElseThrow(() -> new UnimplementedException("The exception for transaction type is unimplemented."));
        Transaction transaction;
        Account toAccount;
        Account savedToAccount;
        Account fromAccount;
        Account savedFromAccount;
        if (ETransactionType.DEPOSIT.equals(type)) {
            toAccount = accountRepository.findById(request.toAccountId())
                .orElseThrow(() -> new UnimplementedException("The exception for account is unimplemented."));
            if (Boolean.FALSE.equals(pinService.comparePin(request.pin(), toAccount.getPin()))) {
                throw new AuthenticationFailedException("Invalid PIN for account id: "+request.toAccountId());
            }
            toAccount.setBalance(toAccount.getBalance() + request.amount());
            savedToAccount = accountRepository.save(toAccount);
            transaction = Transaction.builder()
                .amount(request.amount())
                .createdDate(new Date(System.currentTimeMillis()))
                .toAccount(savedToAccount)
                .type(transactionType)
                .build();
        } else if (ETransactionType.WITHDRAWAL.equals(type)) {
            fromAccount = accountRepository.findById(request.fromAccountId())
                .orElseThrow(() -> new UnimplementedException("The exception for account is unimplemented."));
            if (Boolean.FALSE.equals(pinService.comparePin(request.pin(), fromAccount.getPin()))) {
                throw new AuthenticationFailedException("Invalid pin for account id: "+request.fromAccountId());
            }
            fromAccount.setBalance(fromAccount.getBalance() - request.amount());
            savedFromAccount = accountRepository.save(fromAccount);
            transaction = Transaction.builder()
                .amount(request.amount())
                .createdDate(new Date(System.currentTimeMillis()))
                .fromAccount(savedFromAccount)
                .type(transactionType)
                .build();
        } else if (ETransactionType.TRANSFER.equals(type)) {
            fromAccount = accountRepository.findById(request.fromAccountId())
                .orElseThrow(() -> new UnimplementedException("The exception is unimplemented."));
            if (Boolean.FALSE.equals(pinService.comparePin(request.pin(), fromAccount.getPin()))) {
                throw new AuthenticationFailedException("Invalid pin for account id: "+request.fromAccountId());
            }
            toAccount = accountRepository.findById(request.toAccountId())
                .orElseThrow(() -> new UnimplementedException("Unimplemented."));
            fromAccount.setBalance(fromAccount.getBalance() - request.amount());
            toAccount.setBalance(toAccount.getBalance() + request.amount());
            savedFromAccount = accountRepository.save(fromAccount);
            savedToAccount = accountRepository.save(toAccount);
            transaction = Transaction.builder()
                .amount(request.amount())
                .createdDate(new Date(System.currentTimeMillis()))
                .fromAccount(savedFromAccount)
                .toAccount(savedToAccount)
                .type(transactionType)
                .build();
        } else {
            throw new UnimplementedException("The service for this type is unimplemented.");
        }
        Transaction savedTransaction = transactionRepository.save(transaction);
        Long fromAccountId = request.fromAccountId() == null? null : savedTransaction.getFromAccount().getId();
        Long toAccountId = request.toAccountId() == null? null : savedTransaction.getToAccount().getId();
        return new TransactionDto(
            savedTransaction.getId(),
            savedTransaction.getAmount(),
            savedTransaction.getCreatedDate(),
            fromAccountId,
            toAccountId,
            savedTransaction.getType().getName().toString()
        );
    }
    
}
