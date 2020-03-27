package com.project.web.web.api;

import com.project.web.service.FileService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequestMapping("/api/v1/")
public class UploadFileAPI {
    private static final Logger logger = LoggerFactory.getLogger(UploadFileAPI.class);
    @Autowired
    private FileService service;


    @PostMapping("/upload")
    public String uploadFile(HttpServletRequest res, @RequestParam("file") MultipartFile file) throws IOException {
        logger.info("Call api upload image");
        return service.storeFile(res,file);
    }
}
