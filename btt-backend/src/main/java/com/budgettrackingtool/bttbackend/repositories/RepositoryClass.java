package com.budgettrackingtool.bttbackend.repositories;

import com.budgettrackingtool.bttbackend.entities.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryClass extends JpaRepository<Profile, Long> {
}
