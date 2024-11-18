package edu._2_30_online_banking_system_database.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import edu._2_30_online_banking_system_database.backend.models.ERole;
import edu._2_30_online_banking_system_database.backend.models.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole role);
}
