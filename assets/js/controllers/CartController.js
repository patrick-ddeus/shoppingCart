import { updateTotalInHTML } from "../utils/utils.js"
import CartModel from "../model/CartModel.js"

class CartController {
    constructor() {
        this.cartModel = new CartModel()
    }

    addProductToCart = (productObject) => {
        this.cartModel.addProduct(productObject)
    }

    removeProductsFromCart = (id, tableRow) => {
        this.cartModel.removeProducts(id)
        this.calculateTotalFromCart(updateTotalInHTML)
        if (tableRow) {
            tableRow.remove()
        }
    }

    calculateTotalFromCart = (callback) => {
        let total = Number(this.cartModel.calculateTotal())
        if(callback) callback(total)
    }

    getProductsFromCart = () => {
        return this.cartModel.getProducts()
    }

    saveProducts() {
        this.cartModel.saveProducts()
    }

    loadProducts(callback) {
        this.cartModel.loadProducts()

        if (callback) callback()
        
    }
}

export default new CartController