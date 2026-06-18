package com.aryanpagar.inventory_management_system.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;

public class FileUploadUtil {

    public static String saveFile(MultipartFile file)
            throws IOException {

        String uploadDir = "uploads/images/";

        Files.createDirectories(
                Paths.get(uploadDir));

        String fileName =
                System.currentTimeMillis()
                        + "_"
                        + file.getOriginalFilename();

        Path path =
                Paths.get(uploadDir + fileName);

        Files.copy(
                file.getInputStream(),
                path,
                StandardCopyOption.REPLACE_EXISTING
        );

        return fileName;
    }
}