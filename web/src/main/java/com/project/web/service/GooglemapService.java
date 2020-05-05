package com.project.web.service;

import com.project.web.entity.GooglemapEntity;
import com.project.web.repository.GooglemapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GooglemapService {

    @Autowired
    private GooglemapRepository repository;

    public GooglemapEntity get(){
        List<GooglemapEntity> list = repository.findAll();
        if(list.isEmpty()){
            return null;
        }
        else return list.get(0);
    }

    public void saveOrUpdate(GooglemapEntity googlemapEntity){
        repository.save(googlemapEntity);
    }

}
