package com.aryanpagar.inventory_management_system.controller;

import com.aryanpagar.inventory_management_system.entity.Category;
import com.aryanpagar.inventory_management_system.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService service;

    public CategoryController(CategoryService service) {
        this.service = service;
    }

    @PostMapping
    public Category addCategory(
            @RequestBody Category category) {

        return service.save(category);
    }

    @GetMapping
    public List<Category> getAllCategories() {

        return service.getAll();
    }
}