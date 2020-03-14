package com.project.web.service;

import com.project.web.entity.NewsEntity;
import com.project.web.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class NewsService {
    @Autowired
    private NewsRepository repository;

//    public NewsEntity get() {
//        return repository.findById(1L).get();
//    }

    public Optional<NewsEntity> get(Long id){
        return repository.findById(id);
    }

    public List<NewsEntity> getAll(){
        return repository.findAll();
    }

    public NewsEntity saveOrUpdate(NewsEntity entity) {
        return repository.save(entity);
    }
    public void delete(Long id){
        repository.deleteById(id);
    }

}
