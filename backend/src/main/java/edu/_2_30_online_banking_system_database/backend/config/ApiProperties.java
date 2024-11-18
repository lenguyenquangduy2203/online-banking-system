package edu._2_30_online_banking_system_database.backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@ConfigurationProperties(prefix = "api.key")
@Getter
@Setter
public class ApiProperties {
    private String userHeader;
    private String userToken;
    private String adminHeader;
    private String adminToken;
}
