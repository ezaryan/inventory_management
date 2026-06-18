package com.aryanpagar.inventory_management_system.service;


import com.aryanpagar.inventory_management_system.dto.RegisterRequest;
import com.aryanpagar.inventory_management_system.entity.User;
import com.aryanpagar.inventory_management_system.repository.UserRepository;
import com.aryanpagar.inventory_management_system.security.JwtUtil;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(
            UserRepository userRepository,
            BCryptPasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public User register(RegisterRequest request) {

        User user = new User();

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()));

        user.setRole(request.getRole());

        return userRepository.save(user);
    }

    public String login(
            String email,
            String password) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow();

        if (!passwordEncoder.matches(
                password,
                user.getPassword())) {

            throw new RuntimeException(
                    "Invalid password");
        }

        return jwtUtil.generateToken(
                user.getEmail());
    }
}