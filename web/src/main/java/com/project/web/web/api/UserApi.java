package com.project.web.web.api;

import com.project.web.entity.UserEntity;
import com.project.web.security.CustomUserDetails;
import com.project.web.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/user")
public class UserApi {
    private static Logger LOGGER = LoggerFactory.getLogger(UserApi.class);
    @Autowired
    private UserService service;

	@GetMapping("/{id}")
	public ResponseEntity<UserEntity> get(@AuthenticationPrincipal CustomUserDetails currentUser,
                                          @PathVariable("id") Long id) {
		LOGGER.info("User [{}] call api get user: id [{}]", currentUser.getUserId(), id);
		return ResponseEntity.ok(service.findById(id));
	}


	@GetMapping("/list")
	public Page<UserEntity> list(@AuthenticationPrincipal CustomUserDetails currentUser,
                                 @RequestParam(value = "page", defaultValue = "1") int page,
                                 @RequestParam(value = "size", defaultValue = "20") int size,
                                 @RequestParam(value = "sort_by", defaultValue = "createdTime") String sortField) {

		LOGGER.info("User [{}] call api list user", currentUser.getUserId());
		return service.getLists(PageRequest.of(page - 1, size, Sort.by(sortField)));
	}


}
