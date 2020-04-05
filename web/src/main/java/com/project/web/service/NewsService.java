package com.project.web.service;

import com.project.web.entity.NewsEntity;
import com.project.web.entity.TeamEntity;
import com.project.web.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
public class NewsService {
    @Autowired
    private NewsRepository repository;

    public Page<NewsEntity> getList(Pageable pageable) {
        return repository.findByIsDeleted(false, pageable);
    }

    public void saveOrUpdate(NewsEntity newsEntity) {
       if(newsEntity.getId() == null){
           newsEntity.setCreatedTime(new Date());
       }
       else{
           newsEntity.setUpdatedTime(new Date());
       }
       newsEntity.setDeleted(false);
       repository.save(newsEntity);
    }

    public Optional<NewsEntity> findById(Long id){
        return repository.findById(id);
    }

    public List<NewsEntity> getListForGuest(){
        return repository.findByIsDeleted(false);
    }

    public void delete(Long id){
        NewsEntity entity = findById(id).orElse(new NewsEntity());
        entity.setDeleted(true);
        repository.save(entity);
    }

}
