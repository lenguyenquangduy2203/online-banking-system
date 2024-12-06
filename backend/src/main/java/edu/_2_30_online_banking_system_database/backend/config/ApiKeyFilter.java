package edu._2_30_online_banking_system_database.backend.config;

import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;
import java.io.IOException;

import edu._2_30_online_banking_system_database.backend.services.impl.AuthenticationService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class ApiKeyFilter extends GenericFilterBean {

    private ApiProperties apiProperties;

    // Constructor nhận vào ApiProperties
    public ApiKeyFilter(ApiProperties apiProperties) {
        this.apiProperties = apiProperties;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
        throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String apiKey = httpRequest.getHeader(apiProperties.getUserHeader());

        // Kiểm tra API key hợp lệ
        if (apiKey == null || !apiKey.equals(apiProperties.getUserToken())) {
            HttpServletResponse httpResponse = (HttpServletResponse) response;
            httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            httpResponse.setContentType(MediaType.APPLICATION_JSON_VALUE);
            httpResponse.getWriter().print("{\"message\": \"Invalid API Key\"}");
            httpResponse.getWriter().flush();
            return;
        }

        // Xử lý tiếp nếu API Key hợp lệ
        chain.doFilter(request, response);
    }
}