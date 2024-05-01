package com.example.cashbookspring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.cashbookspring.entity.Cards;

import jakarta.transaction.Transactional;

public interface CardRepository extends JpaRepository<Cards,Integer>{
 
    
    @Modifying
    @Transactional
    @Query(value = "select * from cards where mobile_number=?1", nativeQuery = true)
    public List<Cards> findAllCards(String mobileNumber);
    
    @Modifying
    @Transactional
    @Query(value = "DELETE from cards where mobile_number=?2 and card_name=?1 ", nativeQuery = true)
    public void deleteCard(String cardName,String mobileNumber);

    @Modifying
    @Transactional
    @Query(value = "select balance from cards where mobile_number=?1 and card_name=?2 ", nativeQuery = true)
    public List<Integer> getBalanceToUpdate(String mobileNumber,String cardName);

    @Modifying
    @Transactional
    @Query(value = "update cards set balance=?3 where mobile_number=?1 and card_name=?2", nativeQuery = true)
    public void updateBalanceTo(String mobileNumber,String cardName,int balance);
    

}