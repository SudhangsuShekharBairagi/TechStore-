package com.shekhar.ecom_proj.service;

import com.shekhar.ecom_proj.model.Product;
import com.shekhar.ecom_proj.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@Service
public class ProductService {
    @Autowired
    private ProductRepo repo;
    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    public Product getProductById(int id) {
        return repo.findById(id).orElse(null);
    }

    public Product addProduct(Product product, MultipartFile imageFile) throws IOException {
        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        product.setImageData(imageFile.getBytes());
        return repo.save(product);

    }

//    public Product updateProduct(int id, Product product, MultipartFile imageFile) throws IOException {
//        product.setImageName(imageFile.getOriginalFilename());
//        product.setImageType(imageFile.getContentType());
//        product.setImageData(imageFile.getBytes());
//        return repo.save(product);
//    }

    public void deleteProduct(int productId) {
        repo.deleteById(productId);
    }

    public List<Product> searchProducts(String keyword) {
        return repo.searchProducts(keyword);
    }
//
//    public Product updateProductWithOutImage(int id, Product product) {
//        return repo.save(product);
//    }

    public Product updateProduct(int id, Product product, MultipartFile imageFile) throws IOException {
        // 1. Fetch existing product to prevent losing data
        Product existingProduct = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // 2. Update basic fields
        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setBrand(product.getBrand());
        existingProduct.setCategory(product.getCategory());
        existingProduct.setQuantity(product.getQuantity());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setAvailable(product.isAvailable());
        // ... update other fields as needed

        // 3. Handle Image Logic
        if (imageFile != null && !imageFile.isEmpty()) {
            existingProduct.setImageName(imageFile.getOriginalFilename());
            existingProduct.setImageType(imageFile.getContentType());
            existingProduct.setImageData(imageFile.getBytes());
        }
        // If imageFile is empty, the existingProduct keeps its current image data

        return repo.save(existingProduct);
    }
}
