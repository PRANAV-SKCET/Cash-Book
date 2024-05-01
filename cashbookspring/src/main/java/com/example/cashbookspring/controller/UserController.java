package com.example.cashbookspring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.cashbookspring.entity.Cards;
import com.example.cashbookspring.entity.LongTerm;
import com.example.cashbookspring.entity.MonthlyLoan;
import com.example.cashbookspring.entity.Transaction;
import com.example.cashbookspring.entity.Users;
import com.example.cashbookspring.repository.CardRepository;
import com.example.cashbookspring.repository.LongTermRepository;
import com.example.cashbookspring.repository.MonthlyLoanRepository;
import com.example.cashbookspring.repository.TransactionRepository;
import com.example.cashbookspring.repository.UserRepository;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private MonthlyLoanRepository monthlyLoanRepository;

    @Autowired
    private LongTermRepository longTermRepository;

    @PostMapping("/cash/users/signup")
    public String signUp(@RequestBody Users user) {
        if (userRepository.existsById(user.getMobileNumber())) {
            return "Username already exists";
        }
        
        userRepository.save(user);
        return "User registered successfully";
    }
    
    @PostMapping("/cash/users/login")
    public String login(@RequestParam String mobileNumber, @RequestParam String password) {
        Users user = userRepository.findById(mobileNumber).orElse(null);
        if (user == null) 
        {
            return "User not found";
        }
        if (!user.getPassword().equals(password)) {
            return "Incorrect password";
        }
        return "Login successful";
    }

    @PostMapping("/addcards")
    public String addCards(@RequestBody Cards cards)
    {
        cardRepository.save(cards);
        return "Card Added";
    }

    @GetMapping("/cards")
    public List<Cards> getCards(@RequestParam String mobileNumber)
    {
        List<Cards> cards=cardRepository.findAllCards(mobileNumber);
        return cards;
    }

    @GetMapping("/cash/users/profile")
    public Users getProfile(@RequestParam String mobileNumber)
    {
        Users users=userRepository.findById(mobileNumber).orElse(null);
        return users;
    }

    @PutMapping("/cash/users/profile")
        public void updateProfile(@RequestBody Users users)
        {
            userRepository.save(users);
        }

        @DeleteMapping("/cards/{cardName}/{mobileNumber}")
        public void deleteCard(@PathVariable String cardName, @PathVariable String mobileNumber)
        {
            cardRepository.deleteCard(cardName,mobileNumber);
            transactionRepository.deleteTransaction(cardName,mobileNumber);
        }


        @PostMapping("/addTransaction")
        public String addTransaction(@RequestBody Transaction transaction)
        {
            List<Integer>li = cardRepository.getBalanceToUpdate(transaction.getMobileNumber(),transaction.getCardName());
            int balance1=li.get(0);
            if(transaction.getType().equals("Cash-In"))
            {
                balance1=balance1+transaction.getAmount();
            }
            else
            {
                balance1=balance1-transaction.getAmount();
            }
            cardRepository.updateBalanceTo(transaction.getMobileNumber(),transaction.getCardName(),balance1);
            transactionRepository.save(transaction);
            return "Transaction Added";
        }

        @GetMapping("/getBalance/{cardName}/{mobileNumber}")
        public int getBalance(@PathVariable String cardName,@PathVariable String mobileNumber)
        {
            List<Integer>li = cardRepository.getBalanceToUpdate(mobileNumber, cardName);
            return li.get(0);
        }

        @GetMapping("/getTransaction/{cardName}/{mobileNumber}")
        public List<Transaction> getTransaction(@PathVariable String cardName,@PathVariable String mobileNumber)
        {
            List<Transaction>li = transactionRepository.getTransactionAll(cardName,mobileNumber);
            return li;
        }

        @DeleteMapping("/deleteTransaction/{transactionId}/{mobileNumber}/{cardName}")
        public void deleteTransaction(@PathVariable int transactionId, @PathVariable String mobileNumber, @PathVariable String cardName)
        {
            List<Integer>li2 = cardRepository.getBalanceToUpdate(mobileNumber, cardName);
            int balance = li2.get(0);

            List<Integer>li= transactionRepository.findAmount(transactionId);
            int amt=li.get(0);

            List<String>li3 = transactionRepository.findType(transactionId);
            String type=li3.get(0);
            if(type.equals("Cash-In"))
            {
                balance=balance-amt;
            }
            else
            {
                balance=balance+amt;
            }
            cardRepository.updateBalanceTo(mobileNumber, cardName, balance);
            transactionRepository.deleteById(transactionId);
        }


        @PutMapping("/updateTransaction/{transactionId}/{mobileNumber}/{cardName}")
        public String updateTransaction(@RequestBody Transaction transaction, @PathVariable int transactionId, @PathVariable String mobileNumber, @PathVariable String cardName)
        {
            List<Integer>li2 = cardRepository.getBalanceToUpdate(mobileNumber, cardName);
            int balance = li2.get(0);

            List<Integer>li= transactionRepository.findAmount(transactionId);
            int amt=li.get(0);

            List<String>li3 = transactionRepository.findType(transactionId);
            String type=li3.get(0);
            if(type.equals("Cash-In"))
            {
                balance=balance-amt;
            }
            else
            {
                balance=balance+amt;
            }
            cardRepository.updateBalanceTo(mobileNumber, cardName, balance);
            transactionRepository.deleteById(transactionId);


            List<Integer>li4 = cardRepository.getBalanceToUpdate(mobileNumber,cardName);
            int balance1=li4.get(0);
            if(transaction.getType().equals("Cash-In"))
            {
                balance1=balance1+transaction.getAmount();
            }
            else
            {
                balance1=balance1-transaction.getAmount();
            }
            cardRepository.updateBalanceTo(mobileNumber,cardName,balance1);
            transactionRepository.save(transaction);

            return "Transaction Updated";
        }

        @PostMapping("/addMonthlyLoan")
        public String addMonthlyLoan(@RequestBody MonthlyLoan monthlyLoan)
        {
            monthlyLoanRepository.save(monthlyLoan);
            return "Loan Added";
        }


        @GetMapping("/getMonthlyLoans/{mobileNumber}")
        public List<MonthlyLoan> getMonthlyLoans(@PathVariable String mobileNumber)
        {
            List<MonthlyLoan>monthlyLoans=monthlyLoanRepository.findAllLoans(mobileNumber);
            return monthlyLoans;
        }

        @DeleteMapping("/deleteLoan/{id}")
        public String deleteLoan(@PathVariable int id)
        {
            monthlyLoanRepository.deleteById(id);
            return "Loan Deleted";
        }

        @PutMapping("/updateLoan/{editId}")
        public String updateLoan(@PathVariable int editId,@RequestBody MonthlyLoan monthlyLoan)
        {
            monthlyLoanRepository.deleteById(editId);
            monthlyLoanRepository.save(monthlyLoan);
            return "Loan Updated";
        }

        @GetMapping("/getLongTermLoans/{mobileNumber}")
        public List<LongTerm> getLongTermLoans(@PathVariable String mobileNumber)
        {
            List<LongTerm>longTermLoans=longTermRepository.findAllLoans(mobileNumber);
            return longTermLoans;
        }

        @PostMapping("/addLongTermLoan")
        public String addLongTermLoan(@RequestBody LongTerm longTerm)
        {
            longTermRepository.save(longTerm);
            return "Loan Added";
        }

        @PutMapping("/updateLongTermLoan/{editId}")
        public String updateLongTermLoan(@PathVariable int editId,@RequestBody LongTerm longTerm)
        {
            longTermRepository.deleteById(editId);
            longTermRepository.save(longTerm);
            return "Loan Updated";
        }

        @DeleteMapping("/deleteLongTermLoan/{id}")
        public String deleteLongTermLoan(@PathVariable int id)
        {
            longTermRepository.deleteById(id);
            return "Loan Deleted";
        }
}
