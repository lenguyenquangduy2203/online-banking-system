package edu._2_30_online_banking_system_database.backend.services.impl;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import edu._2_30_online_banking_system_database.backend.exceptions.InvalidPinException;
import edu._2_30_online_banking_system_database.backend.exceptions.UnimplementedException;
import edu._2_30_online_banking_system_database.backend.models.Account;
import edu._2_30_online_banking_system_database.backend.models.Customer;
import edu._2_30_online_banking_system_database.backend.models.ETransactionType;
import edu._2_30_online_banking_system_database.backend.models.Transaction;
import edu._2_30_online_banking_system_database.backend.models.TransactionType;
import edu._2_30_online_banking_system_database.backend.payload.AccountDetails;
import edu._2_30_online_banking_system_database.backend.payload.CustomerDto;
import edu._2_30_online_banking_system_database.backend.payload.TransactionDetails;
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
    private final TransactionTypeRepository transactionTypeRepository;
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;
    private final PinService pinService;

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
                .createdDate(new Timestamp(System.currentTimeMillis()))
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
                .createdDate(new Timestamp(System.currentTimeMillis()))
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
                .createdDate(new Timestamp(System.currentTimeMillis()))
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

    @Override
    public List<TransactionDto> getTransactionPageOrderByDescCreatedDate(Long customerId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Transaction> transactions = transactionRepository.findAllByCustomerId(customerId, pageable);
        return transactions.toList()
            .stream().map(transaction -> new TransactionDto(
                transaction.getId(),
                transaction.getAmount(),
                transaction.getCreatedDate(),
                transaction.getFromAccount() == null? null : transaction.getFromAccount().getId(),
                transaction.getToAccount() == null? null : transaction.getToAccount().getId(),
                transaction.getType().getName().toString()
            )).collect(Collectors.toList());
    }

    @Override
    public List<TransactionDto> getTransactionPageOrderByDescCreatedDate(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Transaction> transactions = transactionRepository.findAll(pageable);
        return transactions.toList()
            .stream().map(transaction -> new TransactionDto(
                transaction.getId(),
                transaction.getAmount(),
                transaction.getCreatedDate(),
                transaction.getFromAccount() == null? null : transaction.getFromAccount().getId(),
                transaction.getToAccount() == null? null : transaction.getToAccount().getId(),
                transaction.getType().getName().toString()
            )).collect(Collectors.toList());
    }

    @Override
    public TransactionDetails getTransactionDetails(Long transactionId) {
        Transaction transaction = transactionRepository.findById(transactionId)
            .orElseThrow(() -> new UnimplementedException("Cannot find transaction!"));
        Customer transactionMaker = transaction.getFromAccount() != null?
            transaction.getFromAccount().getCustomer() : transaction.getToAccount().getCustomer();
        CustomerDto censoredTransactionMaker = new CustomerDto(
            transactionMaker.getId(),
            transactionMaker.getName(),
            transactionMaker.getEmail(),
            transactionMaker.getRegisDate(),
            transactionMaker.getIsActive(),
            transactionMaker.getRole().getName().toString()
        );
        AccountDetails fromAccountDetails = null;
        Account fromAccount = transaction.getFromAccount();
        if (fromAccount != null) {
            fromAccountDetails = new AccountDetails(
                fromAccount.getId(), 
                fromAccount.getCreatedDate(), 
                fromAccount.getCustomer().getId(), 
                fromAccount.getType().getName().toString()
            );
        } 
        AccountDetails toAccountDetails = null;
        Account toAccount = transaction.getToAccount();
        if (toAccount != null) {
            toAccountDetails = new AccountDetails(
                toAccount.getId(), 
                toAccount.getCreatedDate(), 
                toAccount.getCustomer().getId(), 
                toAccount.getType().getName().toString()
            );
        } 
        return new TransactionDetails(censoredTransactionMaker, fromAccountDetails, toAccountDetails);
    }
}
