package com.aryanpagar.inventory_management_system.controller;

import com.aryanpagar.inventory_management_system.entity.Product;
import com.aryanpagar.inventory_management_system.entity.StockTransaction;
import com.aryanpagar.inventory_management_system.service.StockService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stock")
public class StockController {

    private final StockService service;

    public StockController(StockService service) {
        this.service = service;
    }

    @PostMapping("/in/{id}/{qty}")
    public Product stockIn(
            @PathVariable Long id,
            @PathVariable Integer qty) {

        return service.stockIn(id, qty);
    }

    @PostMapping("/out/{id}/{qty}")
    public Product stockOut(
            @PathVariable Long id,
            @PathVariable Integer qty) {

        return service.stockOut(id, qty);
    }

    @GetMapping("/history")
    public List<StockTransaction> history() {

        return service.getHistory();
    }
}