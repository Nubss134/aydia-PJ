package com.project.web.service;

import com.project.web.entity.HeaderEntity;
import com.project.web.repository.HeaderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service

public class HeaderService {

    @Autowired
    private HeaderRepository repository;

    public void save(HeaderEntity headerEntity) {
        repository.save(headerEntity);
    }




}
