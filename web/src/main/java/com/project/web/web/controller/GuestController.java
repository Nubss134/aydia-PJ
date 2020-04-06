package com.project.web.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class GuestController {

    @GetMapping("/")
    public String guestIndex() {
        return "guest/index";
    }

    @GetMapping("/detail")
    public String guestDetail() {
        return "guest/detail";
    }

}
