package com.project.web.web.api;

import com.project.web.entity.CompanyEntity;
import com.project.web.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/")
public class CompanyAPI {

    @Autowired
    private CompanyService service;

    @GetMapping("/guest/company/get")
    public CompanyEntity getCompany() {
        return service.getCompany();
    }

    @PostMapping("/admin/company/saveOrUpdate")
    public void saveOrUpdate(@RequestBody CompanyEntity entity) {
        service.saveOrUpdate(entity);
    }

}
