package com.project.web.service;

import com.project.web.entity.HeaderEntity;
import com.project.web.repository.HeaderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class HeaderService {

    @Autowired
    private HeaderRepository repository;

    public void saveOrUpdate(HeaderEntity headerEntity) {
        repository.save(headerEntity);
    }

    public HeaderEntity get() {
        List<HeaderEntity> list =  repository.findAll();
        if(list.isEmpty()) {
            return null;
        }
        return list.get(0);
    }






}
