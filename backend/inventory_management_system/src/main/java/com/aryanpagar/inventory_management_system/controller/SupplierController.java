package com.aryanpagar.inventory_management_system.controller;

import com.aryanpagar.inventory_management_system.entity.Supplier;
import com.aryanpagar.inventory_management_system.service.SupplierService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {

    private final SupplierService service;

    public SupplierController(SupplierService service) {
        this.service = service;
    }

    @PostMapping
    public Supplier addSupplier(
            @RequestBody Supplier supplier) {

        return service.save(supplier);
    }

    @GetMapping
    public List<Supplier> getAllSuppliers() {

        return service.getAll();
    }
}