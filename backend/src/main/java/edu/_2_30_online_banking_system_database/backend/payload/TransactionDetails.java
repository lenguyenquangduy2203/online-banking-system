package edu._2_30_online_banking_system_database.backend.payload;

import edu._2_30_online_banking_system_database.backend.models.Transaction;

import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class TransactionDetails {
    private Long id;
    private BigDecimal amount;
    private String fromAccountDetails;
    private String toAccountDetails;
    private LocalDate createdDate;
    private String type;

    public static TransactionDetails from(Transaction transaction) {
        return new TransactionDetails(
            transaction.getId(),
            transaction.getAmount(),
            transaction.getFromAccount() != null ? transaction.getFromAccount().getAccountDetails() : null,
            transaction.getToAccount() != null ? transaction.getToAccount().getAccountDetails() : null,
            transaction.getCreatedDate(),
            transaction.getType().getName().name()
        );
    }
}
