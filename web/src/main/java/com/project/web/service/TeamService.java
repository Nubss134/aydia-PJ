package com.project.web.service;

import com.project.web.entity.TeamEntity;
import com.project.web.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class TeamService {

    @Autowired
    private TeamRepository repository;


    public Page<TeamEntity> getList(Pageable pageable) {
        return repository.findByIsDeleted(false,pageable);
    }

    public void saveOrUpdate(TeamEntity entity) {

        if(entity.getId() == null) {
            entity.setCreatedTime(new Date());
        }
        else {
            entity.setUpdatedTime(new Date());
        }
        entity.setDeleted(false);
        repository.save(entity);


    }


    public Optional<TeamEntity> findById(Long id) {
        return repository.findById(id);
    }

    public void deleted(Long id) {
        TeamEntity entity = findById(id).orElse(new TeamEntity());
        entity.setDeleted(true);
        repository.save(entity);
    }


}
