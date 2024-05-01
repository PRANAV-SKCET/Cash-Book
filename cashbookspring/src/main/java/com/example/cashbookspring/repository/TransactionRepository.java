package com.example.cashbookspring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.cashbookspring.entity.Transaction;

import jakarta.transaction.Transactional;

public interface TransactionRepository extends JpaRepository<Transaction,Integer> {
    
     
    @Modifying
    @Transactional
    @Query(value = "DELETE from transaction where mobile_number=?2 and card_name=?1 ", nativeQuery = true)
    public void deleteTransaction(String cardName,String mobileNumber);

    @Modifying
    @Transactional
    @Query(value = "SELECT *  from transaction where mobile_number=?2 and card_name=?1 ", nativeQuery = true)
    public List<Transaction> getTransactionAll(String cardName,String mobileNumber);

    @Modifying
    @Transactional
    @Query(value = "SELECT amount from transaction where id=?1 ", nativeQuery = true)
    public List<Integer> findAmount(Integer id);

    @Modifying
    @Transactional
    @Query(value = "SELECT type from transaction where id=?1 ", nativeQuery = true)
    public List<String> findType(Integer id);
}
