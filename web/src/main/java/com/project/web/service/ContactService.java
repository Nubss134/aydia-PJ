package com.project.web.service;

import com.project.web.entity.ContactEntity;
import com.project.web.repository.specs.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class ContactService {
    @Autowired
    private ContactRepository repository;

    public Page<ContactEntity> getList(Pageable pageable) {
        return repository.findByIsDeletedOrderByCreatedTimeDesc(false,pageable);
    }

    public Optional<ContactEntity> findById(Long id) {
        Optional<ContactEntity> contactOp = repository.findById(id);

        if(contactOp.isPresent()) {
            contactOp.get().setSeen(true);
        }
        return contactOp;

    }

    public void save(ContactEntity entity) {
        entity.setCreatedTime(new Date());
        entity.setDeleted(false);
        entity.setSeen(false);
    }

}
