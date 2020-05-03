package com.project.web.web.api;

import com.project.web.entity.HomeEntity;
import com.project.web.service.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/home")
public class HomeAPI {
    @Autowired
    private HomeService service;

    @GetMapping("/getList")
    public Page<HomeEntity> getList(@RequestParam int page,
                                    @RequestParam int size) {
        Pageable pageable = PageRequest.of(page-1, size);
        return service.getList(pageable);
    }

    @PostMapping("/saveOrUpdate")
    public void save(@RequestBody HomeEntity entity){
        service.saveOrUpdate(entity);
    }

    @GetMapping("/get")
    public Optional<HomeEntity> get(@RequestParam Long id){
        return service.findById(id);
    }

    @PostMapping("/delete")
    public void deleted(@RequestParam Long id){
        service.delete(id);
    }

    @GetMapping("/getListForGuest")
    public List<HomeEntity> getListForGuest(){
        return service.getListForGuest();
    }
}
