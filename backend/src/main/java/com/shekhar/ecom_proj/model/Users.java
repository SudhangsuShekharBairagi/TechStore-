package com.shekhar.ecom_proj.model;

import jakarta.persistence.*;

@Entity
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;
    private String userType;
    private String password;
    @Embedded
    private UserAddress userAddress;


}
