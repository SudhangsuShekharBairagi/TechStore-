package com.shekhar.ecom_proj.service;

import com.shekhar.ecom_proj.model.Users;
import com.shekhar.ecom_proj.repo.UsersRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UsersRepository usersRepository;
    private PasswordEncoder passwordEncoder;

    public UserService(UsersRepository usersRepository, PasswordEncoder passwordEncoder) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Users userRegistration(Users user){
        if(usersRepository.findByEmail(user.getEmail()).isPresent()){
                throw new RuntimeException("Email Already registrar");
        }
        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        if (user.getRole() == null || user.getRole().isBlank()) {
            user.setRole("USER");
        }

        return usersRepository.save(user);

    }
}
