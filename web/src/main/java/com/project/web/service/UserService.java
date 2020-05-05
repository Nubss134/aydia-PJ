package com.project.web.service;

import com.project.web.entity.UserEntity;
import com.project.web.repository.UserRepository;
import com.project.web.request.UserFilter;
import com.project.web.security.CustomUserDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService  {
	private static Logger LOGGER = LoggerFactory.getLogger(UserService.class);
	@Autowired
	private UserRepository repository;
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	public UserEntity findUser(String username){
		return repository.findUserByUsername(username);
	}

	public UserEntity findById(Long id) {
		return repository.findById(id).get();
	}

	public Page<UserEntity> getLists(Pageable page) {
		return repository.findAll(page);
	}

	public boolean changePassword(CustomUserDetails customUserDetails, String oldPassword, String newPassword) {
		Long userId = customUserDetails.getUserId();
		UserEntity userEntity = findById(userId);
		System.err.println(userEntity.getPassword());
		System.err.println(oldPassword);
		System.err.println(passwordEncoder.encode(oldPassword));
		if(passwordEncoder.matches(oldPassword,userEntity.getPassword())) {
			userEntity.setPassword(passwordEncoder.encode(newPassword));
			repository.save(userEntity);
			return true;
		}
		return false;
	}







}
