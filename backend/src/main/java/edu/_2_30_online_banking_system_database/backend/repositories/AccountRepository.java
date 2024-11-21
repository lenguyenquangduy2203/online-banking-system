package edu._2_30_online_banking_system_database.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import edu._2_30_online_banking_system_database.backend.models.Account;
import edu._2_30_online_banking_system_database.backend.models.Customer;

public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findAllByCustomer(Customer customer);
}
