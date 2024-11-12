package edu._2_30_online_banking_system_database.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import edu._2_30_online_banking_system_database.backend.models.AccountType;

public interface AccountTypeRepository extends JpaRepository<AccountType, Long> {
    
}
