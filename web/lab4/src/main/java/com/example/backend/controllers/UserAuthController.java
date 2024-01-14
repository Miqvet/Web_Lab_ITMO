package com.example.backend.controllers;

import com.example.backend.DataBase.UserDTO;
import com.example.backend.Entity.User;
import com.example.backend.Utils.JwtUtil;
import com.example.backend.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserAuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @Autowired
    public UserAuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }
    @Transactional
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try{
            User registeredUser = userService.registerNewUserAccount(user.getUsername(), user.getPassword());
            UserDTO userDTO = new UserDTO(registeredUser.getUsername());
            System.out.println("aaaaaaaaaaaaaaaaaaaaaaaa");
            return ResponseEntity.status(HttpStatus.CREATED).body(userDTO);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of(
                    "error", "Username already taken"
            ));
        }

    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        if (userService.checkUserCredentials(user.getUsername(), user.getPassword())) {
            final String jwt = jwtUtil.generateToken(user.getUsername());
            return ResponseEntity.ok(jwt);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Неверное имя пользователя или пароль");
        }
    }
}
