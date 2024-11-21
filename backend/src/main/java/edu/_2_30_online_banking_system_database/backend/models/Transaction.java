package edu._2_30_online_banking_system_database.backend.models;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "transactions")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double amount;
    private Date createdDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    private Account fromAccount;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    private Account toAccount;

    @ManyToOne(fetch = FetchType.LAZY)
    private TransactionType type;
}
