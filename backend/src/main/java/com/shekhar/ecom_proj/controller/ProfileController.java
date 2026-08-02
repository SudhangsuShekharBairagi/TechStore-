package com.shekhar.ecom_proj.controller;

import com.shekhar.ecom_proj.dto.ProfileUserDTO;
import com.shekhar.ecom_proj.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final UserService userService;

    public ProfileController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<ProfileUserDTO> getProfile(Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(userService.getProfileDetails(email));
    }
}