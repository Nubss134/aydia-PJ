package com.project.web.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

	@GetMapping("/login")
	public String loginPage(){
		return "admin/login";
	}

	@GetMapping(value = "/manager")
	public String index() {
		return "admin/dashboard";
	}
}
