package com.example.cashbookspring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.cashbookspring.entity.LongTerm;

import jakarta.transaction.Transactional;

public interface LongTermRepository extends JpaRepository<LongTerm,Integer>{
    @Modifying
    @Transactional
    @Query(value = "SELECT * from long_term where mobile_number=?1", nativeQuery = true)
    public List<LongTerm> findAllLoans(String mobileNumber);   
}
