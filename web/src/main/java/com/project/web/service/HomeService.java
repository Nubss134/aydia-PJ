package com.project.web.service;

import com.project.web.entity.HomeEntity;
import com.project.web.repository.HomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class HomeService {
    @Autowired
    private HomeRepository repository;
    /*
    * ADMIN
    * */
    public Page<HomeEntity> getList(Pageable pageable){
        return repository.findByIsDeleted(false, pageable);
    }

    public void saveOrUpdate(HomeEntity homeEntity){
        if(homeEntity.getId() == null){
            homeEntity.setCreatedTime(new Date());
        }
        else {
            homeEntity.setCreatedTime(new Date());
        }
        homeEntity.setDeleted(false);
        repository.save(homeEntity);
    }

    public Optional<HomeEntity> findById(Long id){
        return repository.findById(id);
    }

    public void delete(Long id){
        HomeEntity homeEntity = findById(id).orElse(new HomeEntity());
        homeEntity.setDeleted(true);
        repository.save(homeEntity);
    }

    /*
    * GUEST
    * */

    public List<HomeEntity> getListForGuest(){
        return repository.findByIsDeleted(false);
    }


}
