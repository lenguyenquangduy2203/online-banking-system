package edu._2_30_online_banking_system_database.backend.services.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import edu._2_30_online_banking_system_database.backend.services.PinService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PinServiceImpl implements PinService {
    private PasswordEncoder passwordEncoder;

    @Override
    public Boolean comparePin(String pin, String encodedPin) {
        return passwordEncoder.matches(pin, encodedPin);
    }

    @Override
    public String encodePin(String pin) {
        return passwordEncoder.encode(pin);
    }

    @Override
    public Boolean isValidPin(String pin) {
        return pin != null && pin.matches("\\d{4,6}"); // 4 to 6 digits
    }
    
}
