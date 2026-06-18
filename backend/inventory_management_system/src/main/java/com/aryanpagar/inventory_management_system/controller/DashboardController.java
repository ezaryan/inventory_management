package com.aryanpagar.inventory_management_system.controller;

import com.aryanpagar.inventory_management_system.repository.*;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SupplierRepository supplierRepository;
    private final StockTransactionRepository transactionRepository;

    public DashboardController(
            ProductRepository productRepository,
            CategoryRepository categoryRepository,
            SupplierRepository supplierRepository,
            StockTransactionRepository transactionRepository) {

        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.supplierRepository = supplierRepository;
        this.transactionRepository = transactionRepository;
    }

    @GetMapping
    public Map<String,Object> dashboard() {

        Map<String,Object> data =
                new HashMap<>();

        data.put(
                "totalProducts",
                productRepository.count());

        data.put(
                "totalCategories",
                categoryRepository.count());

        data.put(
                "totalSuppliers",
                supplierRepository.count());

        data.put(
                "totalTransactions",
                transactionRepository.count());

        return data;
    }
}