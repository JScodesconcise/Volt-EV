package com.volt.store.Auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody User user) {
        String result = authService.registerUser(user);
        Map<String, String> response = new HashMap<>();
        response.put("message", result);
        response.put("role", user.getRole());
        return response;
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user) {
        boolean success = authService.authenticateUser(user.getEmail(), user.getPassword());
        Map<String, String> response = new HashMap<>();

        if (success) {
            User found = authService.findByEmail(user.getEmail());
            response.put("message", "Login successful");
            response.put("role", found.getRole());
        } else {
            response.put("message", "Invalid credentials");
        }

        return response;
    }
}
