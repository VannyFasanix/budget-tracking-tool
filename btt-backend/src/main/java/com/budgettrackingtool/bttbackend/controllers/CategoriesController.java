package com.budgettrackingtool.bttbackend.controllers;

import com.budgettrackingtool.bttbackend.entities.transactions.Category;
import com.budgettrackingtool.bttbackend.repositories.RepositoryCategories;
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
public class CategoriesController {

    @Autowired
    private RepositoryCategories repositoryC;

    //CATEGORIES
    @GetMapping("/categories/{id}")
    EntityModel<Optional<Category>> singleCategory(@PathVariable Long id) {

        Optional<Category> category = repositoryC.findById(id);

        return EntityModel.of(category, //
                linkTo(methodOn(CategoriesController.class).singleCategory(id)).withSelfRel(),
                linkTo(methodOn(CategoriesController.class).everyCategory()).withRel("categories"));
    }


    @GetMapping("/categories")
    CollectionModel<EntityModel<Category>> everyCategory() {

        List<EntityModel<Category>> category = repositoryC.findAll().stream()
                .map(p -> EntityModel.of(p,
                        linkTo(methodOn(CategoriesController.class).singleCategory(p.getId())).withSelfRel(),
                        linkTo(methodOn(CategoriesController.class).everyCategory()).withRel("categories")))
                .collect(Collectors.toList());

        return CollectionModel.of(category, linkTo(methodOn(CategoriesController.class).everyCategory()).withSelfRel());
    }

    @PostMapping("/categories")
    public Category postNewCategory(@RequestBody Category c) {
        return repositoryC.save(c);
    }
}
