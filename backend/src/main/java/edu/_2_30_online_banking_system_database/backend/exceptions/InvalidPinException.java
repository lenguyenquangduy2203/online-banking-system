package edu._2_30_online_banking_system_database.backend.exceptions;

public class InvalidPinException extends RuntimeException {
    public InvalidPinException(String message) {
        super(message);
    }
}
