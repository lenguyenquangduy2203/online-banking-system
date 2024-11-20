package edu._2_30_online_banking_system_database.backend.controllers;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import edu._2_30_online_banking_system_database.backend.exceptions.InvalidAccountTypeException;
import edu._2_30_online_banking_system_database.backend.exceptions.InvalidPinException;
import edu._2_30_online_banking_system_database.backend.payload.responses.ApiError;
import edu._2_30_online_banking_system_database.backend.payload.responses.ErrorResponse;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(InvalidPinException.class)
    public ResponseEntity<ErrorResponse> handleInvalidPinException(InvalidPinException e) {
        ErrorResponse response = new ErrorResponse(
            "wrong format",
            "Please resent request with another pin.",
            LocalDateTime.now(),
            new ApiError(
                HttpStatus.BAD_REQUEST.value(),
                e.getMessage()
            )
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidAccountTypeException.class)
    public ResponseEntity<ErrorResponse> handleInvalidAccountTypeException(InvalidAccountTypeException e) {
        ErrorResponse response = new ErrorResponse(
            "type mismatch",
            "Please resent request with existed type.",
            LocalDateTime.now(),
            new ApiError(
                HttpStatus.BAD_REQUEST.value(),
                e.getMessage()
            )
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception e) {
        ErrorResponse response = new ErrorResponse(
            "error", 
            "This is server's fault.", 
            LocalDateTime.now(),
            new ApiError(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                e.getMessage()
            )
        );

        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
