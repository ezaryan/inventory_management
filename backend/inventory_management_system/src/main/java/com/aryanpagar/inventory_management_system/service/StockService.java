package com.aryanpagar.inventory_management_system.service;

import com.aryanpagar.inventory_management_system.entity.Product;
import com.aryanpagar.inventory_management_system.entity.StockTransaction;
import com.aryanpagar.inventory_management_system.repository.ProductRepository;
import com.aryanpagar.inventory_management_system.repository.StockTransactionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StockService {

    private final ProductRepository productRepository;
    private final StockTransactionRepository transactionRepository;

    public StockService(
            ProductRepository productRepository,
            StockTransactionRepository transactionRepository) {

        this.productRepository = productRepository;
        this.transactionRepository = transactionRepository;
    }

    public Product stockIn(Long productId,
                           Integer quantity) {

        Product product =
                productRepository.findById(productId)
                        .orElseThrow();

        product.setStockQty(
                product.getStockQty() + quantity);

        productRepository.save(product);

        StockTransaction tx =
                new StockTransaction();

        tx.setType("IN");
        tx.setQuantity(quantity);
        tx.setTransactionDate(
                LocalDateTime.now());
        tx.setProduct(product);

        transactionRepository.save(tx);

        return product;
    }

    public Product stockOut(Long productId,
                            Integer quantity) {

        Product product =
                productRepository.findById(productId)
                        .orElseThrow();

        if(product.getStockQty() < quantity) {
            throw new RuntimeException(
                    "Insufficient stock");
        }

        product.setStockQty(
                product.getStockQty() - quantity);

        productRepository.save(product);

        StockTransaction tx =
                new StockTransaction();

        tx.setType("OUT");
        tx.setQuantity(quantity);
        tx.setTransactionDate(
                LocalDateTime.now());
        tx.setProduct(product);

        transactionRepository.save(tx);

        return product;
    }

    public List<StockTransaction> getHistory() {
        return transactionRepository.findAll();
    }
}