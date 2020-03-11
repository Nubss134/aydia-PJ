package com.project.web.service;

import com.project.web.entity.NewsEntity;
import com.project.web.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsService {
    @Autowired
    private NewsRepository repository;

    public List<NewsEntity> findByTitle(String title) {
        return repository.findByTitle(title);
    }

    public List<NewsEntity> findAll() {
        return repository.findAll();
    }


}
