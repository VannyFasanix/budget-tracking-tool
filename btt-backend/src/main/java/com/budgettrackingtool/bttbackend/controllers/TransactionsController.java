package com.budgettrackingtool.bttbackend.controllers;

import com.budgettrackingtool.bttbackend.entities.transactions.Category;
import com.budgettrackingtool.bttbackend.entities.transactions.Expense;
import com.budgettrackingtool.bttbackend.repositories.RepositoryCategories;
import com.budgettrackingtool.bttbackend.repositories.RepositoryExpenses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
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


    //EXPENSES
    @GetMapping("/expenses/{id}")
    EntityModel<Optional<Expense>> singleExpense(@PathVariable Long id) {

        Optional<Expense> expense = repositoryE.findById(id);

        return EntityModel.of(expense, //
                linkTo(methodOn(TransactionsController.class).singleExpense(id)).withSelfRel(),
                linkTo(methodOn(TransactionsController.class).everyExpense()).withRel("expenses"));
    }

    @GetMapping("/expensess")
    CollectionModel<EntityModel<Expense>> everyExpense() {

        List<EntityModel<Expense>> expense = repositoryE.findAll().stream()
                .map(p -> EntityModel.of(p,
                        linkTo(methodOn(TransactionsController.class).singleExpense(p.getId())).withSelfRel(),
                        linkTo(methodOn(TransactionsController.class).everyExpense()).withRel("expenses")))
                .collect(Collectors.toList());

        return CollectionModel.of(expense, linkTo(methodOn(TransactionsController.class).everyExpense()).withSelfRel());
    }

    @GetMapping("/expenses")
    public List<Expense> getExpenses() {
        return repositoryE.findAll();
    }

    @PostMapping("/expenses")
    public Expense postNewCategory(@RequestBody Expense e) {
        return repositoryE.save(e);
    }


    @Autowired
    private RepositoryCategories repositoryC;

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
    public Category postNewCategory(@RequestBody Category c) {
        return repositoryC.save(c);
    }

}
