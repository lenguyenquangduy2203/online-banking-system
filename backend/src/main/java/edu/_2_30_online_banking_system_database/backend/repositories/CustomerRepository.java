package edu._2_30_online_banking_system_database.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import edu._2_30_online_banking_system_database.backend.models.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    
}
