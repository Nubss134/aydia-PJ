package com.project.web.web.api;

import com.project.web.entity.GooglemapEntity;
import com.project.web.service.GooglemapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/googlemap")
public class GooglemapAPI {

    @Autowired
    GooglemapService service;

    @GetMapping("/get")
    GooglemapEntity get(){
        return service.get();
    }

    @PostMapping("/saveOrUpdate")
    void saveOrUpdate(@RequestBody GooglemapEntity entity){
        service.saveOrUpdate(entity);
    }


}

