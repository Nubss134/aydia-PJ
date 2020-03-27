package com.project.web.web.api;

import com.project.web.entity.TeamEntity;
import com.project.web.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/team")
public class TeamAPI {
    @Autowired
    private TeamService service;

    @PostMapping("/saveOrUpdate")
    public void save(@RequestBody TeamEntity entity) {
        service.saveOrUpdate(entity);
    }

    @GetMapping("/getList")
    public Page<TeamEntity> getList(@RequestParam int page,
                                    @RequestParam int size) {
        Pageable pageable = PageRequest.of(page-1,size);
        return service.getList(pageable);
    }


    @GetMapping("/get")
    public Optional<TeamEntity> get(@RequestParam Long id) {
        return service.findById(id);
    }

    @GetMapping("/delete")
    public void delete(@RequestParam Long id) {
        service.deleted(id);
    }




}
