package com.project.web.repository;

import com.project.web.entity.HeaderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HeaderRepository extends JpaRepository<HeaderEntity,Long> {




}
