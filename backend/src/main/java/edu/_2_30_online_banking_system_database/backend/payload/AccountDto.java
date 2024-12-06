package edu._2_30_online_banking_system_database.backend.payload;

import java.math.BigDecimal;
import java.time.LocalDate;

public class AccountDto {
    private Long id;
    private BigDecimal balance; // Đổi kiểu từ BigDecimal sang double
    private LocalDate createdDate;
    private Long userId;
    private String accountType;

    // Constructor không tham số
    public AccountDto() {}

    // Constructor với các tham số
    public AccountDto(Long id, BigDecimal balance, LocalDate createdDate, Long userId, String accountType) {
        this.id = id;
        this.balance = balance;
        this.createdDate = createdDate;
        this.userId = userId;
        this.accountType = accountType;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }
}
