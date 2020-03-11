package com.project.web.web.api;

import com.project.web.entity.NewsEntity;
import com.project.web.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/news")
public class NewsAPI {
    @Autowired
    private NewsService service;


    @GetMapping("/getAll")
    public List<NewsEntity> getAll() {
        return service.findAll();
    }


}
