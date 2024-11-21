package edu._2_30_online_banking_system_database.backend.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import edu._2_30_online_banking_system_database.backend.models.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query("""
            SELECT t
            FROM Transaction t
            LEFT JOIN t.fromAccount fa
            LEFT JOIN fa.customer c1
            LEFT JOIN t.toAccount ta
            LEFT JOIN ta.customer c2
            WHERE 
                (t.fromAccount IS NOT NULL AND fa.customer.id = :customerId) OR 
                (t.toAccount IS NOT NULL AND ta.customer.id = :customerId)
            """)
    Page<Transaction> findAllByCustomerId(@Param("customerId") Long customerId, Pageable pageable);
}
