package com.example.cashbookspring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.cashbookspring.entity.Users;

public interface UserRepository extends JpaRepository<Users, String> {
}

