package edu._2_30_online_banking_system_database.backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@ConfigurationProperties(prefix = "admin")
@Getter
@Setter
public class AdminProperties {
    private String name;
    private String email;
    private String password;
}
