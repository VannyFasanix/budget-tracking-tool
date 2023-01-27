package com.budgettrackingtool.bttbackend.controllers;

import com.budgettrackingtool.bttbackend.entities.Profile;
import com.budgettrackingtool.bttbackend.repositories.RepositoryClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.security.*;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
public class ProfilesController {

    @Autowired
    private RepositoryClass repository;


    @GetMapping("/profile/{id}")
    EntityModel<Optional<Profile>> one(@PathVariable Long id) {

        Optional<Profile> profile = repository.findById(id);

        return EntityModel.of(profile, //
                linkTo(methodOn(ProfilesController.class).one(id)).withSelfRel(),
                linkTo(methodOn(ProfilesController.class).all()).withRel("profiles"));
    }

    @GetMapping("/profile")
    CollectionModel<EntityModel<Profile>> all() {

        List<EntityModel<Profile>> profiles = repository.findAll().stream()
                .map(p -> EntityModel.of(p,
                        linkTo(methodOn(ProfilesController.class).one(p.getId())).withSelfRel(),
                        linkTo(methodOn(ProfilesController.class).all()).withRel("profiles")))
                .collect(Collectors.toList());

        return CollectionModel.of(profiles, linkTo(methodOn(ProfilesController.class).all()).withSelfRel());
    }

    @PostMapping("/profile")
    Profile postProfile(@RequestBody Profile p) {

        return repository.save(p);
    }
}
