package com.project.web.web.api;


import com.project.web.entity.BusinessEntity;
import com.project.web.service.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/business")
public class BusinessAPI {

    @Autowired
    BusinessService businessService;

    @GetMapping("/getAll")
    public List<BusinessEntity> getAll(){
        return businessService.findAll();
    }

    @PostMapping("/update")
    public BusinessEntity save(@RequestBody BusinessEntity businessEntity){
        return businessService.save(businessEntity);
    }

}
