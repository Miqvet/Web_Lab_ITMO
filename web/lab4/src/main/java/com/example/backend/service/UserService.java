package com.example.backend.service;

import com.example.backend.DataBase.UserRepository;
import com.example.backend.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerNewUserAccount(String username, String password) {
        if (usernameExists(username)) {
            throw new RuntimeException("There is an account with that email address: " + username);
        }
        String encodedPassword = passwordEncoder.encode(password);
        User user = new User(username, encodedPassword);
        return userRepository.save(user);
    }

    private boolean usernameExists(String username) {
        return userRepository.findByUsername(username) != null;
    }
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    public boolean checkUserCredentials(String username, String password) {
        User user = userRepository.findByUsername(username);
        return user != null && passwordEncoder.matches(password, user.getPassword());
    }
}
