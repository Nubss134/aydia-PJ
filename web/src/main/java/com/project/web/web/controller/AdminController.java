package com.project.web.web.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/manager")
public class AdminController {

    @GetMapping("/home")
    public String home() {

        return "admin/manager/home";
    }

    @GetMapping("/about")
    public String about() {
        return "admin/manager/about";
    }

    @GetMapping("/team")
    public String team() {
        return "admin/manager/team";
    }

    @GetMapping("/news")
    public String news() {
        return "admin/manager/news";
    }

    @GetMapping("/map")
    public String map() { return "admin/manager/map"; }

    @GetMapping("/appointment")
    public String appointment() {
        return "admin/manager/appointment";
    }

}
