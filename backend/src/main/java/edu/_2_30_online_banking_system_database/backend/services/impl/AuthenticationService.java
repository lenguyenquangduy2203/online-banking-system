package edu._2_30_online_banking_system_database.backend.services.impl;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;

import edu._2_30_online_banking_system_database.backend.config.ApiProperties;
import edu._2_30_online_banking_system_database.backend.models.ApiKeyAuthenticationToken;
import jakarta.servlet.http.HttpServletRequest;

public class AuthenticationService {
    private AuthenticationService() {}

    public static Authentication getAuthentication(HttpServletRequest request, ApiProperties apiProperties) {
        String apiKey = request.getHeader(apiProperties.getHeader());
        if (apiKey == null || !apiKey.equals(apiProperties.getToken())) {
            throw new BadCredentialsException("Invalid API Key");
        }
        return new ApiKeyAuthenticationToken(apiKey, AuthorityUtils.NO_AUTHORITIES);
    }
}
