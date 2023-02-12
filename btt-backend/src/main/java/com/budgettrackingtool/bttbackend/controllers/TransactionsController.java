package com.budgettrackingtool.bttbackend.controllers;

import com.budgettrackingtool.bttbackend.configs.AppConfig;
import com.budgettrackingtool.bttbackend.entities.transactions.Category;
import com.budgettrackingtool.bttbackend.entities.transactions.Expense;
import com.budgettrackingtool.bttbackend.entities.transactions.Transactions;
import com.budgettrackingtool.bttbackend.exceptions.InvalidParametersException;
import com.budgettrackingtool.bttbackend.exceptions.NotFoundException;
import com.budgettrackingtool.bttbackend.repositories.RepositoryCategories;
import com.budgettrackingtool.bttbackend.repositories.RepositoryExpenses;
import com.budgettrackingtool.bttbackend.servicies.TransactionsService;
import jakarta.persistence.PostUpdate;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
public class TransactionsController {

    @Autowired
    private TransactionsService transactionsSvc;


    @GetMapping("/transactions/master")
    public Transactions getTransactions() {

        return transactionsSvc.getTransactions();
    }

    //CATEGORIES
    @GetMapping("/categories/{id}")
    Category singleCategory(@PathVariable Long id) {

        Category category = transactionsSvc.getCategoryById(id);

        return category;
    }


    @GetMapping("/categories/master")
    List<Category> everyCategory() {

        List<Category> categories = transactionsSvc.getCategories();

        return categories;
    }

    @PostMapping("/categories")
    public ResponseEntity postNewCategory(@RequestBody Category c) {
        return transactionsSvc.saveCategory(c);
    }


    @PutMapping("/categories/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable long id,@RequestBody Category category) {
        return transactionsSvc.updateCategory(id,category);
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Category> deleteCategory(@PathVariable long id) {
        return transactionsSvc.deleteCategory(id);
    }


    @DeleteMapping("/categories")
    public ResponseEntity<Category> deleteCategoriesById(@RequestBody List<Long> ids) {
        return transactionsSvc.deleteCategories(ids);
    }

    //EXPENSES
    @GetMapping("/expenses/{id}")
    Expense singleExpense(@PathVariable Long id) {

        Expense expense = transactionsSvc.getExpenseById(id);

        return expense;
    }

    @GetMapping("/expenses/master")
    List<Expense> everyExpense() {
        return transactionsSvc.getExpenses();
    }

    @PostMapping("/expenses")
    public ResponseEntity postNewCategory(@RequestBody Expense e) {
        return transactionsSvc.saveExpense(e);
    }

    @PutMapping("/expenses/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable long id,@RequestBody Expense expense) {
        return transactionsSvc.updateExpense(id,expense);
    }

    @DeleteMapping("/expenses/{id}")
    public ResponseEntity<Expense> deleteExpense(@PathVariable long id) {
        return transactionsSvc.deleteExpense(id);
    }


    @DeleteMapping("/expenses")
    public ResponseEntity<Expense> deleteExpensesById(@RequestBody List<Long> ids) {
        return transactionsSvc.deleteExpenses(ids);
    }

}
