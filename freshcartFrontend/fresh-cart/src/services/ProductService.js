import axios from 'axios';

const PRODUCT_API_BASE_URL = "http://localhost:8085/products";

class ProductService {
    getProducts() {
        return axios.get(PRODUCT_API_BASE_URL);
    }

    createProduct(product) {
        return axios.post(PRODUCT_API_BASE_URL, product);
    }

    deleteProduct(productId) {
        return axios.delete(`${"http://localhost:8080/delete-products"}/${productId}`);
    }
}

export default new ProductService();
