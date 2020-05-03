package com.project.web.repository;

import com.project.web.entity.HomeEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HomeRepository extends JpaRepository<HomeEntity, Long> {

    Page<HomeEntity> findByIsDeleted(Boolean isDeleted, Pageable pageable);
    List<HomeEntity> findByIsDeleted(Boolean isDeleted);

}
