package com.budgettrackingtool.bttbackend.controllers;

import com.budgettrackingtool.bttbackend.entities.configs.MenuItem;
import com.budgettrackingtool.bttbackend.servicies.ConfigService;
import com.budgettrackingtool.bttbackend.servicies.TransactionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
public class ConfigController {

    @Autowired
    private ConfigService configSvc;
    @GetMapping("/menu/master")
    public List<MenuItem> menu() {
        return configSvc.getMenuItems();
    }
}
