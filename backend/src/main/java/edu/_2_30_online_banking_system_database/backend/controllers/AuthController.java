package edu._2_30_online_banking_system_database.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu._2_30_online_banking_system_database.backend.payload.requests.LoginDto;
import edu._2_30_online_banking_system_database.backend.payload.requests.SignUpDto;
import edu._2_30_online_banking_system_database.backend.services.CustomerService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {
    private CustomerService customerService;

    @PostMapping("/sign-in")
    public ResponseEntity<String> authenticateCustomer(@RequestBody LoginDto loginDto) {
        customerService.signIn(loginDto);
        return new ResponseEntity<>("User sign in successfully!", HttpStatus.OK);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<String> registerCustomer(@RequestBody SignUpDto signUpDto) {
        String msg = customerService.signUp(signUpDto);
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }
}
