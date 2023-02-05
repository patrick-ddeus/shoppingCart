import ProductModel from "../model/ProductModel.js"

class ProductController {
    constructor() {
        this.productModel = new ProductModel
    }

    addProductToDataBase(productObj) {
        // Verifica se o produto existe, se caso existir para a função
        this.productModel.addProduct(productObj)
    }

    removeProductFromDataBase(id) {
        this.productModel.removeProduct(id)
    }

    getProductsFromDataBase() {
        return this.productModel.getProducts()
    }

    getProductById(id) {
        return this.productModel.getProductById(id)
    }

    saveProducts() {
        this.productModel.saveProducts()
    }

    loadProducts() {
        return this.productModel.loadProducts()
    }
}

export default new ProductController