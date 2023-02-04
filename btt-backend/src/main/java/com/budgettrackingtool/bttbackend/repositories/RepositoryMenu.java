package com.budgettrackingtool.bttbackend.repositories;

import com.budgettrackingtool.bttbackend.entities.configs.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryMenu extends JpaRepository<MenuItem,Long> {
}
