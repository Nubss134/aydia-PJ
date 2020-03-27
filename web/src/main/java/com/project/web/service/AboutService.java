package com.project.web.service;

import com.project.web.entity.AboutEntity;
import com.project.web.repository.AboutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AboutService {

        @Autowired
        private AboutRepository repository;

        public List<AboutEntity> findAll(){
            return repository.findAll();
        }

        public AboutEntity save(AboutEntity aboutEntity){
            return repository.save(aboutEntity);
        }

}
