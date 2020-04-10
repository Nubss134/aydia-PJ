package com.project.web.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

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

    @GetMapping("/detail/news")
    public String guestNewsDetail(@RequestParam(value="id") Long id) {
        return "guest/components/news_detail";
    }

}
