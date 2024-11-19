package edu._2_30_online_banking_system_database.backend.exceptions;

public class InvalidAccountTypeException extends RuntimeException {
    public InvalidAccountTypeException(String message) {
        super(message);
    }
}
