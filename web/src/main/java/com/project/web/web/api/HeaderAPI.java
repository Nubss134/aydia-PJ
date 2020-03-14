package com.project.web.web.api;

import com.project.web.entity.HeaderEntity;
import com.project.web.service.HeaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/header")
public class HeaderAPI {
    @Autowired
    private HeaderService service;

    @GetMapping("/get")
    public HeaderEntity get() {
        return service.get();
    }

    @PostMapping("/saveOrUpdate")
    public void saveOrUpdate(@RequestBody HeaderEntity entity) {
        service.saveOrUpdate(entity);
    }


}
