package edu._2_30_online_banking_system_database.backend.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApiKeyFilterConfig {

    private final ApiProperties apiProperties;

    // Constructor để inject ApiProperties
    public ApiKeyFilterConfig(ApiProperties apiProperties) {
        this.apiProperties = apiProperties;
    }

    @Bean
    public FilterRegistrationBean<ApiKeyFilter> apiKeyFilter() {
        FilterRegistrationBean<ApiKeyFilter> registrationBean = new FilterRegistrationBean<>();
        // Truyền ApiProperties vào constructor của ApiKeyFilter
        registrationBean.setFilter(new ApiKeyFilter(apiProperties));  
        registrationBean.addUrlPatterns("/api/transactions/*");  // Chỉ áp dụng cho các URL cần bảo vệ
        return registrationBean;
    }
}
