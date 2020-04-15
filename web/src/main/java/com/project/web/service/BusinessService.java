package com.project.web.service;

import com.project.web.entity.BusinessEntity;
import com.project.web.repository.BusinessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusinessService {

    @Autowired
    private BusinessRepository repository;

    public List<BusinessEntity> findAll(){
        return repository.findAll();
    }

    public BusinessEntity save(BusinessEntity entity){
        return repository.save(entity);
    }

}
