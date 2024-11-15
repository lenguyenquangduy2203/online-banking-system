package edu._2_30_online_banking_system_database.backend.services;

import java.util.Optional;

import edu._2_30_online_banking_system_database.backend.payload.CustomerDto;
import edu._2_30_online_banking_system_database.backend.payload.requests.LoginDto;
import edu._2_30_online_banking_system_database.backend.payload.requests.SignUpDto;

public interface CustomerService {
    public Optional<CustomerDto> signIn(LoginDto loginDto);
    public String signUp(SignUpDto signUpDto);
}
