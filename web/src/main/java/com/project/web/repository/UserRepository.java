package com.project.web.repository;

import com.project.web.entity.UserEntity;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Long> {

    Page<UserEntity> findAll(Specification<UserEntity> specs, Pageable pageable);

    List<UserEntity> findAll(Specification<UserEntity> specs);

    UserEntity findUserByUsername(String username);

}
