package com.project.web.repository;


import com.project.web.entity.AboutEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface AboutRepository extends JpaRepository<AboutEntity, Long> {

}
