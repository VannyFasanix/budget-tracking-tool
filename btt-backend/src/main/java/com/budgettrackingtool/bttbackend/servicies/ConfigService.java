package com.budgettrackingtool.bttbackend.servicies;

import com.budgettrackingtool.bttbackend.entities.configs.MenuItem;
import com.budgettrackingtool.bttbackend.repositories.RepositoryMenu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("cs")
public class ConfigService {

    @Autowired
    private RepositoryMenu repositoryMenu;
    
    public List<MenuItem> getMenuItems() {
        return repositoryMenu.findAll();
    }

}
