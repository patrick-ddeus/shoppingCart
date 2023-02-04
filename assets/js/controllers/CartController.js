import CartModel from "../model/CartModel.js"
import { callToast } from "../utils/utils.js"
import Render from "../view/render.js"

class CartController {
    constructor() {
        this.produtos = []
        this.cartModel = new CartModel()
    }

    addProductToCart = (productObject) => {
        this.cartModel.addProduct(productObject)
    }

    removeProductsFromCart = (id) => {
        this.cartModel.removeProducts(id)
    }

    getProductsFromCart = () => {
        return this.cartModel.getProducts()
    }

    saveProducts() {
        this.cartModel.saveProducts()
    }

    loadProducts(callback) {
        this.cartModel.loadProducts()
        
        if(callback) callback()
    }
}

export default new CartController