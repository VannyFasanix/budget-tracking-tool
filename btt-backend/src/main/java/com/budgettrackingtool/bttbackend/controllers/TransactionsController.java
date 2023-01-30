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
    EntityModel<Optional<Expense>> singleExpense(@PathVariable Long id) {

        Optional<Expense> expense = repositoryE.findById(id);

        return EntityModel.of(expense, //
                linkTo(methodOn(TransactionsController.class).singleExpense(id)).withSelfRel(),
                linkTo(methodOn(TransactionsController.class).everyExpense()).withRel("expenses"));
    }

    @GetMapping("/expenses")
    CollectionModel<EntityModel<Expense>> everyExpense() {

        List<EntityModel<Expense>> expense = repositoryE.findAll().stream()
                .map(p -> EntityModel.of(p,
                        linkTo(methodOn(TransactionsController.class).singleExpense(p.getId())).withSelfRel(),
                        linkTo(methodOn(TransactionsController.class).everyExpense()).withRel("expenses")))
                .collect(Collectors.toList());

        return CollectionModel.of(expense, linkTo(methodOn(TransactionsController.class).everyExpense()).withSelfRel());
    }

    @PostMapping("/expenses")
    public Expense postNewCategory(@RequestBody Expense e) {
        return repositoryE.save(e);
    }


    //CATEGORIES
    @GetMapping("/categories/{id}")
    EntityModel<Optional<Category>> singleCategory(@PathVariable Long id) {

        Optional<Category> category = repositoryC.findById(id);

        return EntityModel.of(category, //
                linkTo(methodOn(TransactionsController.class).singleCategory(id)).withSelfRel(),
                linkTo(methodOn(TransactionsController.class).everyCategory()).withRel("categories"));
    }


    @GetMapping("/categories")
    CollectionModel<EntityModel<Category>> everyCategory() {

        List<EntityModel<Category>> category = repositoryC.findAll().stream()
                .map(p -> EntityModel.of(p,
                        linkTo(methodOn(TransactionsController.class).singleCategory(p.getId())).withSelfRel(),
                        linkTo(methodOn(TransactionsController.class).everyCategory()).withRel("categories")))
                .collect(Collectors.toList());

        return CollectionModel.of(category, linkTo(methodOn(TransactionsController.class).everyCategory()).withSelfRel());
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

        repositoryC.delete(deleteCategory);

        return ResponseEntity.ok(deleteCategory);
    }

}
