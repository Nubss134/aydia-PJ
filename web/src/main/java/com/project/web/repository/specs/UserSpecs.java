package com.project.web.repository.specs;
import com.project.web.entity.UserEntity;
import com.project.web.request.UserFilter;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

public class UserSpecs {
    public static Specification<UserEntity> filterById(long id) {
        return (Root<UserEntity> root, CriteriaQuery<?> query, CriteriaBuilder builder) -> builder.equal(root.get("id"), id);
    }

    public static Specification<UserEntity> filterByName(String name) {
        return (Root<UserEntity> root, CriteriaQuery<?> query, CriteriaBuilder builder) -> builder.like(root.get("name"), "%" + name + "%");
    }

    public static Specification<UserEntity> filterByDeleted(boolean isDeleted) {
        return (Root<UserEntity> root, CriteriaQuery<?> query, CriteriaBuilder builder) -> builder.equal(root.get("isDeleted"), isDeleted);
    }

    public static Specification<UserEntity> getUsers(UserFilter filter) {

        Specification specification = Specification.where(filterByDeleted(false));

        if(filter.getId() != null) {
            specification = Specification.where(specification).and(filterById(filter.getId()));
        }

        if(filter.getName() != null) {
            specification = Specification.where(specification).and(filterByName(filter.getName()));
        }

        return specification;
    }
}
