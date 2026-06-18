package com.aryanpagar.inventory_management_system.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String barcode;

    private String barcodeType;

    private String description;

    private Double price;

    private Integer stockQty;

    private Integer lowStockThreshold;

    private String imagePath;

    @ManyToOne
    private Category category;

    @ManyToOne
    private Supplier supplier;
}