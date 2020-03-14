package com.project.web.service;

import com.project.web.entity.NewsEntity;
import com.project.web.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class NewsService {
    @Autowired
    private NewsRepository repository;

    public NewsEntity get() {
        return repository.findById(1L).get();
    }

    public NewsEntity saveOrUpdate(NewsEntity entity) {
        return repository.save(entity);
    }

}
