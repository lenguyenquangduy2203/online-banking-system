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
import edu._2_30_online_banking_system_database.backend.models.ETransactionType;
import edu._2_30_online_banking_system_database.backend.models.Transaction;
import edu._2_30_online_banking_system_database.backend.models.TransactionType;
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
        if (!pinService.isValidPin(request.pin())) {
            throw new InvalidPinException("The PIN must consist of 4 to 6 digits.");
        }

        ETransactionType type = ETransactionType.valueOf(request.type().toUpperCase());
        TransactionType transactionType = transactionTypeRepository.findByName(type)
            .orElseThrow(() -> new UnimplementedException("Transaction type is unimplemented."));

        Transaction transaction = null;
        Account toAccount = null;
        Account fromAccount = null;

        // Handling DEPOSIT transaction type
        if (ETransactionType.DEPOSIT.equals(type)) {
            toAccount = accountRepository.findById(request.toAccountId())
                .orElseThrow(() -> new UnimplementedException("Account not found."));
            if (!pinService.comparePin(request.pin(), toAccount.getPin())) {
                throw new AuthenticationFailedException("Invalid PIN for account ID: " + request.toAccountId());
            }

            BigDecimal depositAmount = request.amount();
            BigDecimal newBalance = toAccount.getBalance() != null 
                ? toAccount.getBalance().add(depositAmount) 
                : depositAmount;
            toAccount.setBalance(newBalance);

            accountRepository.save(toAccount);
            transaction = Transaction.builder()
                .amount(depositAmount)
                .createdDate(new Timestamp(System.currentTimeMillis()).toLocalDateTime().toLocalDate())
                .toAccount(toAccount)
                .type(transactionType)
                .build();
        }
        // Handling WITHDRAWAL transaction type
        else if (ETransactionType.WITHDRAWAL.equals(type)) {
            fromAccount = accountRepository.findById(request.fromAccountId())
                .orElseThrow(() -> new UnimplementedException("Account not found."));
            if (!pinService.comparePin(request.pin(), fromAccount.getPin())) {
                throw new AuthenticationFailedException("Invalid PIN for account ID: " + request.fromAccountId());
            }

            BigDecimal withdrawalAmount = request.amount();
            BigDecimal currentBalance = fromAccount.getBalance() != null ? fromAccount.getBalance() : BigDecimal.ZERO;
            if (currentBalance.compareTo(withdrawalAmount) < 0) {
                throw new IllegalArgumentException("Insufficient balance.");
            }

            fromAccount.setBalance(currentBalance.subtract(withdrawalAmount));
            accountRepository.save(fromAccount);

            transaction = Transaction.builder()
                .amount(withdrawalAmount)
                .createdDate(new Timestamp(System.currentTimeMillis()).toLocalDateTime().toLocalDate())
                .fromAccount(fromAccount)
                .type(transactionType)
                .build();
        }
        // Handling TRANSFER transaction type
        else if (ETransactionType.TRANSFER.equals(type)) {
            fromAccount = accountRepository.findById(request.fromAccountId())
                .orElseThrow(() -> new UnimplementedException("From account not found."));
            toAccount = accountRepository.findById(request.toAccountId())
                .orElseThrow(() -> new UnimplementedException("To account not found."));

            if (!pinService.comparePin(request.pin(), fromAccount.getPin())) {
                throw new AuthenticationFailedException("Invalid PIN for account ID: " + request.fromAccountId());
            }

            BigDecimal transferAmount = request.amount();
            BigDecimal currentBalance = fromAccount.getBalance() != null ? fromAccount.getBalance() : BigDecimal.ZERO;
            if (currentBalance.compareTo(transferAmount) < 0) {
                throw new IllegalArgumentException("Insufficient balance.");
            }

            fromAccount.setBalance(currentBalance.subtract(transferAmount));
            toAccount.setBalance(toAccount.getBalance() != null 
                ? toAccount.getBalance().add(transferAmount) 
                : transferAmount);

            accountRepository.save(fromAccount);
            accountRepository.save(toAccount);

            transaction = Transaction.builder()
                .amount(transferAmount)
                .createdDate(new Timestamp(System.currentTimeMillis()).toLocalDateTime().toLocalDate())
                .fromAccount(fromAccount)
                .toAccount(toAccount)
                .type(transactionType)
                .build();
        } else {
            throw new UnimplementedException("The service for this type is unimplemented.");
        }

        Transaction savedTransaction = transactionRepository.save(transaction);
        return TransactionDto.builder()
            .id(savedTransaction.getId())
            .amount(savedTransaction.getAmount())
            .fromAccountId(fromAccount != null ? fromAccount.getId() : null)
            .toAccountId(toAccount != null ? toAccount.getId() : null)
            .build();
    }

    @Override
    public List<TransactionDto> getTransactionPageOrderByDescCreatedDate(Long customerId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("createdDate")));
        Page<Transaction> transactionPage = transactionRepository.findAllByCustomerId(customerId, pageable);
        return transactionPage.getContent().stream()
            .map(TransactionDto::from)
            .collect(Collectors.toList());
    }

    @Override
    public List<TransactionDto> getTransactionPageOrderByDescCreatedDate(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("createdDate")));
        Page<Transaction> transactionPage = transactionRepository.findAll(pageable);
        return transactionPage.getContent().stream()
            .map(TransactionDto::from)
            .collect(Collectors.toList());
    }

    @Override
    public TransactionDetails getTransactionDetails(Long transactionId) {
        Transaction transaction = transactionRepository.findById(transactionId)
            .orElseThrow(() -> new UnimplementedException("Transaction not found."));
        return TransactionDetails.from(transaction);
    }
}
