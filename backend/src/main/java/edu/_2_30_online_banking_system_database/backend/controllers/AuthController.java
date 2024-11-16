package edu._2_30_online_banking_system_database.backend.controllers;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu._2_30_online_banking_system_database.backend.payload.ApiKeyDto;
import edu._2_30_online_banking_system_database.backend.payload.requests.LoginDto;
import edu._2_30_online_banking_system_database.backend.payload.requests.SignUpDto;
import edu._2_30_online_banking_system_database.backend.payload.responses.ApiResponse;
import edu._2_30_online_banking_system_database.backend.services.CustomerService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {
    private CustomerService customerService;

    @PostMapping("/sign-in")
    public ResponseEntity<ApiResponse<ApiKeyDto>> authenticateCustomer(@RequestBody LoginDto loginDto) {
        ApiKeyDto apiKey = customerService.signIn(loginDto);
        return new ResponseEntity<>(
            new ApiResponse<>(
                "success", 
                "user authenticated successfully", 
                LocalDateTime.now(), 
                apiKey),
            HttpStatus.OK
        );
    }

    @PostMapping("/sign-up")
    public ResponseEntity<String> registerCustomer(@RequestBody SignUpDto signUpDto) {
        String msg = customerService.signUp(signUpDto);
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }
}
