package com.example.cashbookspring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.cashbookspring.entity.MonthlyLoan;

import jakarta.transaction.Transactional;

public interface MonthlyLoanRepository extends JpaRepository<MonthlyLoan,Integer>{
    @Modifying
    @Transactional
    @Query(value = "SELECT * from monthly_loan where mobile_number=?1", nativeQuery = true)
    public List<MonthlyLoan> findAllLoans(String mobileNumber);
}
