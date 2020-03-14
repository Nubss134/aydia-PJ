package com.project.web.web.api;

import com.project.web.entity.NewsEntity;
import com.project.web.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/news")
public class NewsAPI {
    @Autowired
    private NewsService service;


    @GetMapping("/get")
    public NewsEntity getAll() {
        return service.get();
    }

    @PostMapping("/saveOrUpdate")
    public NewsEntity saveOrUpdate(@RequestBody NewsEntity entity)  {
        return service.saveOrUpdate(entity);
    }


}
