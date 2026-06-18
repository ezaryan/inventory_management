package com.aryanpagar.inventory_management_system.service;

import com.aryanpagar.inventory_management_system.entity.Supplier;
import com.aryanpagar.inventory_management_system.repository.SupplierRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierService {

    private final SupplierRepository repository;

    public SupplierService(SupplierRepository repository) {
        this.repository = repository;
    }

    public Supplier save(Supplier supplier) {
        return repository.save(supplier);
    }

    public List<Supplier> getAll() {
        return repository.findAll();
    }
}