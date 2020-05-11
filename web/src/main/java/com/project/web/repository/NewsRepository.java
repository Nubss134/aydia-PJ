package com.project.web.repository;

import com.project.web.entity.NewsEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsRepository extends JpaRepository<NewsEntity,Long> {


    @Query(value="SELECT * from news n WHERE n.is_deleted = false and n.id not like ?1 ORDER BY n.created_time DESC LIMIT 2", nativeQuery = true)
    List<NewsEntity> findRecent(Long id);
    Page<NewsEntity> findByIsDeleted(Boolean isDeleted, Pageable pageable);
    List<NewsEntity> findByIsDeleted(Boolean isDeleted);
}
