package com.project.web.repository;

import com.project.web.entity.NewsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface NewsRepository extends JpaRepository<NewsEntity,Long> {

    List<NewsEntity> findByTitle(String title);

    List<NewsEntity> findByTitleAndDescription(String title, String des);

    @Query("select n from NewsEntity n where n.isDeleted = false and n.title like ?1 and n.createdTime >= ?2 and n.createdTime <= ?3")
    List<NewsEntity> get(String title, Date startDate, Date endDate);


}
