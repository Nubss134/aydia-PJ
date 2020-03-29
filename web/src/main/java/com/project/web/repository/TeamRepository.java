package com.project.web.repository;

import com.project.web.entity.TeamEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface TeamRepository extends JpaRepository<TeamEntity,Long> {

    Page<TeamEntity> findByIsDeleted(Boolean isDeleted, Pageable pageable);

    List<TeamEntity> findByIsDeleted(Boolean isDeleted);



}
