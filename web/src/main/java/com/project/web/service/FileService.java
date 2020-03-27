package com.project.web.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;


@Service
public class FileService {

    private final static Logger logger = LoggerFactory.getLogger(FileService.class);

    public String storeFile(HttpServletRequest request, MultipartFile file) throws IOException {

        String uploadRootPath = request.getServletContext().getRealPath("upload");
        File uploadRootDir = new File(uploadRootPath);
        if (!uploadRootDir.exists()) {
            uploadRootDir.mkdirs();
        }
        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
        Date now = new Date();
        String fileName = now.toString().hashCode()+originalFilename;
        Path targetLocation = Paths.get(uploadRootPath).resolve(fileName);
        Files.copy(file.getInputStream(),targetLocation, StandardCopyOption.REPLACE_EXISTING);
        return "/upload/"+fileName;
    }


}
