package com.project.web.repository;

import com.project.web.entity.GooglemapEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GooglemapRepository extends JpaRepository<GooglemapEntity, Long> {

}
