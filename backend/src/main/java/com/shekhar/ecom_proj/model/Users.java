package com.shekhar.ecom_proj.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;
    private String username;
    @Column(unique = true, nullable = false)
    private String email;
    private String role;
    @Column(nullable = false)
    private String password;
    @Embedded
    private UserAddress userAddress;


}
