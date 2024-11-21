package edu._2_30_online_banking_system_database.backend.services;

import edu._2_30_online_banking_system_database.backend.models.Customer;
import edu._2_30_online_banking_system_database.backend.payload.ApiKeyDto;
import edu._2_30_online_banking_system_database.backend.payload.requests.LoginDto;
import edu._2_30_online_banking_system_database.backend.payload.requests.SignUpDto;

public interface CustomerService {
    public ApiKeyDto signIn(LoginDto loginDto);
    public String signUp(SignUpDto signUpDto);
    public Customer getUserByEmail(String email);
}
