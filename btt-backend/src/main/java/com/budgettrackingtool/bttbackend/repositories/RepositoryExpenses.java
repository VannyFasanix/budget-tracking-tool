package com.budgettrackingtool.bttbackend.repositories;

import com.budgettrackingtool.bttbackend.entities.transactions.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryExpenses extends JpaRepository<Expense, Long> {
}
