package com.aryanpagar.inventory_management_system.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class FileConfig
        implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(
            ResourceHandlerRegistry registry) {

        registry.addResourceHandler(
                        "/images/**")
                .addResourceLocations(
                        "file:uploads/images/");

        registry.addResourceHandler(
                        "/barcodes/**")
                .addResourceLocations(
                        "file:uploads/barcodes/");
    }
}