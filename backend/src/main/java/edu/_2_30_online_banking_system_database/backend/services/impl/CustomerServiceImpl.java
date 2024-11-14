package edu._2_30_online_banking_system_database.backend.services.impl;

import java.sql.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import edu._2_30_online_banking_system_database.backend.models.Customer;
import edu._2_30_online_banking_system_database.backend.models.ERole;
import edu._2_30_online_banking_system_database.backend.models.Role;
import edu._2_30_online_banking_system_database.backend.payload.requests.LoginDto;
import edu._2_30_online_banking_system_database.backend.payload.requests.SignUpDto;
import edu._2_30_online_banking_system_database.backend.repositories.CustomerRepository;
import edu._2_30_online_banking_system_database.backend.repositories.RoleRepository;
import edu._2_30_online_banking_system_database.backend.services.CustomerService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private static final Logger logger = LoggerFactory.getLogger(CustomerServiceImpl.class);
    private AuthenticationManager authenticationManager;
    private CustomerRepository customerRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void signIn(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
            loginDto.email(), loginDto.password()
        ));
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    @Override
    public String signUp(SignUpDto signUpDto) {
        if (Boolean.TRUE.equals(customerRepository.existsByEmail(signUpDto.email()))) {
            return "Email is already taken!";
        }
        Role role = roleRepository.findByName(ERole.ROLE_USER).get();
        Customer user = Customer.builder()
            .name(signUpDto.name())
            .email(signUpDto.email())
            .password(passwordEncoder.encode(signUpDto.password()))
            .regisDate(new Date(System.currentTimeMillis()))
            .isActive(false)
            .role(role)
            .build();
        customerRepository.save(user);
        String msg = "Encoder used in service: "+passwordEncoder.getClass().getSimpleName();
        logger.info(msg);
        return "User registered successfully.";
    }

}
