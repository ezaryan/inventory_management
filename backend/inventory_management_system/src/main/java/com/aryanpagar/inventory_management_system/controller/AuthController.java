package com.aryanpagar.inventory_management_system.controller;

import com.aryanpagar.inventory_management_system.dto.*;
import com.aryanpagar.inventory_management_system.entity.User;
import com.aryanpagar.inventory_management_system.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public User register(
            @RequestBody RegisterRequest request) {

        return service.register(request);
    }

    @PostMapping("/login")
    public String login(
            @RequestBody LoginRequest request) {

        return service.login(
                request.getEmail(),
                request.getPassword());
    }
}