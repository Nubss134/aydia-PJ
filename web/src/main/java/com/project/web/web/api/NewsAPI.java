package com.project.web.web.api;

import com.project.web.entity.NewsEntity;
import com.project.web.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/news")
public class NewsAPI {
    @Autowired
    private NewsService service;


    @GetMapping("/get/{id}")
    public Optional<NewsEntity> get(Long id){
        return service.get(id);
    }
    @GetMapping("/getAll")
    public List<NewsEntity> getAll() {
        return service.getAll();
    }

    @PostMapping("/saveOrUpdate")
    public NewsEntity saveOrUpdate(@RequestBody NewsEntity entity)  {
        return service.saveOrUpdate(entity);
    }

    @PostMapping("/delete/{id}")
    public String String (Long id){
        service.delete(id);
        return "success";
    }

}
