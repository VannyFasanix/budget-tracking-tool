package com.budgettrackingtool.bttbackend.repositories;

import com.budgettrackingtool.bttbackend.entities.transactions.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryCategories extends JpaRepository<Category, Long> {
}
