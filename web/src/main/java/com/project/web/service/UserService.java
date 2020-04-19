package com.project.web.service;

import com.project.web.entity.UserEntity;
import com.project.web.repository.UserRepository;
import com.project.web.request.UserFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class UserService  {
	private static Logger LOGGER = LoggerFactory.getLogger(UserService.class);
	@Autowired
	private UserRepository repository;

	public UserEntity findUser(String username){
		return repository.findUserByUsername(username);
	}

	public UserEntity findById(Long id) {
		return repository.findById(id).get();
	}

	public Page<UserEntity> getLists(Pageable page) {
		return repository.findAll(page);
	}



}
