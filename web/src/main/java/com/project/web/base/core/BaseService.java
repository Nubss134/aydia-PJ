package com.project.web.base.core;


import com.project.web.base.security.CurrentUserDetailsContainer;
import com.project.web.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

/**
 * @author kienta
 */
@Service
public abstract class BaseService<E extends BaseEntity, R extends BaseRepository> {

    @Autowired
    protected R repository;

    @Autowired
    private CurrentUserDetailsContainer currentUserDetailsContainer;

    public CustomUserDetails getCurrentUser(){
        return this.currentUserDetailsContainer.getUserDetails();
    }

    /**
     * Create
     */
    public E save(E entity) {
        if (entity == null) {
            return null;
        }

        preSave(entity);

        return (E) repository.save(entity);
    }

    public void preSave(E entity) {
        /**
         * gen UUID code
         */

        entity.setCode(UUID.randomUUID());
        entity.setCreatedByUserId(getCurrentUser().getUserId());
        entity.setUpdatedByUserId(getCurrentUser().getUserId());
        entity.setCreatedTime(new Date());
        entity.setUpdatedTime(new Date());
    }

    /**
     * Service Read
     */
    public E findByCode(String code) {
        return findByCode(UUID.fromString(code));
    }

    /**
     * Service Read
     */
    public E findByCode(UUID code) {
        Object entity = repository.findByCode(code);

        if (entity == null) {
            return null;
        }

        return (E) entity;
    }

    /**
     * Service Read
     */
    public E findById(Long id) {
        Object entity = repository.findById(id).orElse(null);

        if (entity == null) {
            return null;
        }

        return (E) entity;
    }

    /**
     * Update
     */
    public E update(E entity) {
        if (entity == null || entity.getId() == null) {
            return null;
        } else {
            entity.setUpdatedTime(new Date());
            entity.setUpdatedByUserId(getCurrentUser().getUserId());

            return (E) repository.save(entity);
        }
    }

    /**
     * Delete
     */
    public boolean delete(String code) {
        return delete(UUID.fromString(code));
    }

    /**
     * Delete
     */
    public boolean delete(UUID code) {
        Object entityObj = repository.findByCode(code);
        if (entityObj == null) {
            return false;
        } else {
            E entity = (E) entityObj;
            entity.setDeleted(true); // logic delete
            entity.setUpdatedByUserId(getCurrentUser().getUserId());
            repository.save(entity);
            return true;
        }
    }

    /**
     * Get findAll
     *
     * @param page
     * @return
     */
    public Page<E> findAll(Pageable page) {
        return repository.findAll(page);
    }

	/**
	 * Get findAll
	 * @param page
	 * @return
	 */
	public Page<E> findAll(Pageable page, boolean isDeleted) {
		return repository.findByIsDeleted(page, isDeleted);
	}

}
