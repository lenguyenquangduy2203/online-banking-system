package edu._2_30_online_banking_system_database.backend.controllers;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu._2_30_online_banking_system_database.backend.payload.CustomerDto;
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
    public ResponseEntity<ApiResponse<CustomerDto>> authenticateCustomer(@RequestBody LoginDto loginDto) {
        Optional<CustomerDto> user = customerService.signIn(loginDto);
        if (user.isPresent()) {
            return new ResponseEntity<>(
                new ApiResponse<>(
                    "success",
                    "user login successfully",
                    LocalDateTime.now(),
                    user.get()
                ),
                HttpStatus.OK
            );  
        }
        return new ResponseEntity<>(
            new ApiResponse<>(
                "fail",
                "user is not signed up",
                LocalDateTime.now(),
                null
            ),
            HttpStatus.NOT_FOUND
        );
    }

    @PostMapping("/sign-up")
    public ResponseEntity<String> registerCustomer(@RequestBody SignUpDto signUpDto) {
        String msg = customerService.signUp(signUpDto);
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }
}
