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

    updateProductFromCart = (id, quantity) =>{
        this.cartModel.updateProduct(id, quantity)
    }

    calculateTotalFromCart = (callback) => {
        let total = Number(this.cartModel.calculateTotal())

        const quantityInputs = document.querySelectorAll(".quantity-input")
        quantityInputs.forEach((input, indice) => {
            input.value = this.getProductsFromCart()[indice].quantity
        })
        
        if(callback) callback(total)
    }

    getProductsFromCart = () => {
        return this.cartModel.getProducts()
    }

    saveProducts() {
        this.cartModel.saveProducts()
    }

    loadProducts(callback) {
        const produtos = this.cartModel.loadProducts()

        if (callback) callback(produtos)
        
    }
}

export default new CartController