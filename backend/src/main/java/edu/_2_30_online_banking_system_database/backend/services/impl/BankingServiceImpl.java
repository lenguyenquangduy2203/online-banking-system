package edu._2_30_online_banking_system_database.backend.services.impl;

import java.util.Optional;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import edu._2_30_online_banking_system_database.backend.models.Customer;
import edu._2_30_online_banking_system_database.backend.payload.CustomerDto;
import edu._2_30_online_banking_system_database.backend.repositories.CustomerRepository;
import edu._2_30_online_banking_system_database.backend.services.BankingService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BankingServiceImpl implements BankingService {
    private CustomerRepository customerRepository;

    @Override
    public CustomerDto getUserInfoByEmail(String email) {
        Customer user = customerRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("Cannot find user with email: "+ email));

        return new CustomerDto(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getRegisDate(),
            user.getIsActive(),
            user.getRole().getName().toString()
        );
    }
    
}
