package com.aryanpagar.inventory_management_system.service;

import com.aryanpagar.inventory_management_system.entity.Product;
import com.aryanpagar.inventory_management_system.repository.ProductRepository;
import com.aryanpagar.inventory_management_system.util.BarcodeUtil;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public Product save(Product product) {
        System.out.println(
                "Received imagePath = "
                        + product.getImagePath()
        );
        try {

            if (product.getBarcode() != null
                    && !product.getBarcode().isEmpty()) {
                System.out.println(
                        "Generating barcode: "
                                + product.getBarcode());
                BarcodeUtil.generateBarcode(
                        product.getBarcode());
            }

        } catch (Exception e) {

            throw new RuntimeException(
                    "Barcode generation failed");
        }

        return repository.save(product);
    }

    public List<Product> getAll() {
        return repository.findAll();
    }

    public Product getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Product not found"));
    }

    public Product update(Long id, Product product) {

        Product existing = getById(id);

        existing.setName(product.getName());
        existing.setDescription(product.getDescription());
        existing.setPrice(product.getPrice());
        existing.setStockQty(product.getStockQty());
        existing.setBarcode(
                product.getBarcode());

        existing.setBarcodeType(
                product.getBarcodeType());

        existing.setLowStockThreshold(
                product.getLowStockThreshold());

        existing.setImagePath(
                product.getImagePath());

        existing.setCategory(
                product.getCategory());

        existing.setSupplier(
                product.getSupplier());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
    public Product getByBarcode(
            String barcode) {

        return repository.findByBarcode(barcode)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Product not found"));
    }
    public List<Product> getLowStockProducts(
            Integer threshold) {

        return repository
                .findByStockQtyLessThan(
                        threshold);
    }

}