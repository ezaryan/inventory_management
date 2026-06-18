package com.aryanpagar.inventory_management_system.service;

import com.aryanpagar.inventory_management_system.entity.Category;
import com.aryanpagar.inventory_management_system.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository repository;

    public CategoryService(CategoryRepository repository) {
        this.repository = repository;
    }

    public Category save(Category category) {
        return repository.save(category);
    }

    public List<Category> getAll() {
        return repository.findAll();
    }
}