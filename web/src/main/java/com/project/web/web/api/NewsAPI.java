package com.project.web.web.api;

import com.project.web.entity.NewsEntity;
import com.project.web.entity.TeamEntity;
import com.project.web.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.spring5.processor.SpringUErrorsTagProcessor;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/news")
public class NewsAPI {
   @Autowired
    private NewsService service;

   @PostMapping("/saveOrUpdate")
    public void save(@RequestBody NewsEntity entity){
       service.saveOrUpdate(entity);
   }

   @GetMapping("/getList")
    public Page<NewsEntity> getList(@RequestParam int page,
                                    @RequestParam int size){
       Pageable pageable = PageRequest.of(page-1, size);
       return service.getList(pageable);
   }

    @GetMapping("/getListForGuest1")
    public List<NewsEntity> getList() {
        return service.getListForGuest();
    }


    @GetMapping("/get")
    public Optional<NewsEntity> get(@RequestParam Long id){
       return service.findById(id);
   }

   @PostMapping("/delete")
    public void delete(@RequestParam Long id){
        service.delete(id);
   }
}
