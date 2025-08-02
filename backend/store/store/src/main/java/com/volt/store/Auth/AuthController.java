package com.volt.store.Auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

record UserDTO(String role, String userId){}

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
    public ResponseEntity<UserDTO> login(@RequestBody User user) {
        boolean success = authService.authenticateUser(user.getEmail(), user.getPassword());

        if (success) {
            User found = authService.findByEmail(user.getEmail());
            return ResponseEntity.ok(new UserDTO(found.getRole(), found.getId()));
        } else {
            return ResponseEntity.status(401).body(new UserDTO("", ""));
        }
    }
}
