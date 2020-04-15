package com.project.web.repository;

import com.project.web.entity.NewsEntity;
import com.project.web.entity.TeamEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface NewsRepository extends JpaRepository<NewsEntity,Long> {


//    @Query("select n from NewsEntity n where n.isDeleted = false and n.title like ?1 and n.createdTime >= ?2 and n.createdTime <= ?3")
//    List<NewsEntity> get(String title, Date startDate, Date endDate);
//
//    @Modifying
//    @Query("update NewsEntity n set n.isDeleted = true where n.id like ?1")
//    void deleteById(Long id);
//    @Query("select n from NewsEntity n where n.isDeleted = false order by createdTime DESC limit 2")
    @Query(value="SELECT * from news n WHERE n.is_deleted = false and n.id not like ?1 ORDER BY n.created_time DESC LIMIT 2", nativeQuery = true)
    List<NewsEntity> findRecent(Long id);

    
    Page<NewsEntity> findByIsDeleted(Boolean isDeleted, Pageable pageable);
    List<NewsEntity> findByIsDeleted(Boolean isDeleted);
}
