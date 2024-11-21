package edu._2_30_online_banking_system_database.backend.services;

public interface PinService {
    Boolean isValidPin(String pin);
    String encodePin(String pin);
    Boolean comparePin(String pin, String encodedPin);
}
