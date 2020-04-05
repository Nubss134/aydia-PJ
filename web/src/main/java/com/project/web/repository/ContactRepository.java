package com.project.web.repository;

import com.project.web.entity.ContactEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends JpaRepository<ContactEntity,Long> {

    Page<ContactEntity> findByIsDeletedOrderByCreatedTimeDesc(Boolean isDeleted, Pageable pageable);
}
