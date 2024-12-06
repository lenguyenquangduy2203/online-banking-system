package edu._2_30_online_banking_system_database.backend.payload;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;

import edu._2_30_online_banking_system_database.backend.models.Transaction;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class TransactionDto {
    private Long id;
    private BigDecimal amount;
    private Long fromAccountId;
    private Long toAccountId;
    private String createdDate;
    private String type;

    public static TransactionDto from(Transaction transaction) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDate = transaction.getCreatedDate().atStartOfDay().format(formatter);

        String typeName = (transaction.getType() != null) ? transaction.getType().getName().name() : "UNKNOWN";

        return TransactionDto.builder()
                .id(transaction.getId())
                .amount(transaction.getAmount())
                .fromAccountId(transaction.getFromAccount() != null ? transaction.getFromAccount().getId() : null)
                .toAccountId(transaction.getToAccount() != null ? transaction.getToAccount().getId() : null)
                .createdDate(formattedDate)
                .type(typeName)
                .build();
    }
}
