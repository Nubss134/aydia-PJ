package com.project.web.web.api;


import com.project.web.entity.AboutEntity;
import com.project.web.service.AboutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/about")
public class AboutAPI {

    @Autowired
    private AboutService aboutService;

    @GetMapping("/getAll")
    public List<AboutEntity> getAll(){return aboutService.findAll();}

    @PostMapping("/update")
    public AboutEntity save(@RequestBody AboutEntity aboutEntity){return  aboutService.save(aboutEntity);}
}
