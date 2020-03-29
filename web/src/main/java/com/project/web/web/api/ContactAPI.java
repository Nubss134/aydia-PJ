package com.project.web.web.api;

import com.project.web.entity.ContactEntity;
import com.project.web.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/contact")
public class ContactAPI {
    @Autowired
    private ContactService service;


    @GetMapping("/list")
    public Page<ContactEntity> getList(@RequestParam int page,
                                       @RequestParam int size) {
        Pageable pageable = PageRequest.of(page - 1,size);
        return service.getList(pageable);
    }

    @PostMapping("/save")
    public void save(@RequestBody ContactEntity entity) {
        service.save(entity);
    }

    @GetMapping("/{id}")
    public Optional<ContactEntity> findById(@PathVariable Long id) {
        return service.findById(id);
    }



}
