package com.budgettrackingtool.bttbackend.servicies;

import com.budgettrackingtool.bttbackend.entities.transactions.Category;
import com.budgettrackingtool.bttbackend.entities.transactions.Expense;
import com.budgettrackingtool.bttbackend.entities.transactions.Transactions;
import com.budgettrackingtool.bttbackend.exceptions.NotFoundException;
import com.budgettrackingtool.bttbackend.repositories.RepositoryCategories;
import com.budgettrackingtool.bttbackend.repositories.RepositoryExpenses;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("ts")
public class TransactionsService {

    @Autowired
    private RepositoryExpenses repositoryE;
    @Autowired
    private RepositoryCategories repositoryC;

    public Transactions getTransactions() {
        List<Expense> expenses = repositoryE.findAll();
        List<Category> categories = repositoryC.findAll();

        return new Transactions(expenses, categories);
    }

    //CATEGORIES

    public Category getCategoryById(Long id) {
        Category category = repositoryC.findById(id)
                .orElseThrow(() -> new NotFoundException(id, "category"));

        return category;
    }

    @Transactional
    public List<Category> getCategories() {
        List<Category> categories = repositoryC.findAll();
        return categories;
    }

    public ResponseEntity saveCategory(Category c) {
        if(c.getName() == "") {
            return new ResponseEntity<>("Invalid parameters provided for entity Category", HttpStatus.BAD_REQUEST);
        }

        repositoryC.save(c);
        return new ResponseEntity<>("post executed successfully", HttpStatus.OK);
    }

    public ResponseEntity updateCategory(Long id, Category category) {
        Category updateCategory = repositoryC.findById(id)
                .orElseThrow(() -> new NotFoundException(id, "category"));

        updateCategory.setName(category.getName());
        updateCategory.setNotes(category.getNotes());

        repositoryC.save(updateCategory);

        return ResponseEntity.ok(updateCategory);
    }

    public ResponseEntity deleteCategory(Long id) {
        Category deleteCategory = repositoryC.findById(id)
                .orElseThrow(() -> new NotFoundException(id, "category"));

        repositoryC.deleteById(id);

        return ResponseEntity.ok(deleteCategory);
    }

    public ResponseEntity deleteCategories(List<Long> ids) {
        int i = 0;
        for(i = 0; i < ids.size(); i++) {
            int finalI = i;
            Category deleteCategory = repositoryC.findById(ids.get(i))
                    .orElseThrow(() -> new NotFoundException(ids.get(finalI), "category"));
        }

        repositoryC.deleteAllById(ids);

        return ResponseEntity.ok(ids);
    }

    //EXPENSES

    public List<Expense> getExpenses() {
        List<Expense> expenses = repositoryE.findAll();
        return expenses;
    }

    public Expense getExpenseById(Long id) {
        Expense expense = repositoryE.findById(id)
                .orElseThrow(() -> new NotFoundException(id, "expense"));

        return expense;
    }

    public ResponseEntity saveExpense(Expense e) {
        if(e.getAmount() == null || e.getAmount() <= 0 ) {
            return new ResponseEntity<>("Invalid parameters provided for entity Expense", HttpStatus.BAD_REQUEST);
        }

        repositoryE.save(e);
        return new ResponseEntity<>("Post executed successfully", HttpStatus.OK);
    }

    public ResponseEntity updateExpense(Long id, Expense expense) {
        Expense updateExpense = repositoryE.findById(id)
                .orElseThrow(() -> new NotFoundException(id, "expense"));

        updateExpense.setAmount(expense.getAmount());
        updateExpense.setDate(expense.getDate());
        updateExpense.setCategory(expense.getCategory());
        updateExpense.setStore(expense.getStore());
        updateExpense.setNotes(expense.getNotes());



        repositoryE.save(updateExpense);

        return ResponseEntity.ok(updateExpense);
    }

    public ResponseEntity deleteExpense(Long id) {
        Expense deleteExpense = repositoryE.findById(id)
                .orElseThrow(() -> new NotFoundException(id, "expense"));

        repositoryE.deleteById(id);

        return ResponseEntity.ok(deleteExpense);
    }

    public ResponseEntity deleteExpenses(List<Long> ids) {
        int i = 0;
        for(i = 0; i < ids.size(); i++) {
            int finalI = i;
            Expense deleteExpense = repositoryE.findById(ids.get(i))
                    .orElseThrow(() -> new NotFoundException(ids.get(finalI), "expense"));
        }

        repositoryE.deleteAllById(ids);

        return ResponseEntity.ok(ids);
    }



}
