import { updatePricesInHtml } from "../utils/utils.js"
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
        if (tableRow) {
            tableRow.remove()
        }

        this.calculateTotalFromCart((total) => updatePricesInHtml(total, "total"))
        this.calculateSubTotalFromCart((subtotal) => updatePricesInHtml(subtotal, "subtotal"))
    }

    updateProductFromCart = (id, quantity) =>{
        this.cartModel.updateProduct(id, quantity)
    }

    calculateTotalFromCart = (callback) => {
        const descount = document.querySelector(".descount span")
        const descountNumber = descount.innerHTML.split(" ")[1]
        const descountConvert = descountNumber.replace("," , ".")

        const subTotal = Number(this.cartModel.calculateTotal())
        const total = subTotal - Number(descountConvert)
        if(callback) callback(total)
    }

    calculateSubTotalFromCart = (callback) =>{
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
        const produtos = this.cartModel.loadProducts()
        if (callback) callback(produtos)
    }
}

export default new CartController