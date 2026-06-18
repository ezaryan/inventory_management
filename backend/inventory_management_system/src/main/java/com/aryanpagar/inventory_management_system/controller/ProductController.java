package com.aryanpagar.inventory_management_system.controller;

import com.aryanpagar.inventory_management_system.util.BarcodeUtil;
import com.aryanpagar.inventory_management_system.util.FileUploadUtil;
import org.springframework.web.multipart.MultipartFile;
import com.aryanpagar.inventory_management_system.entity.Product;
import com.aryanpagar.inventory_management_system.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @PostMapping
    public Product addProduct(
            @RequestBody Product product) {

        return service.save(product);
    }

    @GetMapping
    public List<Product> getAllProducts() {

        return service.getAll();
    }

    @GetMapping("/{id}")
    public Product getProductById(
            @PathVariable Long id) {

        return service.getById(id);
    }

    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestBody Product product) {

        return service.update(id, product);
    }

    @DeleteMapping("/{id}")
    public String deleteProduct(
            @PathVariable Long id) {

        service.delete(id);

        return "Product deleted successfully";
    }
    @PostMapping("/upload")
    public String uploadImage(
            @RequestParam MultipartFile file)
            throws Exception {

        return FileUploadUtil.saveFile(file);
    }
    @PostMapping("/barcode/{barcode}")
    public String generateBarcode(
            @PathVariable String barcode)
            throws Exception {

        return BarcodeUtil.generateBarcode(
                barcode);
    }
    @GetMapping("/barcode/{barcode}")
    public Product getProductByBarcode(
            @PathVariable String barcode) {

        return service.getByBarcode(
                barcode);
    }
    @GetMapping("/low-stock/{threshold}")
    public List<Product> lowStockProducts(
            @PathVariable Integer threshold) {

        return service.getLowStockProducts(
                threshold);
    }

}