package com.budgettrackingtool.bttbackend.controllers;

import com.budgettrackingtool.bttbackend.entities.transactions.Category;
import com.budgettrackingtool.bttbackend.entities.transactions.Expense;
import com.budgettrackingtool.bttbackend.exceptions.InvalidParametersException;
import com.budgettrackingtool.bttbackend.exceptions.NotFoundException;
import com.budgettrackingtool.bttbackend.repositories.RepositoryCategories;
import com.budgettrackingtool.bttbackend.repositories.RepositoryExpenses;
import jakarta.persistence.PostUpdate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
public class TransactionsController {

    @Autowired
    private RepositoryExpenses repositoryE;

    @Autowired
    private RepositoryCategories repositoryC;


    //EXPENSES
    @GetMapping("/expenses/{id}")
    Expense singleExpense(@PathVariable Long id) {

        Expense expense = repositoryE.findById(id)
                .orElseThrow(() -> new NotFoundException(id, "expense"));

        return expense;
    }

    @GetMapping("/expenses")
    List<Expense> everyExpense() {

        List<Expense> expenses = repositoryE.findAll();

        return expenses;
    }

    @PostMapping("/expenses")
    public Expense postNewCategory(@RequestBody Expense e) {
        return repositoryE.save(e);
    }


    //CATEGORIES
    @GetMapping("/categories/{id}")
    Category singleCategory(@PathVariable Long id) {

        Category category = repositoryC.findById(id)
                .orElseThrow(() -> new NotFoundException(id, "category"));

        return category;
    }


    @GetMapping("/categories")
    List<Category> everyCategory() {

        List<Category> categories = repositoryC.findAll();

        return categories;
    }

    @PostMapping("/categories")
    public ResponseEntity postNewCategory(@RequestBody Category c) {

        if(c.getName() == "") {
            return new ResponseEntity<>("Invalid parameters provided for entity Category", HttpStatus.BAD_REQUEST);
        }

        repositoryC.save(c);
        return new ResponseEntity<>("Post executed successfully", HttpStatus.OK);

    }


    @PutMapping("/categories/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable long id,@RequestBody Category category) {
        Category updateCategory = repositoryC.findById(id)
                .orElseThrow(() -> new NotFoundException(id, "category"));

        updateCategory.setName(category.getName());
        updateCategory.setNotes(category.getNotes());

        repositoryC.save(updateCategory);

        return ResponseEntity.ok(updateCategory);
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Category> deleteCategory(@PathVariable long id) {
        Category deleteCategory = repositoryC.findById(id)
                .orElseThrow(() -> new NotFoundException(id, "category"));

        repositoryC.deleteById(id);

        return ResponseEntity.ok(deleteCategory);
    }

}
