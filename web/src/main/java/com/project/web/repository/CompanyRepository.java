package com.project.web.repository;

import com.project.web.entity.CompanyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CompanyRepository extends JpaRepository<CompanyEntity,Long> {
    List<CompanyEntity> findByIsDeleted(Boolean isDeleted);


}
