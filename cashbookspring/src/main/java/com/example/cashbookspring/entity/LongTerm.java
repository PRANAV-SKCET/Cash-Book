package com.example.cashbookspring.entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class LongTerm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String bankName;
    private String loanName;
    private String loanNumber;
    private int loanAmount;
    private int pendingAmount;
    private String mobileNumber;
    private Date renewableDate;
    
    public LongTerm() {
    }

    public LongTerm(int id, String bankName, String loanName, String loanNumber, int loanAmount, int pendingAmount,
            String mobileNumber, Date renewableDate) {
        this.id = id;
        this.bankName = bankName;
        this.loanName = loanName;
        this.loanNumber = loanNumber;
        this.loanAmount = loanAmount;
        this.pendingAmount = pendingAmount;
        this.mobileNumber = mobileNumber;
        this.renewableDate = renewableDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getLoanName() {
        return loanName;
    }

    public void setLoanName(String loanName) {
        this.loanName = loanName;
    }

    public String getLoanNumber() {
        return loanNumber;
    }

    public void setLoanNumber(String loanNumber) {
        this.loanNumber = loanNumber;
    }

    public int getLoanAmount() {
        return loanAmount;
    }

    public void setLoanAmount(int loanAmount) {
        this.loanAmount = loanAmount;
    }

    public int getPendingAmount() {
        return pendingAmount;
    }

    public void setPendingAmount(int pendingAmount) {
        this.pendingAmount = pendingAmount;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public Date getRenewableDate() {
        return renewableDate;
    }

    public void setRenewableDate(Date renewableDate) {
        this.renewableDate = renewableDate;
    }
    
}
