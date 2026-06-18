package com.aryanpagar.inventory_management_system.dto;

import com.aryanpagar.inventory_management_system.entity.Role;
import lombok.Data;

@Data
public class RegisterRequest {

    private String username;
    private String email;
    private String password;
    private Role role;
}