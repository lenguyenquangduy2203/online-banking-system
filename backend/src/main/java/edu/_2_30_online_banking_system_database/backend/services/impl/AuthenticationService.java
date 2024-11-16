package edu._2_30_online_banking_system_database.backend.services.impl;

import java.util.List;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import edu._2_30_online_banking_system_database.backend.config.ApiProperties;
import edu._2_30_online_banking_system_database.backend.models.ApiKeyAuthenticationToken;
import edu._2_30_online_banking_system_database.backend.models.ERole;
import jakarta.servlet.http.HttpServletRequest;

public class AuthenticationService {
    private AuthenticationService() {}

    public static Authentication getAuthentication(HttpServletRequest request, ApiProperties apiProperties) {
        String apiKey = request.getHeader(apiProperties.getAdminHeader());
        if (apiProperties.getAdminToken().equals(apiKey)) {
            return new ApiKeyAuthenticationToken(
                apiKey, 
                List.of(new SimpleGrantedAuthority(ERole.ROLE_ADMIN.toString()))
            );
        }
        apiKey = request.getHeader(apiProperties.getUserHeader());
        if (apiProperties.getUserToken().equals(apiKey)) {
            return new ApiKeyAuthenticationToken(
                apiKey, 
                List.of(new SimpleGrantedAuthority(ERole.ROLE_USER.toString()))
            );
        }
        throw new BadCredentialsException("Invalid API Key");
    }
}
