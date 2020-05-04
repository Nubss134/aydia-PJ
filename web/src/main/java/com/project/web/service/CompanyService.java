package com.project.web.service;

import com.project.web.entity.CompanyEntity;
import com.project.web.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {
    @Autowired
    private CompanyRepository repository;

    public void saveOrUpdate(CompanyEntity entity) {
        entity.setDeleted(false);
        repository.save(entity);
    }

    public CompanyEntity getCompany() {
        List<CompanyEntity> list = repository.findByIsDeleted(false);
        if(list.isEmpty()) {
            return null;
        }
        return list.get(0);
    }


}
