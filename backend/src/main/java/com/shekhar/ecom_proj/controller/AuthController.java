package com.shekhar.ecom_proj.controller;

import com.shekhar.ecom_proj.dto.LoginRequest;
import com.shekhar.ecom_proj.model.Users;
import com.shekhar.ecom_proj.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    public AuthController(UserService userService, AuthenticationManager authenticationManager){
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Users user){
        try{
            Users registeredUser = userService.userRegistration(user);

            registeredUser.setPassword(null);

            return new ResponseEntity<>(
                    registeredUser,
                    HttpStatus.CREATED
            );
        }catch (RuntimeException e){
            return new ResponseEntity<>(
                    e.getMessage(),
                    HttpStatus.BAD_REQUEST
            );
        }
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );

        Authentication authentication = authenticationManager.authenticate(token);

        return ResponseEntity.ok("Login Success");

    }
}
