package edu._2_30_online_banking_system_database.backend.config;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import edu._2_30_online_banking_system_database.backend.services.impl.AuthenticationService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AuthenticationFilter extends GenericFilterBean {
    private static final List<String> excludedPaths = List.of(
        "/api/auth/sign-in", "/api/auth/sign-up"
    );
    private ApiProperties apiProperties;

    public AuthenticationFilter(ApiProperties apiProperties) {
        this.apiProperties = apiProperties;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
        throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String path = httpRequest.getRequestURI();
        if (excludedPaths.contains(path)) {
            chain.doFilter(request, response);
            return;
        }
        try {
            Authentication authentication = AuthenticationService
                .getAuthentication((HttpServletRequest) request, apiProperties);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception e) {
            HttpServletResponse httpResponse = (HttpServletResponse) response;
            httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            httpResponse.setContentType(MediaType.APPLICATION_JSON_VALUE);
            PrintWriter writer = httpResponse.getWriter();
            writer.print(e.getMessage());
            writer.flush();
            writer.close();
        }
        chain.doFilter(request, response);
    }
    
}
