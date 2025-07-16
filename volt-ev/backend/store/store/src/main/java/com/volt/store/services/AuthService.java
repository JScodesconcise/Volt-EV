package com.volt.store.services;

import com.volt.store.models.User;
import com.volt.store.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public String registerUser(User user) {
        // Save the user directly (no encryption)
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "User already exists";
        }
        userRepository.save(user);
        return "Registration successful";
    }

    public boolean authenticateUser(String email, String password) {
        return userRepository.findByEmail(email)
                .map(existingUser -> existingUser.getPassword().equals(password))
                .orElse(false);
    }
}
