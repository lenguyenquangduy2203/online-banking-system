package edu._2_30_online_banking_system_database.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {
    @GetMapping("")
    public ResponseEntity<String> test() {
        return new ResponseEntity<>("Authorization is working properly!", HttpStatus.OK);
    }
}
