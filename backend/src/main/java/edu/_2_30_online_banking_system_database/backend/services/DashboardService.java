package edu._2_30_online_banking_system_database.backend.services;

import edu._2_30_online_banking_system_database.backend.models.Customer;
import edu._2_30_online_banking_system_database.backend.payload.ApiKeyDto;
import edu._2_30_online_banking_system_database.backend.payload.responses.AdminDashboardResponse;
import edu._2_30_online_banking_system_database.backend.payload.responses.UserDashboardResponse;

public interface DashboardService {
    UserDashboardResponse getUserDashboardData(Customer user, ApiKeyDto apiKey);
    AdminDashboardResponse getAdminDashboardData(Customer admin, ApiKeyDto apiKey);
}
