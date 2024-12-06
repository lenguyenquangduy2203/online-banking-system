package edu._2_30_online_banking_system_database.backend.controllers;

import edu._2_30_online_banking_system_database.backend.models.EAccountType;
import edu._2_30_online_banking_system_database.backend.payload.AccountDto;
import edu._2_30_online_banking_system_database.backend.payload.TransactionDto;
import edu._2_30_online_banking_system_database.backend.payload.requests.LoginDto;
import edu._2_30_online_banking_system_database.backend.payload.responses.ApiResponse;
import edu._2_30_online_banking_system_database.backend.services.CustomerService;
import edu._2_30_online_banking_system_database.backend.services.TransactionService;
import edu._2_30_online_banking_system_database.backend.services.UserAccountService;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/users")
@AllArgsConstructor
public class UserController {
    private final TransactionService transactionService;
    private final CustomerService customerService;
    private final UserAccountService userAccountService;

    // API mở tài khoản cho người dùng
    @PostMapping("/{id}/accounts")
    public ResponseEntity<ApiResponse<AccountDto>> openAccount(
        @PathVariable Long id, @RequestBody Map<String, String> payload
    ) {
        String email = payload.get("email");
        String password = payload.get("password");
        LoginDto loginDto = new LoginDto(email, password);
        
        // Đăng nhập người dùng
        customerService.signIn(loginDto);

        String pin = payload.get("pin");
        String accountType = payload.get("type").toUpperCase();
        
        // Kiểm tra loại tài khoản có hợp lệ không
        EAccountType accountEnumType;
        try {
            accountEnumType = EAccountType.valueOf(accountType);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>( 
                new ApiResponse<>("error", "Invalid account type provided. Please choose a valid account type.", LocalDateTime.now(), null), 
                HttpStatus.BAD_REQUEST 
            );
        }

        // Kiểm tra PIN hợp lệ
        if (pin == null || !pin.matches("\\d{4,6}")) {
            return new ResponseEntity<>( 
                new ApiResponse<>("error", "PIN must be 4 to 6 digits.", LocalDateTime.now(), null), 
                HttpStatus.BAD_REQUEST 
            );
        }

        try {
            // Tạo tài khoản và đặt số dư ban đầu là 50,000
            AccountDto savedAccount = userAccountService.createAccountForUser(id, accountEnumType, pin);
            savedAccount.setBalance(new BigDecimal(50000)); // Đặt số dư mặc định là 50,000

            return new ResponseEntity<>( 
                new ApiResponse<>( 
                    "created", 
                    "Your account has been created successfully.", 
                    LocalDateTime.now(), 
                    savedAccount 
                ), 
                HttpStatus.CREATED 
            );
        } catch (Exception e) {
            return new ResponseEntity<>( 
                new ApiResponse<>("error", "Failed to create account. Please try again.", LocalDateTime.now(), null), 
                HttpStatus.INTERNAL_SERVER_ERROR 
            );
        }
    }

    // API lấy tất cả giao dịch của người dùng
    @GetMapping("/{id}/transactions")
    public ResponseEntity<ApiResponse<List<TransactionDto>>> getAllTransactionsByUser(
        @PathVariable Long id, 
        @RequestParam(defaultValue = "0") int page, 
        @RequestParam(defaultValue = "10") int size
    ) {
        List<TransactionDto> transactions = transactionService
            .getTransactionPageOrderByDescCreatedDate(id, page, size);
        
        return new ResponseEntity<>( 
            new ApiResponse<>( 
                "success", 
                "Page " + page + " of size " + size + " retrieved", 
                LocalDateTime.now(), 
                transactions 
            ), 
            HttpStatus.OK 
        );
    }
}
