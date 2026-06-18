package com.aryanpagar.inventory_management_system.repository;

import com.aryanpagar.inventory_management_system.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface ProductRepository
        extends JpaRepository<Product, Long> {

    Optional<Product> findByBarcode(String barcode);

    List<Product> findByStockQtyLessThan(Integer stockQty);
}