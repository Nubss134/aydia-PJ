package com.project.web.web.controller;

import com.project.web.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class GuestController {
    @Autowired
    private NewsService newsService;

    @GetMapping("/")
    public String guestIndex() {
        return "guest/index";
    }

    @GetMapping("/summary")
    public String guestDetail(Model model) {
        model.addAttribute("list",newsService.getListRecent(0L));
        return "guest/detail";
    }

    @GetMapping("/detail/news")
    public String guestNewsDetail(@RequestParam(value="id") Long id, Model model) {
        model.addAttribute("list",newsService.getListRecent(id));
        return "guest/components/news_detail";
    }

    @GetMapping("/detail/business")
    public String guestBusinessSummaryDetail(){
        return "guest/components/business";
    }


}
