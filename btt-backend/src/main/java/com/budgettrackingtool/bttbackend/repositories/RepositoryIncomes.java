package com.budgettrackingtool.bttbackend.repositories;

import com.budgettrackingtool.bttbackend.entities.transactions.Income;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositoryIncomes extends JpaRepository<Income, Long> {
}
